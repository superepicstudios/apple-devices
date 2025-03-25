import { ApiProperty } from "@nestjs/swagger"
import { HealthStatusType } from "../types/health-status.type.ts"
import { DtoBase } from "./dto.base.ts"

export class HealthStatusResponse extends DtoBase {

    @ApiProperty({ enum: [
        HealthStatusType.HEALTHY, 
        HealthStatusType.NOT_HEALTHY, 
        HealthStatusType.MAINTENANCE
    ]})
    status: HealthStatusType

    constructor(status: HealthStatusType) {
        
        super()

        this.status = status

    }

}
