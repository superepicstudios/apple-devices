import { load as loadEnv } from "@std/dotenv"
import { z } from "zod"

export enum AppEnv {

    DEV = "development",
    PROD = "production"

}

export namespace AppEnv {
    
    let _env: z.infer<typeof AppEnvSchema> | undefined

    export async function setup() {

        await loadEnv({
            export: true
        })

        env()

    }

    export function current(): AppEnv {
        return from(env().APP_ENV)
    }

    export function isProduction(): boolean {
        return current() == AppEnv.PROD
    }

    export function isDevelopment(): boolean {
        return current() == AppEnv.DEV
    }

    // MARK: App

    export function name(): string { 
        return "Apple Device API"
    }

    export function description(): string {
        return "The Apple Device API"
    }

    export function version(): string {
        return env().APP_VERSION
    }

    export function url(): string {
        return env().APP_URL
    }

    export function port(): number {
        return env().APP_PORT
    }

    export function formattedUrl(): string {
        return `${url()}:${port().toString()}`
    }

    // MARK: Data

    export function familyFilePath(): string {
        return env().FAMILY_FILE_PATH
    }

    export function deviceDataDir(): string {
        return env().DEVICE_DATA_DIR
    }

    export function chipDataDir(): string {
        return env().CHIP_DATA_DIR
    }

    export function softwareDataDir(): string {
        return env().SOFTWARE_DATA_DIR
    }

    // MARK: Private

    function env(): z.infer<typeof AppEnvSchema> {

        if (_env) {
            return _env
        }

        _env = AppEnvSchema
            .parse(Deno.env.toObject())

        return _env

    }

    function from(str: string): AppEnv {

        if (str == "p" || str == "prod" || str == "production") {
            return AppEnv.PROD
        }

        return AppEnv.DEV

    }

}

// MARK: Schema

export const AppEnvSchema = z.object({
    
    APP_VERSION: z
        .string()
        .default("0.0.0"),

    APP_URL: z
        .string()
        .default("localhost"),

    APP_PORT: z
        .coerce
        .number()
        .default(3000),

    APP_ENV: z
        .enum([
            "d", "dev", "development", 
            "p", "prod", "production"
        ])
        .default("development"),

    // Data

    FAMILY_FILE_PATH: z
        .string()
        .default("../../../data/family.json"),

    DEVICE_DATA_DIR: z
        .string()
        .default("../../../data/devices"),

    CHIP_DATA_DIR: z
        .string()
        .default("../../../data/chips"),

    SOFTWARE_DATA_DIR: z
        .string()
        .default("../../../data/software")

})
