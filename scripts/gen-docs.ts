import { IDevice } from "../web/pkgs/types/src/device.interface.ts"
import { ISoftware } from "../web/pkgs/types/src/software.interface.ts";

const DATA_FILE_PATH = "../web/apps/api/data.json"
const DEVICE_DOCS_PATH = "../web/apps/www/docs/devices"

const devices: IDevice[] = JSON.parse(
    await Deno.readTextFile(DATA_FILE_PATH)
)

console.log()
console.log("⋅ Generating device docs")

// Map familes → devices

const familyToDevicesMap = new Map<string, IDevice[]>()

for (const device of devices) {

    const family = device.family
    const deviceList = familyToDevicesMap.get(family) ?? []

    deviceList
        .push(device)

    familyToDevicesMap.set(
        family, 
        deviceList
    )

}

const sortedFamilyToDevicesMap = new Map([...familyToDevicesMap].sort())

// Generate doc files

for (const family of sortedFamilyToDevicesMap.keys()) {

    const familyDisplayName = family
        .replaceAll("_", " ")

    let output = `# Devices → ${familyDisplayName}\n\n`

    for (const device of sortedFamilyToDevicesMap.get(family) ?? []) {

        output += `## ${uniqueDeviceName(device)}\n`
        output += `- **Family**: \`${family}\`\n`

        if (device.variant) {
            output += `- **Variant**: \`${device.variant}\`\n`
        }

        output += `- **Generation**: \`${device.gen}\`\n`
        output += `- **Year**: \`${device.year}\`\n`
        output += `- **Chip**: \`${device.chip.name}\`\n`

        if (device.software.length > 0) {

            output += "- **Software**\n"

            for (const software of device.software) {
                output += `  - ${stringForSoftware(software)}\n`
            }

        }

        if (device.traits.length > 0) {

            output += "- **Traits**\n"

            for (const trait of device.traits) {
                output += `  -  \`${trait}\`\n`
            }

        }

        if (device.internal_names.length > 0) {

            output += "- **Internal Names**\n"

            for (const name of device.internal_names) {
                output += `  -  \`${name}\`\n`
            }

        }

        if (device.a_numbers.length > 0) {

            output += "- **A Numbers**\n"

            for (const number of device.a_numbers) {
                output += `  -  \`${number}\`\n`
            }

        }

        if (device.ids.length > 0) {

            output += "- **Identifiers**\n"

            for (const id of device.ids) {
                output += `  -  \`${id}\`\n`
            }

        }

        output += "\n"

    }

    if (output.endsWith("\n")) {
        output = output.slice(0, -1)
    }

    const familyFileName = familyDisplayName
        .toLowerCase()
        .replaceAll(" ", "") + ".md"

    console.log(`⋅ Writing ${familyFileName}`)

    await Deno.writeTextFile(
        `${DEVICE_DOCS_PATH}/${familyFileName}`, 
        output
    )

}

console.log("⋅ Done")
console.log()

// MARK: Functions

function uniqueDeviceName(device: IDevice): string {

    switch (device.family) {
    case "iPhone":

        // Don't include generation component
        // for iPhone "X" devices

        if ((device.gen == 11 || device.gen == 12) && device.traits.includes("display.fluid")) {
            return variantDeviceName(device)
        }

        break

    case "Apple_TV":

        // "Apple TV 4K" has a number in its name, but it doesn't
        // correlate to anything generational. We need to keep the
        // generation component to uniquely identify these devices.

        return fullDeviceName(device)

    default: break
    }

    const stringContainsNumber = /\d/

    if (stringContainsNumber.test(device.name)) {
        return variantDeviceName(device)
    }

    return fullDeviceName(device)

}

function variantDeviceName(device: IDevice): string {

    let name = device.name

    if (device.variant) {
        name += ` (${device.variant})`
    }

    return name

}

function fullDeviceName(device: IDevice): string {

    let name = variantDeviceName(device)

    if (device.gen > 1) {
        name += ` (${ordinalString(device.gen)} Gen)`
    }

    return name

}

function stringForSoftware(software: ISoftware): string {

    let output = software.name

    if (software.device_version) {

        output += ` ${software.device_version.min} →`

        if (software.device_version.max) {
            output += ` ${software.device_version.max}`
        }
        else if (software.version.max) {
            output += ` ${software.version.max}`
        }

    }

    return `\`${output}\``

}

function ordinalString(num: number): string {

    let ordinal = "th"

    if (num % 10 == 1 && num % 100 != 11) {
        ordinal = "st"
    }
    else if (num % 10 == 2 && num % 100 != 12) {
        ordinal = "nd"
    }
    else if (num % 10 == 3 && num % 100 != 13) {
        ordinal = "rd"
    }

    return `${num}${ordinal}`

}
