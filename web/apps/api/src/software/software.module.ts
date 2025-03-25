import { Module } from "@nestjs/common"
import { DeviceModule } from "../device/device.module.ts"
import { SoftwareController } from "./controllers/software.controller.ts"

@Module({
    imports: [DeviceModule],
    controllers: [SoftwareController]
})
export class SoftwareModule {}
