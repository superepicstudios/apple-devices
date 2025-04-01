import { Module } from "@nestjs/common"
import { DeviceModule } from "../device/device.module.ts"
import { TraitController } from "./controllers/trait.controller.ts"

@Module({
    imports: [DeviceModule],
    controllers: [TraitController]
})
export class TraitModule {}
