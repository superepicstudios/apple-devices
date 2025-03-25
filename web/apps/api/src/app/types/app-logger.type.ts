import { Logger as NestLogger } from "@nestjs/common"
import { Logger } from "@zilla/logger"

export class AppLogger {

    private static bootstrapId = "Bootstrap"
    private static httpId = "HTTP"

    static bootstrap = new Logger(this.bootstrapId)
    static http = new Logger(this.httpId)

    private static loggerIds: string[] = []

    static setup() {

        this.registerLoggerIds([
            this.bootstrapId,
            this.httpId
        ])

    }

    static nest(name: string): NestLogger {
        return new NestLogger(name)
    }

    static context(name: string): Logger {

        this.registerLoggerIds([name])
        return new Logger(name)

    }

    // MARK: Private

    private static registerLoggerIds(ids: string[]) {

        // const categories = Logger
        //     .alignmentCategories ?? []

        // for (const id of ids) {
        //     categories.push(id)
        // }

        // Logger.alignmentCategories = categories

    }

}
