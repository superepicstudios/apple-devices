//
//  AppleDevice.swift
//  AppleDevicesTests
//
//  Created by Mitch Treece on 3/9/25.
//  Copyright © 2025 Super Epic Studios, LLC. All rights reserved.
//

@testable import AppleDevices
import Testing

@Suite
struct AppleDeviceTests {
    
    @Test
    func testValidIdentifier() throws {
        
        let sut = try #require(AppleDevice(
            "iPhone1,1"
        ))
        
        #expect(sut.name == "iPhone")
        #expect(sut.year == 2007)

    }
    
    @Test
    func testInvalidIdentifier() throws {
        #expect(AppleDevice("iCar420,69") == nil)
    }
    
}
