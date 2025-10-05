//
//  AppleDevice+Helpers.swift
//  AppleDevices
//
//  Created by Mitch on 3/16/25.
//  Copyright © 2025 Super Epic Studios, LLC. All rights reserved.
//

import Foundation

extension AppleDevice /* Helpers */ {
    
    /// Representation of a device's available name components.
    public struct NameComponents: OptionSet, Sendable {
        
        public let rawValue: UInt
        
        public init(rawValue: UInt) {
            self.rawValue = rawValue
        }
        
        /// A variant name component.
        public static let variant = NameComponents(rawValue: 1 << 0)
        
        /// A generation name component.
        public static let generation = NameComponents(rawValue: 1 << 1)
        
        /// All name components.
        public static let all: NameComponents = [.variant, .generation]
        
    }
    
    /// Gets the device's using a set of components.
    /// - parameter components: The name components to include.
    /// - returns: A formatted device name.
    ///
    /// - Note: Components will only be included if they're available,
    ///   and make sense to be added. For example, `generation` components
    ///   will be excluded if the device is considered "first-generation".
    public func name(with components: NameComponents) -> String {
        
        var name = self.name
        
        if let variant, components.contains(.variant) {
            name += " (\(variant))"
        }
        
        if self.generation > 1, components.contains(.generation) {
            name += " (\(self.generation.ordinalString) Gen)"
        }
        
        return name
        
    }
    
    /// The device's simplest, but uniquely identifiable name.
    ///
    /// This uses various components to produce the simplest possible
    /// device name, while still being completely unique. For example,
    /// the `iPad` family has many devices that share the same name
    /// but have different variants belonging to different generations.
    /// However, the `iPhone` family already contains semi-generational
    /// values in its device names. i.e. "iPhone 7", "iPhone 13", etc.
    public var uniqueName: String {
                
        switch self.family {
        case .iphone:
            
            // Drop generation for iPhone "X" & "Air" devices.

            let generations = [11, 12, 19]

            if generations.contains(self.generation) && self.hasFluidDisplay {
                return name(with: .variant)
            }
            
        case .appletv:
            
            // "Apple TV 4K" has a number in its name, but it doesn't
            // correlate to anything generational. We need to keep the
            // generation component to uniquely identify these devices.
            
            return name(with: .all)
            
        default: break
        }
        
        // If name already contains digits, exclude generation component.
        
        if self.name.rangeOfCharacter(from: .decimalDigits) != nil {
            return name(with: .variant)
        }
        
        return name(with: .all)
        
    }
    
    /// Flag indicating if the device has a fluid (edge-to-edge) display.
    public var hasFluidDisplay: Bool {
        hasTraits(.fluidDisplay)
    }
        
    /// Flag indicating if the device has a compact (4.7" or smaller) display.
    public var hasCompactDisplay: Bool {
        
        AppleDevice.withIdentifiersContaining(
            
            "iPhone1,1", // OG
            "iPhone1,2", "iPhone2,1", // 3G, 3GS,
            "iPhone3,1", "iPhone3,2", "iPhone3,3", "iPhone4,1", // 4, 4S
            "iPhone5,1", "iPhone5,2", "iPhone5,3", "iPhone5,4", "iPhone6,1", "iPhone6,2", // 5, 5c, 5S
            "iPhone7,2", "iPhone8,1", // 6, 6S
            "iPhone9,1", "iPhone9,3", // 7
            "iPhone10,1", "iPhone10,4", // 8
            "iPhone8,4", "iPhone12,8", "iPhone14,6" // SE, SE (2nd), SE (3rd)
            
        )
        .contains(self) || self.isWatch
        
    }
    
    /// Gets a formatted software range string for the device.
    /// - parameter latestOnly: Flag indicating if only the most recently
    ///   supported software should be used.
    /// - returns: A formatted software range string.
    public func softwareRangeString(latestOnly: Bool = true) -> String {
        
        let softwares: [Software] = latestOnly ?
            ((self.software.supported.last != nil) ? [self.software.supported.last!] : []) :
            self.software.supported.reversed()
        
        guard !softwares.isEmpty else {
            return "Unknown"
        }
        
        var strings = [String]()
        
        for idx in 0..<softwares.count {
            
            let sw = softwares[idx]
            var result: String
            
            result = "\(sw.name)"

            if let version = sw.deviceVersion {

                result += " \(version.min) →"

                if let deviceMax = version.max {
                    result += " \(deviceMax)"
                }
                else if let softwareMax = sw.version.max {
                    result += " \(softwareMax)"
                }

            }
            
            strings.append(result)
            
        }
        
        return strings.joined(
            separator: ", "
        )
        
    }
    
}
