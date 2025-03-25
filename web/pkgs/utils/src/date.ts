export enum DateComponent {

    DAY,
    MONTH,
    YEAR

}

export enum TimeComponent {

    MILLISECOND,
    SECOND,
    MINUTE,
    HOUR

}

export function convertTimeDuration(
    
    value: number, 
    unit: TimeComponent, 
    target: TimeComponent

): number {

    switch (unit) {
    case TimeComponent.MILLISECOND:

        // ms → x

        switch (target) {
        case TimeComponent.MILLISECOND: return value
        case TimeComponent.SECOND:      return value / 1_000
        case TimeComponent.MINUTE:      return value / 1_000 * 60
        case TimeComponent.HOUR:        return value / 1_000 * 60 * 60
        }

        break

    case TimeComponent.SECOND:

        // sec → x

        switch (target) {
        case TimeComponent.MILLISECOND: return value * 1_000
        case TimeComponent.SECOND:      return value
        case TimeComponent.MINUTE:      return value / 60
        case TimeComponent.HOUR:        return value / 60 * 60
        }

        break

    case TimeComponent.MINUTE:

        // min → x

        switch (target) {
        case TimeComponent.MILLISECOND: return value * 1_000 * 60
        case TimeComponent.SECOND:      return value * 60
        case TimeComponent.MINUTE:      return value
        case TimeComponent.HOUR:        return value / 60
        }

        break

    case TimeComponent.HOUR:

        // hr → x

        switch (target) {
        case TimeComponent.MILLISECOND: return value * 1_000 * 60 * 60
        case TimeComponent.SECOND:      return value * 60 * 60
        case TimeComponent.MINUTE:      return value * 60
        case TimeComponent.HOUR:        return value
        }

        break

    }

}

declare global {

    interface Date {

        /**
         * Adds a value to the specified date component.
         * @param value The value to add.
         * @param unit The date component.
         */
        addDateComponent(value: number, component: DateComponent): Date

        /**
         * Adds a value to the specified time component.
         * @param value The value to add.
         * @param unit The time component.
         */
        addTimeComponent(value: number, component: TimeComponent): Date
        
    }

}

Date.prototype.addDateComponent = function(
    
    value: number, 
    component: DateComponent

): Date {
    
    switch (component) {
    case DateComponent.DAY:

        return new Date(this.getDay() + value)

    case DateComponent.MONTH:

        return new Date(this.getMonth() + value)

    case DateComponent.YEAR:

        return new Date(this.getFullYear() + value)

    }

}

Date.prototype.addTimeComponent = function(
    
    value: number, 
    component: TimeComponent

): Date {
    
    switch (component) {
    case TimeComponent.MILLISECOND:

        return new Date(this.getTime() + value)

    case TimeComponent.SECOND:

        return new Date(this.getSeconds() + value)

    case TimeComponent.MINUTE:

        return new Date(this.getMinutes() + value)

    case TimeComponent.HOUR:

        return new Date(this.getHours() + value)

    }

}
