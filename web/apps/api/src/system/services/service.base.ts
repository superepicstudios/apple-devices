import { white } from "@std/fmt/colors"
import { AppLogger } from "../../app/types/app-logger.type.ts"

export abstract class ServiceBase {

    readonly logger = AppLogger
        .context(white(this.constructor.name))

}
