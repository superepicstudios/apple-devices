import { blue } from "@std/fmt/colors"
import { AppLogger } from "../../app/types/app-logger.type.ts"

export abstract class ControllerBase {
    
    readonly logger = AppLogger
        .context(blue(this.constructor.name))

}
