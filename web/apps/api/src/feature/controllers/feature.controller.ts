import { Controller, Get } from "@nestjs/common"
import { ControllerBase } from "../../system/controllers/controller.base.ts"
import { DeviceService } from "../../device/services/device.service.ts"

@Controller("features")
export class FeatureController extends ControllerBase {

    constructor(private readonly device: DeviceService) {
        super()
    }

    @Get()
    getFeatures(): string[] {
        return this.device.getDeviceFeatures()
    }

}
