import { load as loadEnv } from "@std/dotenv"
import { defineConfig } from "vitepress"

async function version(): Promise<string> {

    await loadEnv({
        export: true
    })

    return Deno.env.get("APP_VERSION") ?? "0.0.0"

}

export default defineConfig({

    title: "Fucking Apple Devices",
    titleTemplate: ":title | Fucking Apple Devices",
    description: "Fucking Apple Devices",
    lang: "en-US",
    cleanUrls: true,

    head: [
        ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
        ["meta", { property: "og:image", content: "https://fuckingappledevices.com/images/title.png" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "twitter:domain", content: "fuckingappledevices.com" }],
        ["meta", { property: "twitter:image", content: "https://fuckingappledevices.com/images/title.png"}],
        ["meta", { property: "twitter:card", content: "summary_large_image" }]
    ],

    themeConfig: {

        logo: "/images/nav.png",

        nav: [
            { text: "Home", link: "/" },
            { text: "Docs", link: "/docs" }
        ],

        search: {
            provider: "local"
        },

        sidebar: [
            {
                text: "Devices",
                base: "/docs/devices",
                items: [
                    { text: "AirPod", link: "/airpod" },
                    { text: "AirTag", link: "/airtag.md" },
                    { text: "Apple TV", link: "/appletv.md" },
                    { text: "Apple Vision", link: "/applevision.md" },
                    { text: "Apple Watch", link: "/applewatch.md" },
                    { text: "HomePod", link: "/homepod.md" },
                    { text: "iPad", link: "/ipad.md" },
                    { text: "iPhone", link: "/iphone.md" },
                    { text: "iPod", link: "/ipod.md" }
                ]
            },
            {
                text: "Rest API",
                base: "/docs/api",
                items: [
                    { text: "Devices", link: "/devices.md" },
                    { text: "Families", link: "/families.md" },
                    { text: "Traits", link: "/traits.md" },
                    { text: "Software", link: "/software.md" }
                ]
            },
            {
                text: "Swift Library",
                base: "/docs/swift",
                items: [
                    { text: "Usage", link: "/usage.md" }
                ]
            },
            {
                text: "See Also",
                items: [
                    { text: "Fucking Closure Syntax", link: "https://fuckingclosuresyntax.com" },
                    { text: "Fucking Block Syntax", link: "http://fuckingblocksyntax.com" },
                    { text: "Fucking Format Style", link: "https://fuckingformatstyle.com" },
                    { text: "Fucking If Case Let Syntax", link: "https://fuckingifcaseletsyntax.com" },
                    { text: "Fucking Multiple Trailing Closure Syntax", link: "https://www.fuckingmultipletrailingclosuresyntax.com" },
                    { text: "NSDateFormatter", link: "https://nsdateformatter.com" }
                ]
            }
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/superepicstudios/apple-devices" },
            { icon: "x", link: "https://x.com/superepicstudio" }
        ],

        footer: {
            copyright: `Copyright © 2025 Super Epic Studios, LLC<br><b>Made with ❤️ in Las Vegas</b><br><b>${await version()}</b><br>⭐️🍒🎰`,
        }

    },

    markdown: {
        theme: {
            light: "github-light",
            dark: "github-dark"
        }
    }

})
