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

        output += `## ${device.gen_name ?? device.name}\n`
        output += `- **Marketing Name**: \`${device.name}\`\n`

        if (device.gen_name) {
            output += `- **Generational Name**: \`${device.gen_name}\`\n`
        }

        output += `- **Family**: \`${family}\`\n`
        output += `- **Year**: \`${device.year}\`\n`
        output += `- **Chip**: \`${device.chip.name}\`\n`

        if (device.software.length > 0) {

            if (device.software.length == 1) {
                output += `- **Software**: ${stringForSoftware(device.software[0])}\n`
            }
            else {

                // Multiple software

                output += "- **Software**\n"

                for (const software of device.software) {
                    output += `  - ${stringForSoftware(software)}\n`
                }

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

function stringForSoftware(software: ISoftware): string {

    let output = `\`${software.name}\``

    if (software.device_version) {

        output += ` (_${software.device_version.min}...`

        if (software.device_version.max) {
            output += `${software.device_version.max}_)`
        }
        else {
            output += "_)"
        }

    }

    return output

}
