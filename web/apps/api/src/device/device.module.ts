import { Module } from "@nestjs/common"
import { DeviceController } from "./controllers/device.controller.ts"
import { DeviceService } from "./services/device.service.ts"

@Module({
    providers: [DeviceService],
    controllers: [DeviceController],
    exports: [DeviceService]
})
export class DeviceModule {}
