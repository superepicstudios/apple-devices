//
//  AppleDevice+Features.swift
//  AppleDevices
//
//  Created by Mitch on 3/16/25.
//  Copyright © 2025 Super Epic Studios, LLC. All rights reserved.
//

import Foundation

public extension AppleDevice /* Features */ {
    
    /// Gets all devices containing a set of features.
    /// - parameter features: A set of features to query.
    /// - returns: An array of matching devices.
    static func withFeatures(_ features: Feature...) -> [AppleDevice] {
        
        return self.all.filter { device in
                        
            for feature in features {
            
                if !device.features.contains(feature) {
                    return false
                }
            
            }
            
            return true
            
        }
        
    }
    
    /// Determines if the device contains a set of features.
    /// - parameter features: A set of features to query.
    /// - returns: A flag indicating if the device contains the queried features.
    func hasFeatures(_ features: Feature...) -> Bool {
     
        for feature in features {
            
            if !self.features.contains(feature) {
                return false
            }
            
        }
        
        return true
                
    }

}
