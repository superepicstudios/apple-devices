import { rainbow } from "@pkg/utils"
import { load as loadEnv } from "@std/dotenv"
import { blue, red, yellow } from "@std/fmt/colors"
import { App } from "./app/app.ts"
import { AppEnv } from "./app/types/app-env.type.ts"
import { AppHostEnv } from "./app/types/app-host-env.type.ts"
import { AppLogger } from "./app/types/app-logger.type.ts"

let app: App | undefined
const isProduction = AppEnv.isProduction()

async function main() {

    AppLogger.setup()

    await loadEnv({
        export: true
    })

    app = new App()

    await preboot()
    await app.boot()
    await postboot()

    await prelisten()
    await app.listen()
    await postlisten()

}; main()

// MARK: Lifecycle

async function preboot() {

    // Called before the application starts.
    // Use this function to do setup work that
    // is not dependent on other modules or services.

    if (!isProduction) {
        banner()
    }

}

async function postboot() {

    // Called after the application starts.
    // Use this function to do setup work that
    // is dependent on other modules or services.

}

async function prelisten() {

    // Called before the application starts
    // listening for connections.

}

async function postlisten() {

    // Called after the application starts
    // listening for connections.

    console.log()

}

// MARK: Banner

function banner() {

    // App & Env

    const hostEnv = AppHostEnv.current()
    const appEnv = AppEnv.current()
    const appName = AppEnv.name()
    const appVersion = AppEnv.version()
    const appAddress = AppEnv.formattedUrl()

    // Strings

    const headerString   = `📱 ${blue(appName)}` + yellow(` @ ${appVersion}`) + red(" | ") + blue("app: ") + yellow(appEnv) + blue(", host: ") + yellow(hostEnv) + red(" | ") + yellow(appAddress)

    const strings = []
    strings.push(headerString)

    const lineLength = maxSanitizedStringLength(strings) + 1
    const separatorLength = (lineLength + 3)

    // Print

    console.log()
    console.log(rainbow("=".repeat(separatorLength)))
    console.log(red("| ") + headerString + " ".repeat(lineLength - sanitizeString(headerString).length) + red("|"))
    console.log(rainbow("=".repeat(separatorLength)))
    console.log()

}

// MARK: Helpers

function sanitizeString(str: string): string {

    const target = /\u001b\[\d+m/gm

    return String(str)
        .replace(target, "")

}

function maxSanitizedStringLength(strings: string[]): number {

    const lengths = strings
        .map(s => sanitizeString(s).length)

    return Math
        .max(...lengths)

}
