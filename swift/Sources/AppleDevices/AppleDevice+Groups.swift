//
//  AppleDevice+Groups.swift
//  AppleDevices
//
//  Created by Mitch on 3/9/25.
//  Copyright © 2025 Super Epic Studios, LLC. All rights reserved.
//

import Foundation

public extension AppleDevice /* Groups */ {
        
    /// An array of all devices.
    static var all: [AppleDevice] {

        let datas = (try? deviceData()) ?? []
        
        return datas
            .map { AppleDevice(data: $0) }
        
    }
    
    /// Gets all devices descending from a set of families.
    /// - parameter families: A set of families to query.
    /// - returns: An array of matching devices.
    static func withFamilies(_ families: Family...) -> [AppleDevice] {
        
        return self.all.filter { device in
            
            for family in families {
                
                if device.family == family {
                    return true
                }
                
            }
            
            return false
            
        }
        
    }
    
    /// Gets all devices with identifiers containing a set of queries.
    /// - parameter queries: A set of queries.
    /// - returns: An array of matching devices.
    static func withIdentifiersContaining(_ queries: String...) -> [AppleDevice] {
        
        return self.all.filter { device in
                    
            for id in device.identifiers {
                
                for query in queries {
                    
                    if id.contains(query) {
                        return true
                    }
                    
                }
                
            }
            
            return false
            
        }
        
    }
    
    /// Gets all devices with names containing a set of queries.
    /// - parameter queries: A set of queries.
    /// - returns: An array of matching devices.
    static func withNamesContaining(_ queries: String...) -> [AppleDevice] {
        
        return self.all.filter { device in
            
            for query in queries {
                
                if device.name.contains(query) {
                    return true
                }
                
            }
            
            return false
                        
        }
        
    }
    
    /// Gets all devices with generation numbers containing a set of queries.
    /// - parameter queries: A set of queries.
    /// - returns: An array of matching devices.
    static func withGenerationsContaining(_ queries: Int...) -> [AppleDevice] {
        
        return self.all.filter { device in
        
            for query in queries {
                
                if device.generation == query {
                    return true
                }
                
            }
            
            return false
            
        }
        
    }
    
    // MARK: Handhelds
    
    /// An array of handheld devices.
    static var handhelds: [AppleDevice] {
        
        return (
            self.ipads +
            self.iphones +
            self.ipods
        )
        
    }
    
    /// An array of iPad devices.
    static var ipads: [AppleDevice] {
        return self.withFamilies(.ipad)
    }
    
    /// An array of iPhone devices.
    static var iphones: [AppleDevice] {
        return self.withFamilies(.iphone)
    }
    
    /// An array of iPod devices.
    static var ipods: [AppleDevice] {
        return self.withFamilies(.ipod)
    }
    
    /// Flag indicating if the device is a handheld.
    var isHandheld: Bool { self.isPad || self.isPhone || self.isPod }
    
    /// Flag indicating if the device is an iPad.
    var isPad: Bool { self.family == .ipad }
    
    /// Flag indicating if the device is an iPhone.
    var isPhone: Bool { self.family == .iphone }
    
    /// Flag indicating if the device is an iPod.
    var isPod: Bool { self.family == .ipod }
    
    // MARK: Wearables
    
    /// An array of wearable devices.
    static var wearables: [AppleDevice] {
        
        return (
            self.airpods +
            self.appleVisions +
            self.appleWatches
        )
        
    }
    
    /// An array of AirPod devices.
    static var airpods: [AppleDevice] {
        return self.withFamilies(.airpod)
    }
    
    /// An array of Apple Watch devices.
    static var appleWatches: [AppleDevice] {
        return self.withFamilies(.watch)
    }
    
    /// An array of Apple Vision devices.
    static var appleVisions: [AppleDevice] {
        return self.withFamilies(.vision)
    }
    
    /// Flag indicating if the device is a wearable.
    var isWearable: Bool { self.isAirPod || self.isWatch || self.isVision }
    
    /// Flag indicating if the device is an AirPod.
    var isAirPod: Bool { self.family == .airpod }
    
    /// Flag indicating if the device is an Apple Watch.
    var isWatch: Bool { self.family == .watch }
    
    /// Flag indicating if the device is an Apple Vision.
    var isVision: Bool { self.family == .vision }
    
    // MARK: Home Devices
    
    /// An array of home devices.
    static var homeDevices: [AppleDevice] {
        
        return (
            self.appleTvs +
            self.homepods
        )
        
    }
    
    /// An array of Apple TV devices.
    static var appleTvs: [AppleDevice] {
        return self.withFamilies(.appletv)
    }
    
    /// An array of HomePod devices.
    static var homepods: [AppleDevice] {
        return self.withFamilies(.homepod)
    }
    
    /// Flag indicating if the device is a home device.
    var isHomeDevice: Bool { self.isTv || self.isHomePod }
    
    /// Flag indicating if the device is an Apple TV.
    var isTv: Bool { self.family == .appletv }
    
    /// Flag indicating if the device is a HomePod.
    var isHomePod: Bool { self.family == .homepod }
    
    // MARK: Accessories
    
    /// An array of accessory devices.
    static var accessories: [AppleDevice] {
        return self.airtags
    }
    
    /// An array of AirTag devices.
    static var airtags: [AppleDevice] {
        return self.withFamilies(.airtag)
    }
    
    /// Flag indicating if the device is an accessory.
    var isAccessory: Bool { self.isTag }
    
    /// Flag indicating if the device is an AirTag.
    var isTag: Bool { self.family == .airtag }
    
}
