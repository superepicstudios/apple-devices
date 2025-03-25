import { Module } from "@nestjs/common"
import { DeviceModule } from "../device/device.module.ts"
import { FeatureController } from "./controllers/feature.controller.ts"

@Module({
    imports: [DeviceModule],
    controllers: [FeatureController]
})
export class FeatureModule {}
