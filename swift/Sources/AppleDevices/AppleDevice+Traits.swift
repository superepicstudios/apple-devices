//
//  AppleDevice+Traits.swift
//  AppleDevices
//
//  Created by Mitch on 3/16/25.
//  Copyright © 2025 Super Epic Studios, LLC. All rights reserved.
//

import Foundation

public extension AppleDevice /* Features */ {
    
    /// Gets all devices containing a set of traits.
    /// - parameter traits: A set of traits to query.
    /// - returns: An array of matching devices.
    static func withTraits(_ traits: Trait...) -> [AppleDevice] {
        
        return self.all.filter { device in
                        
            for trait in traits {
            
                if !device.traits.contains(trait) {
                    return false
                }
            
            }
            
            return true
            
        }
        
    }
    
    /// Determines if the device contains a set of traits.
    /// - parameter traits: A set of traits to query.
    /// - returns: A flag indicating if the device contains the queried traits.
    func hasTraits(_ traits: Trait...) -> Bool {
     
        for trait in traits {
            
            if !self.traits.contains(trait) {
                return false
            }
            
        }
        
        return true
                
    }

}
