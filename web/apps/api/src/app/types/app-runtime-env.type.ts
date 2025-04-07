export enum AppRuntimeEnv {

    DEV  = "development",
    PROD = "production"

}

export namespace AppRuntimeEnv {

    export function current(): AppRuntimeEnv {

        const env = Deno.env
            .get("NODE_ENV") ?? "development"
            .toLowerCase()

        return AppRuntimeEnv
            .from(env)

    }

    export function from(str: string): AppRuntimeEnv {

        const env = str.toLowerCase()

        if (env == "p" || env == "prod" || env == "production") {
            return AppRuntimeEnv.PROD
        }

        return AppRuntimeEnv.DEV

    }

    export function isProduction(): boolean {
        return current() == AppRuntimeEnv.PROD
    }

    export function isDevelopment(): boolean {
        return current() == AppRuntimeEnv.DEV
    }

}
