import { Controller, Get } from "@nestjs/common"
import { ControllerBase } from "../../system/controllers/controller.base.ts"
import { DeviceService } from "../../device/services/device.service.ts"

@Controller("traits")
export class TraitController extends ControllerBase {

    constructor(private readonly device: DeviceService) {
        super()
    }

    @Get()
    getTraits(): string[] {
        return this.device.getDeviceTraits()
    }

}
