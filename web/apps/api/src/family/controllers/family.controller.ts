import { Controller, Get } from "@nestjs/common"
import { ControllerBase } from "../../system/controllers/controller.base.ts"
import { DeviceService } from "../../device/services/device.service.ts"

@Controller("families")
export class FamilyController extends ControllerBase {

    constructor(private readonly device: DeviceService) {
        super()
    }

    @Get()
    getDeviceFamilies(): string[] {
        return this.device.getDeviceFamilies()
    }

}
