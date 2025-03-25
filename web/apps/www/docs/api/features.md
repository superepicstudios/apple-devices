# Rest API → Features

## Get Device Features <Badge type="info" text="v1" />

`https://api.fuckingappledevices.com/v1/features`

::: code-group
```sh [Request]
curl -XGET 'https://api.fuckingappledevices.com/v1/features
```
```json [Response]
[
    "button.action",
    "button.camera",
    "button.home",
    "display.always-on",
    "display.dynamic-island",
    "display.fluid",
    "display.notch",
    "display.pro-motion",
    "id.face",
    "id.optic",
    "id.touch",
    "intelligence"
]
```
:::
