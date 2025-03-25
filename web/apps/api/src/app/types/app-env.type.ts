import Joi from "joi"

export enum AppEnv {

    DEV   = "dev",
    PROD  = "prod"

}

export namespace AppEnv {

    export function current(): AppEnv {

        const env = Deno.env
            .get(AppEnvKey.APP_ENV) ?? AppEnvDefault.APP_ENV
            .toLowerCase()

        return AppEnv
            .from(env)

    }

    export function from(str: string): AppEnv {

        const env = str.toLowerCase()

        if (env == "prod" || env == "production") {
            return AppEnv.PROD
        }

        return AppEnv.DEV

    }

    export function isProduction(): boolean {
        return current() == AppEnv.PROD
    }

    export function isDevelopment(): boolean {
        return current() == AppEnv.DEV
    }

    // App

    export function name(): string {
        return Deno.env.get(AppEnvKey.APP_NAME) ?? AppEnvDefault.APP_NAME
    }

    export function description(): string | undefined {
        return Deno.env.get(AppEnvKey.APP_DESC)
    }

    export function version(): string {
        return Deno.env.get(AppEnvKey.APP_VERSION) ?? AppEnvDefault.APP_VERSION
    }

    export function url(): string {
        return Deno.env.get(AppEnvKey.APP_URL) ?? AppEnvDefault.APP_URL
    }

    export function port(): number {
        return Number(Deno.env.get(AppEnvKey.APP_PORT) ?? AppEnvDefault.APP_PORT)
    }

    export function prefix(): string | undefined {
        return Deno.env.get(AppEnvKey.APP_PREFIX)
    }

    export function formattedUrl(): string {

        let pre = prefix()
        let addr = `${url()}:${port().toString()}`

        if (pre) {

            if (pre.charAt(0) === "/") {
                pre = pre.substring(1)
            }

            addr = `${addr}/${pre}`

        }

        return addr

    }

    // Data

    export function familyFilePath(): string {
        return Deno.env.get(AppEnvKey.FAMILY_FILE_PATH)!
    }

    export function deviceDataDir(): string {
        return Deno.env.get(AppEnvKey.DEVICE_DATA_DIR)!
    }

    export function chipDataDir(): string {
        return Deno.env.get(AppEnvKey.CHIP_DATA_DIR)!
    }

    export function softwareDataDir(): string {
        return Deno.env.get(AppEnvKey.SOFTWARE_DATA_DIR)!
    }

}

// MARK: Schema

export const AppEnvKey = {

    APP_NAME: "APP_NAME",
    APP_DESC: "APP_DESC",
    APP_VERSION: "APP_VERSION",
    APP_URL: "APP_URL",
    APP_PORT: "APP_PORT",
    APP_PREFIX: "APP_PREFIX",
    APP_ENV: "APP_ENV",

    FAMILY_FILE_PATH: "FAMILY_FILE_PATH",
    DEVICE_DATA_DIR: "DEVICE_DATA_DIR",
    CHIP_DATA_DIR: "CHIP_DATA_DIR",
    SOFTWARE_DATA_DIR: "SOFTWARE_DATA_DIR"

}

const AppEnvDefault = {

    APP_NAME: "Apple Device API",
    APP_VERSION: "1.0.0",
    APP_URL: "localhost",
    APP_PORT: 3000,
    APP_ENV: "dev",

}

export const AppEnvSchema = Joi.object({
    
    APP_NAME: Joi
        .string()
        .default(AppEnvDefault.APP_NAME),

    APP_DESC: Joi
        .string()
        .optional(),

    APP_VERSION: Joi
        .string()
        .default(AppEnvDefault.APP_VERSION),

    APP_URL: Joi
        .string()
        .default(AppEnvDefault.APP_URL),

    APP_PORT: Joi
        .number()
        .default(AppEnvDefault.APP_PORT),

    APP_PREFIX: Joi
        .string()
        .optional(),

    APP_ENV: Joi
        .string()
        .default(AppEnvDefault.APP_ENV),

    // Data

    FAMILY_FILE_PATH: Joi
        .string(),

    DEVICE_DATA_DIR: Joi
        .string(),

    CHIP_DATA_DIR: Joi
        .string(),

    SOFTWARE_DATA_DIR: Joi
        .string()

})
