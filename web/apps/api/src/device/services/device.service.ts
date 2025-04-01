import { IChip, IDevice, ISoftware } from "@pkg/types"
import { waitSec } from "@pkg/utils"
import { Injectable, NotFoundException, OnApplicationBootstrap } from "@nestjs/common"
import { ServiceBase } from "../../system/services/service.base.ts"

@Injectable()
export class DeviceService extends ServiceBase implements OnApplicationBootstrap {

    private devices: IDevice[] = []
    private families: string[] = []
    private chips: IChip[] = []
    private software: ISoftware[] = []
    private traits: string[] = []
    
    async onApplicationBootstrap() {
        this.loadData()
    }

    getDevices(
        
        families?: string | string[], 
        years?: string | string[],
        traits?: string | string[],
        notTraits?: string | string[]
    
    ): IDevice[] {

        let devices = this.devices

        if (families) {

            const sanitizedFamilies = Array.isArray(families) ?
                families.map(f => this.sanitizeFamily(f)) :
                this.sanitizeFamily(families)

            devices = Array.isArray(sanitizedFamilies) ?
                devices.filter(d => sanitizedFamilies.includes(this.sanitizeFamily(d.family))) :
                devices.filter(d => this.sanitizeFamily(d.family) == sanitizedFamilies)
            
        }

        if (years) {

            devices = Array.isArray(years) ?
                devices.filter(d => years.includes(d.year.toString())) :
                devices.filter(d => d.year.toString() == years)

        }

        if (traits) {

            const sanitizedTraits = Array.isArray(traits) ? 
                traits.map(f => this.sanitizeTrait(f)) :
                this.sanitizeTrait(traits)

            devices = Array.isArray(sanitizedTraits) ?
                devices.filter(d => sanitizedTraits.every(t => d.traits.includes(t))) :
                devices.filter(d => d.traits.includes(sanitizedTraits))

        }

        if (notTraits) {

            const sanitizedNotTraits = Array.isArray(notTraits) ? 
                notTraits.map(t => this.sanitizeTrait(t)) :
                this.sanitizeTrait(notTraits)

            devices = Array.isArray(sanitizedNotTraits) ?
                devices.filter(d => sanitizedNotTraits.every(t => !d.traits.includes(t))) :
                devices.filter(d => !d.traits.includes(sanitizedNotTraits))

        }

        return devices
            .sort((a, b) => (a.year - b.year) || a.family.localeCompare(b.family))

    }

    getDevice(id: string): IDevice {

        const device = this.devices.find(d => {

            return d.ids
                .map(i => i.toLowerCase())
                .includes(id.toLowerCase())
                
        })

        if (!device) {
            throw new NotFoundException()
        }

        return device

    }

    getDeviceFamilies(): string[] {
        return this.families.toSorted()
    }

    getDeviceSoftwares(): ISoftware[] {

        return this.software
            .sort((a, b) => a.name.localeCompare(b.name))

    }

    getDeviceSoftware(id: string): ISoftware {

        const software = this.software.find(sw => {
            return sw.id.toLowerCase() == id.toLowerCase()
        })

        if (!software) {
            throw new NotFoundException()
        }

        return software

    }

    getDeviceTraits(): string[] {
        return this.traits.toSorted()
    }

    // MARK: Private

    private async loadData() {

        this.devices = []
        this.families = []
        this.chips = []
        this.software = []

        // Small delay so nest bootstrap
        // logging finishes doing its thing

        await waitSec(0.1)
        
        const data = await Deno.readTextFile(`${Deno.cwd()}/data.json`)
        const devices = JSON.parse(data)

        for (const d of Object.values(devices)) {

            const device = d as IDevice

            this.devices.push(device)

            if (!this.families.includes(device.family)) {
                this.families.push(device.family)
            }

            if (!this.chips.includes(device.chip)) {
                this.chips.push(device.chip)
            }

            for (const software of device.software) {

                if (!this.software.includes(software)) {
                    this.software.push(software)
                }

            }

            for (const trait of device.traits) {

                if (!this.traits.includes(trait)) {
                    this.traits.push(trait)
                }

            }

        }

        this.logger.info(`Loaded ${this.devices.length} device(s)`)
        this.logger.info(`Loaded ${this.families.length} family(s)`)
        this.logger.info(`Loaded ${this.chips.length} chip(s)`)
        this.logger.info(`Loaded ${this.software.length} software(s)`)
        this.logger.info(`Loaded ${this.traits.length} trait(s)`)

    }

    private sanitizeFamily(family: string): string {

        return family
            .toLowerCase()            // Apple_TV → apple_tv
            .replaceAll(" ", "_")     // apple tv → apple_tv
            .replaceAll("apple_", "") // apple_tv → tv
            .replaceAll("apple", "")  // appletv → tv
            .replaceAll("_", "")      // tv_4k → tv4k

    }

    private sanitizeTrait(trait: string): string {
        return trait.toLowerCase()
    }
    
}
