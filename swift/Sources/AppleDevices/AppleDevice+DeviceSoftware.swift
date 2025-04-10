//
//  AppleDevice+DeviceSoftware.swift
//  AppleDevices
//
//  Created by Mitch Treece on 4/9/25.
//

import Foundation
import SemVer

// Might need something more robust in the future
// if we end up supporting desktop platforms etc
// https://github.com/MarcoEidinger/OSInfo

public extension AppleDevice /* Device Software */ {
    
    /// Representation of a device's software information.
    struct DeviceSoftware: Sendable {
        
        /// Representation of a current device's active software.
        public struct Current: Sendable {
            
            /// The software's identifier.
            public let id: String
            
            /// The software's name.
            public let name: String
            
            /// The software's version string.
            public let version: String
            
        }
        
        /// The device's supported software.
        public let supported: [Software]
        
        /// The current device's active software.
        public let current: Current?
        
    }
    
}

extension AppleDevice.DeviceSoftware.Current {
    
    static func get(deviceId: String,
                    supportedSoftware: [AppleDevice.Software]) -> Self {
        
        let osVersion = Version(os: ProcessInfo().operatingSystemVersion)
        let osVersionString = osVersion.versionString(formattedWith: .dropPatchIfZero)
        
        guard !supportedSoftware.isEmpty else {
            
            // This should never happen, but if it
            // does, fallback on unknown device values
            
            let software = AppleDevice.DeviceData
                .unknown(id: deviceId)
                .software
                .first!
            
            return .init(
                id: software.id,
                name: software.name,
                version: osVersionString
            )
            
        }
        
        guard supportedSoftware.count > 1 else {
            
            let software = supportedSoftware.first!
            
            return .init(
                id: software.id,
                name: software.name,
                version: osVersionString
            )
            
        }
        
        for software in supportedSoftware.reversed() {
            
            guard let maxString = software.version.max,
                  let min = Version(software.version.min),
                  let max = Version(maxString) else { continue }
            
            if osVersion >= min && osVersion <= max {
                
                return .init(
                    id: software.id,
                    name: software.name,
                    version: osVersionString
                )
                
            }
            
        }
        
        // NOTE: If we get here, it means the device is running an
        // operating system that is unsupported, or hasn't been added
        // to the data payload yet. We'll just assume we're using
        // the latest supported software for now.
        
        let software = supportedSoftware.last!
        
        return .init(
            id: software.id,
            name: software.name,
            version: osVersionString
        )
        
    }
    
}
