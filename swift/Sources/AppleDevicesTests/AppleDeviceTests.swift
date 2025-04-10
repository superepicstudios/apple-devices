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
        
        let sut = try #require(AppleDevice("iPhone1,1"))
        #expect(sut.name == "iPhone")
        #expect(sut.year == 2007)

    }
    
    @Test
    func testInvalidIdentifier() throws {
        #expect(AppleDevice("iCar420,69") == nil)
    }
    
    @Test
    func testCurrentDeviceSoftware() {
        #expect(AppleDevice().software.current != nil)
    }
    
    @Test
    func testTransitionDeviceSoftware() throws {
        
        let sut = try #require(AppleDevice("iPad5,3"))
        #expect(sut.name == "iPad Air 2")
        #expect(sut.software.supported.count == 2)
        #expect(sut.software.supported.first!.name == "iOS")
        #expect(sut.software.supported.last!.name == "iPadOS")
        
    }
    
}
