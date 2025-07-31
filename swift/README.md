# 📱 Apple Devices

Tiny (but awesome) SPM library for access to device information,
metadata, model numbers, and identifiers.

## ⬇️ Installation

### SPM

The easiest way to get started is installing via Xcode. Add a package dependency with the following url:

`https://github.com/superepicstudios/apple-devices`

Developing your own package and want to use this as a dependency? Just add a package entry:

```swift
.package(
    url: "https://github.com/superepicstudios/apple-devices",
    from: "2025.0.0"
)
```

## 👨🏻‍💻 Usage

### Get the Current Device

```swift
import AppleDevices

let device = AppleDevice()

device.name        // → "iPhone"
device.identifiers // → ["iPhone1,1"]
device.isSimulated // → true
```

### Get a Specific Device

```swift
import AppleDevices

guard let device = AppleDevice("iPhone2,1") else {
    return
}

device.name        // → "iPhone 3GS"
device.identifiers // → ["iPhone2,1"]
```

### Get Devices by Group

```swift
import AppleDevices

let all       = AppleDevice.all()

// Handhelds

let handhelds = AppleDevice.handhelds()
let ipads     = AppleDevice.ipads()
let iphones   = AppleDevice.iphones()
let ipods     = AppleDevice.ipods()

// Wearables

let wearables = AppleDevice.wearables()
let airpods   = AppleDevice.airpods()
let watches   = AppleDevice.appleWatches()
let visions   = AppleDevice.appleVisions()

// Home Devices

let homeDevices = AppleDevice.homeDevices()
let appleTvs    = AppleDevice.appleTvs()
let homepods    = AppleDevice.homepods()

// Accessories

let accessories = AppleDevice.accessories()
let airtags     = AppleDevice.airtags()
```

### Get Devices by Query

```swift
import AppleDevices

let phonesAndPads = AppleDevice.withFamilies(
    .iphone, 
    .ipad
)

let earlyPhones = AppleDevice.withIdentifiersContaining(
    "iPhone1,1", 
    "iPhone2,1", 
    "iPhone2,2"
)

let ipadsByName = AppleDevice
    .withNamesContaining("iPad")

let maxDevices = AppleDevice
    .withGenNamesContaining("Max")

let aodDevices = AppleDevice
    .withTraits(.alwaysOnDisplay)
```
