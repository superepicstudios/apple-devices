//
//  AppleDevice+DeviceData.swift
//  AppleDevices
//
//  Created by Mitch on 3/16/25.
//

import Foundation

extension AppleDevice /* DeviceData */ {
 
    struct DeviceData: Codable, Sendable {
        
        let identifiers: [String]
        let name: String
        let genName: String?
        let year: Int
        let family: Family
        let chip: Chip
        let software: [Software]
        let traits: [Trait]
        let internalNames: [String]
        let aNumbers: [String]
        
        private enum CodingKeys: String, CodingKey {
            
            case identifiers = "ids"
            case name
            case genName = "gen_name"
            case year
            case family
            case chip
            case software
            case traits
            case internalNames = "internal_names"
            case aNumbers = "a_numbers"
                    
        }
        
        static func unknown(id: String) -> Self {
            
            return .init(
                identifiers: [id],
                name: "Unknown Device",
                genName: nil,
                year: Calendar.current.component(.year, from: Date()),
                family: .unknown,
                chip: .init(
                    id: "unk",
                    name: "Unknown Chip"
                ),
                software: [.init(
                    id: "unk",
                    name: "Unknown Software",
                    version: .init(
                        min: "1.0",
                        max: "1.0"
                    ),
                    deviceVersion: .init(
                        min: "1.0",
                        max: nil
                    )
                )],
                traits: [],
                internalNames: ["U1234"],
                aNumbers: ["AU1234"]
            )
            
        }
        
    }
    
}
