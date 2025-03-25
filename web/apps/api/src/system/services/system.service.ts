import { Injectable } from "@nestjs/common"
import { HealthStatusType } from "../types/health-status.type.ts"
import { ServiceBase } from "./service.base.ts"

@Injectable()
export class SystemService extends ServiceBase {
    
    async getHealthStatus(): Promise<HealthStatusType> {
        return HealthStatusType.HEALTHY
    }

}
