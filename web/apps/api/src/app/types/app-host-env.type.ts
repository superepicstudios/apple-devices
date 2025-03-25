export enum AppHostEnv {

    DEV  = "dev",
    PROD = "prod"

}

export namespace AppHostEnv {

    export function current(): AppHostEnv {

        const env = Deno.env
            .get("NODE_ENV") ?? "dev"
            .toLowerCase()

        return AppHostEnv
            .from(env)

    }

    export function from(str: string): AppHostEnv {

        const env = str.toLowerCase()

        if (env == "prod" || env == "production") {
            return AppHostEnv.PROD
        }

        return AppHostEnv.DEV

    }

    export function isProduction(): boolean {
        return current() == AppHostEnv.PROD
    }

    export function isDevelopment(): boolean {
        return current() == AppHostEnv.DEV
    }

}
