import { Module } from "@nestjs/common"
import { DeviceModule } from "../device/device.module.ts"
import { FamilyController } from "./controllers/family.controller.ts"

@Module({
    imports: [DeviceModule],
    controllers: [FamilyController]
})
export class FamilyModule {}
