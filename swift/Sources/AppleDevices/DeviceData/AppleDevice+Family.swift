//
//  AppleDevice+Family.swift
//  AppleDevices
//
//  Created by Mitch on 3/16/25.
//

import Foundation

public extension AppleDevice /* Family */ {
        
    /// Representation of the various device families.
    enum Family: String, Identifiable, CaseIterable, Codable, Sendable {
        
        /// An AirPods family.
        case airpods  = "AirPods"

        /// An AirTag family.
        case airtag  = "AirTag"
        
        /// An Apple TV family.
        case appletv = "Apple_TV"
        
        /// An Apple Vision family.
        case vision  = "Apple_Vision"
        
        /// An Apple Watch family.
        case watch   = "Apple_Watch"
        
        /// A HomePod family.
        case homepod = "HomePod"
        
        /// An iPad family.
        case ipad    = "iPad"
        
        /// An iPhone family.
        case iphone  = "iPhone"
        
        /// An iPod family.
        case ipod    = "iPod"
        
        /// A mock device family.
        case mock    = "Mock"
        
        /// An unknown device family.
        case unknown = "Unknown"
        
        public static var allCases: [Family] {
            
            return [
                .airpods,
                .airtag,
                .appletv,
                .vision,
                .watch,
                .homepod,
                .ipad,
                .iphone,
                .ipod
            ]
            
        }
        
        public var id: String {
            self.rawValue
        }
        
        /// The family's display name.
        public var displayName: String {
            
            self.rawValue.replacingOccurrences(
                of: "_",
                with: " "
            )
            
        }
        
    }
    
}
