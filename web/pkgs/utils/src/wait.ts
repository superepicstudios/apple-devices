import { convertTimeDuration, TimeComponent } from "./date.ts"

export async function wait(

    duration: number, 
    component: TimeComponent

) {

    const ms = convertTimeDuration(
        duration, 
        component, 
        TimeComponent.MILLISECOND
    )

    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })

}

export async function waitMs(ms: number) {

    await wait(
        ms, 
        TimeComponent.MILLISECOND
    )

}

export async function waitSec(sec: number) {

    await wait(
        sec, 
        TimeComponent.SECOND
    )

}
