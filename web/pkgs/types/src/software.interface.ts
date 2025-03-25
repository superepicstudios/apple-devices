import type { IVersion } from "./version.interface.ts"

export interface ISoftware {

    id: string
    name: string
    version: IVersion
    device_version?: IVersion

}
