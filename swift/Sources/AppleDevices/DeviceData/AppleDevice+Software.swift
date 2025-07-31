//
//  AppleDevice+Software.swift
//  AppleDevices
//
//  Created by Mitch on 3/9/25.
//

import Foundation

public extension AppleDevice /* Software */ {
        
    /// Representation of a device's software.
    struct Software: Codable, Sendable {
        
        /// Representation of software version information.
        public struct Version: Codable, Sendable {
            
            /// The software's minimum version.
            public let min: String
            
            /// The software's maximum version.
            public let max: String?
            
        }
        
        /// The software's identifier.
        public let id: String
        
        /// The software's name.
        public let name: String
        
        /// The software's version information.
        public let version: Version
        
        /// The device's software version information.
        public let deviceVersion: Version?
        
        public enum CodingKeys: String, CodingKey {
            
            case id
            case name
            case version
            case deviceVersion = "device_version"
            
        }
        
    }

}
