//
//  AppleDevice+Helpers.swift
//  AppleDevices
//
//  Created by Mitch on 3/16/25.
//  Copyright © 2025 Super Epic Studios, LLC. All rights reserved.
//

import Foundation

public extension AppleDevice /* Helpers */ {
    
    /// The device's most descriptive (generational _or_ marketing) name.
    var descriptiveName: String { self.genName ?? self.name }
    
    /// Flag indicating if the device has a fluid (edge-to-edge) display.
    var hasFluidDisplay: Bool { hasTraits(.fluidDisplay) }
        
    /// Flag indicating if the device has a compact (4.7" or smaller) display.
    var hasCompactDisplay: Bool {
        
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
    
}
