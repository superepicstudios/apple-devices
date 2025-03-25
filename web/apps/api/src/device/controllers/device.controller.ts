import { Controller, Get, Param, Query } from "@nestjs/common"
import { ControllerBase } from "../../system/controllers/controller.base.ts"
import { DeviceResponse } from "../dto/device.res.ts"
import { DeviceService } from "../services/device.service.ts"

@Controller("devices")
export class DeviceController extends ControllerBase {

    constructor(private readonly device: DeviceService) {
        super()
    }

    @Get()
    getDevices(
        
        @Query("family") families?: string | string[],
        @Query("year") years?: string | string[],
        @Query("feature") features?: string | string[],
        @Query("not-feature") notFeatures?: string | string[]

    ): DeviceResponse[] {

        return this.device.getDevices(
            families, 
            years,
            features,
            notFeatures
        )
        .map(d => new DeviceResponse(d))

    }

    @Get(":id")
    getDevice(@Param("id") id: string): DeviceResponse {

        return new DeviceResponse(
            this.device.getDevice(id)
        )

    }

}
