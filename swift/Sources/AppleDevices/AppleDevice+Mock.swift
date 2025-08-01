//
//  AppleDevice+Unknown.swift
//  AppleDevices
//
//  Created by Mitch on 3/9/25.
//  Copyright © 2025 Super Epic Studios, LLC. All rights reserved.
//

import Foundation

public extension AppleDevice {
    
    /// Creates a mock device.
    static func mock() -> AppleDevice {
        
        let data = DeviceData(
            identifiers: ["MockDevice1,1"],
            name: "Mock Device",
            family: .mock,
            variant: nil,
            gen: 1,
            year: Calendar.current.component(.year, from: Date()),
            chip: .init(
                id: "m0",
                name: "Mock Chip"
            ),
            software: [.init(
                id: "mockos",
                name: "mockOS",
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
            internalNames: ["M1234"],
            aNumbers: ["AM1234"]
        )
        
        return .init(
            data: data,
            simulated: false
        )
        
    }
    
}
