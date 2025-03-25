import chalk, { type ColorName } from "chalk"

/**
 * Applies rainbow colorization to a string.
 * @param str The string to colorize.
 * @returns A rainbow colorized string.
 */
export function rainbow(str: string): string {

    const characters = str.split("")
    const colors: ColorName[] = ["red", "yellow", "green", "cyan", "blue", "magenta"]
    const colorCount = colors.length

    return characters.map((l, i) => {
        const color = colors[i%colorCount]
        return chalk[color](l)
    })
    .join("")

}
