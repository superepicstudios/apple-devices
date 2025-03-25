import { $RefParser as JsonRefParser } from "@apidevtools/json-schema-ref-parser"
import { IDevice } from "../web/pkgs/types/src/device.interface.ts"

const DEVICE_DATA_PATH = "../data/devices"
const API_DATA_PATH = "../web/apps/api"
const SWIFT_DATA_PATH = "../swift/Sources/AppleDevices/Resources"

console.log()
console.log("⋅ Generating device data")

const devices: IDevice[] = []

for await (const entry of Deno.readDir(DEVICE_DATA_PATH)) {

    if (!entry.name.endsWith(".json")) {
        continue
    }
    
    const file = `${DEVICE_DATA_PATH}/${entry.name}`

    try {

        const json = await JsonRefParser
            .dereference(file)
        
        for (const device of Object.values(json)) {
            devices.push(device)
        }

    }
    catch {
        console.error(`Failed to dereference file: ${entry.name}`)
    }
    
}

console.log("⋅ Writing api data")

await Deno.writeTextFile(
    `${API_DATA_PATH}/data.json`, 
    JSON.stringify(devices)
)

console.log("⋅ Writing swift data")

await Deno.writeTextFile(
    `${SWIFT_DATA_PATH}/data.json`, 
    JSON.stringify(devices)
)

console.log("⋅ Done")
console.log()
