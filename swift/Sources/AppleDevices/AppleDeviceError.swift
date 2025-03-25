//
//  AppleDeviceError.swift
//  AppleDevices
//
//  Created by Mitch on 3/9/25.
//  Copyright © 2025 Super Epic Studios, LLC. All rights reserved.
//

import Foundation

/// Representation of the various Apple device errors.
public enum AppleDeviceError: Error {
    
    /// An error representing missing device data.
    case missingData
    
    /// An error representing invalid device data.
    case invalidDataFormat
    
    /// An error representing a missing device identifier.
    case missingIdentifier
    
}
