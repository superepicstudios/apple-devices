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

    @ApiProperty()
    version: string

    constructor(
        status: HealthStatusType, 
        version: string
    ) {

        super()

        this.status = status
        this.version = version

    }

}
