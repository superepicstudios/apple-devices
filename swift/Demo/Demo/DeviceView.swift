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
    
    private var identifiers: String {
        guard !self.device.identifiers.isEmpty else {
            return "None"
        }
        return self.device.identifiers.joined(separator: ", ")
    }
    
    private var aNumbers: String {
        guard !self.device.aNumbers.isEmpty else {
            return "None"
        }
        return self.device.aNumbers.joined(separator: ", ")
    }
    
    private var internalNames: String {
        guard !self.device.internalNames.isEmpty else {
            return "None"
        }
        return self.device.internalNames.joined(separator: ", ")
    }
    
    private var traits: String {
        guard !self.device.traits.isEmpty else {
            return "None"
        }
        return self.device.traits
            .map { $0.rawValue }
            .joined(separator: ", ")
    }
    
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
                if self.device.isPreRelease {
                    rowView(title: "Pre-Release", value: "true")
                }
            }
            Section {
                rowView(
                    title: "Identifiers",
                    value: self.identifiers,
                    multiline: true
                )
                rowView(
                    title: "A Numbers",
                    value: self.aNumbers,
                    multiline: true
                )
                rowView(
                    title: "Internal Names",
                    value: self.internalNames,
                    multiline: true
                )
            }
            if !self.device.traits.isEmpty {
                Section {
                    rowView(
                        title: "Traits",
                        value: self.traits,
                        multiline: true
                    )
                }
            }
        }
        .navigationTitle(self.device.name)
        .navigationBarTitleDisplayMode(.inline)
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
                Text(value).foregroundStyle(.secondary)
            }
            else {
                HStack {
                    Text(title).bold()
                    Spacer()
                    Text(value).foregroundStyle(.secondary)
                }
            }
        }
    }
}

#Preview {
    NavigationView {
        DeviceView(.init())
    }
}
