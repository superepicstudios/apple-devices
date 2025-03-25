# Rest API → Devices

## Response Overview

```json
{
    "name": "iPad", ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ Marketing name
    "gen_name": "iPad (3rd Gen)", ⋅ Generational name (optional)
    "year": 2012, ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ Release year
    "family": "iPad", ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ Family identifier
    "chip": {
        "id": "a5x", ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ Chip identifier
        "name": "Apple A5X" ⋅⋅⋅⋅⋅⋅⋅ Chip name
    },
    "software": [
        {
            "id": "ios", ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ Software identifier
            "name": "iOS", ⋅⋅⋅⋅⋅⋅⋅⋅ Software name
            "version": {
                "min": "4.0", ⋅⋅⋅⋅⋅ Software minimum (initial) version
                "max": "18.3.2" ⋅⋅⋅ Software maximum (current) version
            },
            "device_version": {
                "min": "5.1", ⋅⋅⋅⋅⋅ Device's minimum (initial) software version
                "max": "9.3.5" ⋅⋅⋅⋅ Device's maximum software version (optional)
            }
        }
    ],
    "features": ["button.home"], ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ Device's feature list
    "internal_names": ["J1AP", "J2AP", "J2AAP"], ⋅ Internal names
    "a_numbers": ["A1416", "A1403", "A1430"], ⋅⋅⋅⋅ A numbers
    "ids": ["iPad3,1", "iPad3,2", "iPad3,3"] ⋅⋅⋅⋅⋅ Identifiers
}
```

## Get a Single Device <Badge type="info" text="v1" />

`https://api.fuckingappledevices.com/v1/devices/:id`

::: code-group
```sh [Request]
curl -XGET 'https://api.fuckingappledevices.com/v1/devices/iphone1,1'
```
```json [Response]
{
    "name": "iPhone",
    "year": 2007,
    "family": "iPhone",
    "chip": {
        "id": "apl0098",
        "name": "APL0098"
    },
    "software": [
        {
            "id": "iphoneos",
            "name": "iPhone OS",
            "version": {
                "min": "1.0",
                "max": "3.2.2"
            },
            "device_version": {
                "min": "1.0",
                "max": "3.2.2"
            }
        }
    ],
    "features": [
        "button.home"
    ],
    "internal_names": ["M68AP"],
    "a_numbers": ["A1203"],
    "ids": ["iPhone1,1"]
}
```
:::

## Get Multiple Devices <Badge type="info" text="v1" />

`https://api.fuckingappledevices.com/v1/devices`

#### Query Params

- `family`: Filter devices by family
- `year`: Filter devices by release year
- `feature`: Filter devices by supported feature
- `not-feature`: Filter devices by unsupported feature

::: code-group
```sh [Request]
curl -XGET 'https://api.fuckingappledevices.com/v1/devices?family=iphone&year=2007&year=2009'
```
```json [Response]
[
    {
        "name": "iPhone",
        "year": 2007,
        "family": "IPHONE",
        "chip": {
            "id": "APL0098",
            "name": "APL0098"
        },
        "software": [
            {
                "id": "IPHONEOS",
                "name": "iPhone OS",
                "version": {
                    "min": "1.0",
                    "max": "3.2.2"
                },
                "device_version": {
                    "min": "1.0",
                    "max": "3.2.2"
                }
            }
        ],
        "features": [
            "button.home"
        ],
        "internal_names": ["M68AP"],
        "a_numbers": ["A1203"],
        "ids": ["iPhone1,1"]
    },
    {
        "name": "iPhone 3GS",
        "year": 2009,
        "family": "IPHONE",
        "chip": {
            "id": "APL0298",
            "name": "APL0298"
        },
        "software": [
            {
                "id": "IPHONEOS",
                "name": "iPhone OS",
                "version": {
                    "min": "1.0",
                    "max": "3.2.2"
                },
                "device_version": {
                    "min": "3.0",
                    "max": "3.2.2"
                }
            },
            {
                "id": "IOS",
                "name": "iOS",
                "version": {
                    "min": "4.0",
                    "max": "18.3.2"
                },
                "device_version": {
                    "min": "4.0",
                    "max": "6.1.6"
                }
            }
        ],
        "features": [
            "button.home"
        ],
        "internal_names": ["N88AP"],
        "a_numbers": ["A1303", "A1325"],
        "ids": ["iPhone2,1"]
    }
]
```
