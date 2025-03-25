import { Controller, Get, Param } from "@nestjs/common"
import { ControllerBase } from "../../system/controllers/controller.base.ts"
import { DeviceService } from "../../device/services/device.service.ts"
import { SoftwareResponse } from "../dto/software.res.ts"

@Controller("software")
export class SoftwareController extends ControllerBase {

    constructor(private readonly device: DeviceService) {
        super()
    }

    @Get()
    getSoftwares(): SoftwareResponse[] {

        return this.device
            .getDeviceSoftwares()
            .map(sw => new SoftwareResponse(sw))

    }

    @Get(":id")
    getSoftware(@Param("id") id: string): SoftwareResponse {

        return new SoftwareResponse(
            this.device.getDeviceSoftware(id)
        )

    }

}
