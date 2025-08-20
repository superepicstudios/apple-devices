# Rest API → Devices

## Response Overview

```json
{
    "name": "iPad Pro", ⋅⋅⋅⋅⋅⋅⋅⋅ Marketing name
    "family": "iPad", ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ Family identifier
    "variant": "12.9-inch", ⋅⋅⋅ Variant name (optional)
    "year": 2015, ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ Release year
    "gen": 1, ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ ⋅⋅⋅Generation number
    "chip": {
        "id": "a9x", ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ Chip identifier
        "name": "Apple A9X" ⋅⋅⋅ Chip name
    },
    "software": [
        {
            "id": "ipados", ⋅⋅⋅⋅⋅ Software identifier
            "name": "iPadOS", ⋅⋅⋅ Software name
            "version": {
                "min": "13.1", ⋅⋅⋅⋅ Software minimum (initial) version
                "max": "18.6.2" ⋅⋅⋅ Software maximum (current) version
            },
            "device_version": {
                "min": "13.1", ⋅⋅⋅⋅⋅ Device minimum (initial) software version
                "max": "16.7.10" ⋅⋅⋅ Device maximum software version (optional)
            }
        }
    ],
    "traits": ["button.home"], ⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅ Device traits
    "internal_names": ["J1AP", "J2AP", "J2AAP"], ⋅⋅⋅ Internal names
    "a_numbers": ["A1416", "A1403", "A1430"], ⋅⋅⋅⋅⋅⋅⋅ A numbers
    "ids": ["iPad3,1", "iPad3,2", "iPad3,3"] ⋅⋅⋅⋅⋅⋅⋅⋅ Identifiers
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
    "family": "iPhone",
    "year": 2007,
    "gen": 1,
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
    "traits": [
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
- `gen`: Filter devices by generation
- `trait`: Filter devices by supported trait
- `not-trait`: Filter devices by unsupported trait

::: code-group
```sh [Request]
curl -XGET 'https://api.fuckingappledevices.com/v1/devices?family=iphone&year=2007&year=2009'
```
```json [Response]
[
    {
        "name": "iPhone",
        "family": "iPhone",
        "year": 2007,
        "gen": 1,
        "chip": {
            "id": "APL0098",
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
        "traits": [
            "button.home"
        ],
        "internal_names": ["M68AP"],
        "a_numbers": ["A1203"],
        "ids": ["iPhone1,1"]
    },
    {
        "name": "iPhone 3GS",
        "family": "iPhone",
        "year": 2009,
        "gen": 3,
        "chip": {
            "id": "APL0298",
            "name": "APL0298"
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
                    "min": "3.0",
                    "max": "3.2.2"
                }
            },
            {
                "id": "ios",
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
        "traits": [
            "button.home"
        ],
        "internal_names": ["N88AP"],
        "a_numbers": ["A1303", "A1325"],
        "ids": ["iPhone2,1"]
    }
]
```
