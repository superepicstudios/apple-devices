import { Module } from "@nestjs/common"
import { SystemController } from "./controllers/system.controller.ts"
import { SystemService } from "./services/system.service.ts"

@Module({
    providers: [SystemService],
    controllers: [SystemController]
})
export class SystemModule {}
