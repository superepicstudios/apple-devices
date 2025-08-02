import type { ISoftware } from "./software.interface.ts"
import type { IChip } from "./chip.interface.ts"

export interface IDevice {
    
    name: string
    variant?: string
    year: number
    gen: number
    family: string
    chip: IChip
    software: ISoftware[]
    traits: string[]
    internal_names: string[]
    a_numbers: string[]
    ids: string[]

}
