//
//  AppleDevice+Chip.swift
//  AppleDevices
//
//  Created by Mitch on 3/9/25.
//

import Foundation

public extension AppleDevice /* Chip */ {
    
    /// Representation of a device's chip.
    struct Chip: Codable, Sendable {
        
        /// The chip's identifier.
        public let id: String
        
        /// The chip's name.
        public let name: String
        
    }
    
}
