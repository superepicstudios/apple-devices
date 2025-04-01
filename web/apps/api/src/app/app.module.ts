import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { DeviceModule } from "../device/device.module.ts"
import { FamilyModule } from "../family/family.module.ts"
import { SoftwareModule } from "../software/software.module.ts"
import { SystemModule } from "../system/system.module.ts"
import { TraitModule } from "../trait/trait.module.ts"
import { requestId } from "../system/middleware/request-id.middleware.ts"

@Module({
    imports: [
        DeviceModule,
        FamilyModule,
        SoftwareModule,
        SystemModule,
        TraitModule
    ]
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        
        // We apply these middleware here instead of `app.ts`
        // because they need to be applied *after* nest's builtin
        // req body-parsing middleware.

        consumer
            .apply(requestId).forRoutes("*")

    }
    
}
