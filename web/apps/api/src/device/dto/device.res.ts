import type { IChip, IDevice, ISoftware } from "@pkg/types"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { DtoBase } from "../../system/dto/dto.base.ts"

export class DeviceResponse extends DtoBase {

    @ApiProperty()
    name: string

    @ApiPropertyOptional()
    gen_name?: string

    @ApiProperty()
    year: number

    @ApiProperty()
    family: string

    @ApiProperty()
    chip: IChip

    @ApiProperty()
    software: ISoftware[]

    @ApiProperty()
    traits: string[]

    @ApiProperty()
    internal_names: string[]

    @ApiProperty()
    a_numbers: string[]

    @ApiProperty()
    ids: string[]

    constructor(device: IDevice) {

        super()

        this.name = device.name
        this.gen_name = device.gen_name
        this.year = device.year
        this.family = device.family
        this.chip = device.chip
        this.software = device.software
        this.traits = device.traits
        this.internal_names = device.internal_names
        this.a_numbers = device.a_numbers
        this.ids = device.ids

    }
    
}
