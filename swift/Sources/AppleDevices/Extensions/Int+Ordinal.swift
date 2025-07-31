//
//  Int+Ordinal.swift
//  AppleDevices
//
//  Created by Mitch Treece on 7/31/25.
//

import Foundation

extension Int /* Ordinal */ {
    
    var ordinalString: String {
        
        var ordinal = "th"
        
        if self % 10 == 1 && self % 100 != 11 {
            ordinal = "st"
        }
        else if self % 10 == 2 && self % 100 != 12 {
            ordinal = "nd"
        }
        else if self % 10 == 3 && self % 100 != 13 {
            ordinal = "rd"
        }
        
        return "\(self)\(ordinal)"
        
    }
    
}
