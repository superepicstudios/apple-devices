import { Get, Controller } from "@nestjs/common"
import { ApiOkResponse } from "@nestjs/swagger"
import { Public } from "../decorators/public.decorator.ts"
import { HealthStatusResponse } from "../dto/health-status.res.ts"
import { SystemService } from "../services/system.service.ts"
import { ControllerBase } from "./controller.base.ts"

@Controller()
export class SystemController extends ControllerBase {

    constructor(private readonly system: SystemService) {
        super()
    }

    /**
     * Ping? Pong.
     * @returns "pong"
     */
    @ApiOkResponse({ example: "pong" })
    @Public()
    @Get("ping")
    ping(): string {
        return "pong"
    }

    /**
     * Get the system's health status.
     * @returns A health-status response.
     */
    @ApiOkResponse({ type: HealthStatusResponse })
    @Public()
    @Get("health")
    async health(): Promise<HealthStatusResponse> {

        return new HealthStatusResponse(
            await this.system.getHealthStatus()
        )
    
    }

}
