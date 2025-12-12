//
//  DeviceView.swift
//  Demo
//
//  Created by Mitch Treece on 7/30/25.
//

import AppleDevices
import SwiftUI

struct DeviceView: View {
    
    private let device: AppleDevice
    
    init(_ device: AppleDevice) {
        self.device = device
    }
    
    var body: some View {
        
        Form {
            
            Section {
                
                rowView(title: "Family", value: self.device.family.displayName)
                                
                if let variant = self.device.variant {
                    rowView(title: "Variant", value: variant)
                }
                
                rowView(title: "Generation", value: "\(self.device.generation)")
                rowView(title: "Year", value: "\(self.device.year)")
                rowView(title: "Chip", value: self.device.chip.name)
                rowView(title: "Software", value: self.device.softwareRangeString(latestOnly: false))

            }
            
            Section {
                
                rowView(
                    title: "Identifiers",
                    value: self.device.identifiers.joined(separator: ", "),
                    multiline: true
                )
                
                rowView(
                    title: "A Numbers",
                    value: self.device.aNumbers.joined(separator: ", "),
                    multiline: true
                )
                
                rowView(
                    title: "Internal Names",
                    value: self.device.internalNames.joined(separator: ", "),
                    multiline: true
                )
                
            }
            
            if !self.device.traits.isEmpty {
                
                Section {
                    
                    rowView(
                        title: "Traits",
                        value: self.device.traits.map { $0.rawValue }.joined(separator: ", "),
                        multiline: true
                    )
                    
                }
                
            }
            
        }
        .navigationTitle(self.device.name)
        
    }
    
    // MARK: Private
    
    @ViewBuilder
    private func rowView(
        title: String,
        value: String,
        multiline: Bool = false
    ) -> some View {
        
        VStack(alignment: .leading){
            
            if multiline {
                Text(title).bold()
                Text(value)
                    .foregroundStyle(.secondary)
            }
            else {
                
                HStack {
                    
                    Text(title)
                        .bold()
                    
                    Spacer()
                    
                    Text(value)
                        .foregroundStyle(.secondary)
                    
                }
                
            }
            
        }
        
    }
    
}
