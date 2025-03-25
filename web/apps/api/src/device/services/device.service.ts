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
    private features: string[] = []
    
    async onApplicationBootstrap() {
        this.loadData()
    }

    getDevices(
        
        families?: string | string[], 
        years?: string | string[],
        features?: string | string[],
        notFeatures?: string | string[]
    
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

        if (features) {

            const sanitizedFeatures = Array.isArray(features) ? 
                features.map(f => this.sanitizeFeature(f)) :
                this.sanitizeFeature(features)

            devices = Array.isArray(sanitizedFeatures) ?
                devices.filter(d => sanitizedFeatures.every(f => d.features.includes(f))) :
                devices.filter(d => d.features.includes(sanitizedFeatures))

        }

        if (notFeatures) {

            const sanitizedNotFeatures = Array.isArray(notFeatures) ? 
                notFeatures.map(f => this.sanitizeFeature(f)) :
                this.sanitizeFeature(notFeatures)

            devices = Array.isArray(sanitizedNotFeatures) ?
                devices.filter(d => sanitizedNotFeatures.every(f => !d.features.includes(f))) :
                devices.filter(d => !d.features.includes(sanitizedNotFeatures))

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

    getDeviceFeatures(): string[] {
        return this.features.toSorted()
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

            for (const feature of device.features) {

                if (!this.features.includes(feature)) {
                    this.features.push(feature)
                }

            }

        }

        this.logger.info(`Loaded ${this.devices.length} device(s)`)
        this.logger.info(`Loaded ${this.families.length} family(s)`)
        this.logger.info(`Loaded ${this.chips.length} chip(s)`)
        this.logger.info(`Loaded ${this.software.length} software(s)`)
        this.logger.info(`Loaded ${this.features.length} feature(s)`)

    }

    private sanitizeFamily(family: string): string {

        return family
            .toLowerCase()            // Apple_TV → apple_tv
            .replaceAll(" ", "_")     // apple tv → apple_tv
            .replaceAll("apple_", "") // apple_tv → tv
            .replaceAll("apple", "")  // appletv → tv
            .replaceAll("_", "")      // tv_4k → tv4k

    }

    private sanitizeFeature(feature: string): string {
        return feature.toLowerCase()
    }

    private logAndThrowError(error: string) {

        this.logger.error(error)
        throw new Error(error)

    }

}
