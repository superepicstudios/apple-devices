//
//  AppleDevice.swift
//  AppleDevices
//
//  Created by Mitch Treece on 3/4/25.
//  Copyright © 2025 Super Epic Studios, LLC. All rights reserved.
//

import Foundation

/// An Apple device representation containing metadata, trait, & software information.
public struct AppleDevice: Identifiable, Equatable, Sendable {
    
    private static let simulatorPrefix = "__sim_"
    
    public static func == (lhs: AppleDevice, rhs: AppleDevice) -> Bool {
        lhs.identifiers == rhs.identifiers
    }
    
    public var id: String {
        self.identifiers.joined(separator: "-")
    }
        
    /// The device's identifiers.
    public var identifiers: [String] {
        self.data.identifiers
    }
    
    /// The device's marketing name.
    public var name: String {
        self.data.name
    }
    
    /// The device's family.
    public var family: Family {
        self.data.family
    }
    
    /// The device's variant.
    public var variant: String? {
        self.data.variant
    }
    
    /// The device's generation number.
    public var generation: Int {
        self.data.gen
    }
    
    /// The device's release year.
    public var year: Int {
        self.data.year
    }
    
    /// The device's chip.
    public var chip: Chip {
        self.data.chip
    }
    
    /// The device's software information.
    public var software: DeviceSoftware {
        
        .init(
            supported: self.data.software,
            current: self.currentSoftware
        )
        
    }
    
    /// The device's traits.
    public var traits: [Trait] {
        self.data.traits
    }
    
    /// The device's internal names.
    public var internalNames: [String] {
        self.data.internalNames
    }
    
    /// The device's "A" numbers.
    public var aNumbers: [String] {
        self.data.aNumbers
    }
    
    /// Flag indicating if this is a simulated device.
    public let isSimulated: Bool
    
    private let data: DeviceData
    private let currentSoftware: DeviceSoftware.Current?
    
    /// Initializes an Apple device using the current device.
    public init() {
        
        var identifier = Self.currentIdentifier()
        var simulated: Bool = false
        
        if identifier.hasPrefix(Self.simulatorPrefix) {
            
            simulated = true
            
            identifier = identifier.replacingOccurrences(
                of: Self.simulatorPrefix,
                with: ""
            )
            
        }
        
        let data = (try? Self.deviceData(for: identifier)) ?? .unknown(id: identifier)
                
        self.init(
            data: data,
            currentSoftware: .get(
                deviceId: identifier,
                supportedSoftware: data.software
            ),
            simulated: simulated
        )
        
    }
    
    /// Initializes an Apple device using a device identifier.
    /// - parameter identifier: The device identifier.
    public init?(_ identifier: String) {
        
        guard let data = try? Self.deviceData(for: identifier) else {
            return nil
        }
        
        self.init(data: data)
        
    }
    
    // MARK: Private
    
    init(data: DeviceData,
         currentSoftware: DeviceSoftware.Current? = nil,
         simulated: Bool = false) {
        
        self.data = data
        self.currentSoftware = currentSoftware
        self.isSimulated = simulated
        
    }
    
    private static func currentIdentifier() -> String {
        
        var identifier: String = ""
        
        #if targetEnvironment(simulator)
        
        if let simulatedIdentifier = ProcessInfo().environment["SIMULATOR_MODEL_IDENTIFIER"] {
            identifier = "\(Self.simulatorPrefix)\(simulatedIdentifier)"
        }
        
        #else
        
        var systemInfo = utsname()
        uname(&systemInfo)
        
        let mirror = Mirror(
            reflecting: systemInfo.machine
        )
        
        identifier = mirror.children.reduce("") { (deviceId, element) in
            
            guard let value = element.value as? Int8,value != 0 else {
                return deviceId
            }
            
            return deviceId + String(UnicodeScalar(UInt8(value)))
            
        }
        
        #endif
        
        return identifier
        
    }
    
    internal static func deviceData() throws -> [DeviceData] {
        
        guard let url = Bundle.module.url(forResource: "data", withExtension: "json"),
              let data = try? Data(contentsOf: url) else {
            
            throw AppleDeviceError.missingData
            
        }
        
        guard let jsons = (try? JSONSerialization.jsonObject(with: data)) as? [[String: Any]] else {
            throw AppleDeviceError.invalidDataFormat
        }
        
        return jsons.compactMap {
            try? JSONDecoder().decode(
                DeviceData.self,
                from: JSONSerialization.data(withJSONObject: $0)
            )
        }
        
    }
    
    private static func deviceData(for identifier: String) throws -> DeviceData {
        
        guard let data = try deviceData().first(where: { $0.identifiers.contains(identifier) }) else {
            throw AppleDeviceError.missingIdentifier
        }
        
        return data
        
    }
    
}
