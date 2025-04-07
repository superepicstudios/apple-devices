import { VersioningType } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { AppExceptionFilter } from "../system/filters/app-exception.filter.ts"
import { AppEnv } from "./types/app-env.type.ts"
import { AppModule } from "./app.module.ts"

export class App {

    private _app!: NestExpressApplication
    public get app(): NestExpressApplication {
        return this._app
    }

    async boot() {

        this._app = await NestFactory
            .create<NestExpressApplication>(AppModule)

        // General

        this._app.enableCors({
            "origin": "*",
            "methods": "GET,POST,PUT,PATCH,DELETE"
        })
        
        this._app.enableVersioning({
            type: VersioningType.URI,
            defaultVersion: "1"
        })

        this._app.useStaticAssets(`${Deno.cwd()}/public`, {
            prefix: "public"
        })

        // Filters & Pipes

        this._app.useGlobalFilters(
            new AppExceptionFilter()
        )

    }

    async listen() {

        await this._app
            .listen(AppEnv.port())

    }

}
