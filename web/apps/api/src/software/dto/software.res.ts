import type { ISoftware, IVersion } from "@pkg/types"
import { ApiProperty } from "@nestjs/swagger"
import { DtoBase } from "../../system/dto/dto.base.ts"

export class SoftwareResponse extends DtoBase {

    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    version: IVersion

    constructor(software: ISoftware) {

        super()

        this.id = software.id
        this.name = software.name
        this.version = software.version

    }
    
}
