# Rest API → Software

## Response Overview

```json
{
    "id": "iphoneos", ⋅⋅⋅⋅⋅⋅ Identifier
    "name": "iPhone OS", ⋅⋅⋅ Marketing name
    "version": {
        "min": "1.0", ⋅⋅⋅⋅⋅⋅ Minimum (initial) version
        "max": "3.2.2" ⋅⋅⋅⋅⋅ Maximum (current) version
    }
}
```

## Get a Single Software <Badge type="info" text="v1" />

`https://api.fuckingappledevices.com/v1/software/:id`

::: code-group
```sh [Request]
curl -XGET 'https://api.fuckingappledevices.com/v1/software/ios'
```
```json [Response]
{
    "id": "ios",
    "name": "iOS",
    "version": {
        "min": "1.0",
        "max": "18.3.2"
    }
}
```
:::

## Get Multiple Softwares <Badge type="info" text="v1" />

`https://api.fuckingappledevices.com/v1/software`

::: code-group
```sh [Request]
curl -XGET 'https://api.fuckingappledevices.com/v1/software'
```
```json [Response]
[
    {
        "id": "iphoneos",
        "name": "iPhone OS",
        "version": {
            "min": "1.0",
            "max": "3.2.2"
        }
    },
    {
        "id": "ios",
        "name": "iOS",
        "version": {
            "min": "4.0",
            "max": "18.3.2"
        }
    }
]
```
:::
