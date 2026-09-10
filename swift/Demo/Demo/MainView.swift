//
//  MainView.swift
//  Demo
//
//  Created by Mitch on 3/16/25.
//  Copyright © 2025 Super Epic Studios, LLC. All rights reserved.
//

import AppleDevices
import SwiftUI

struct MainView: View {
    
    @State private var current = AppleDevice()
    
    var body: some View {
        Form {
            Section("Current") {
                deviceView(
                    self.current,
                    current: true
                )
                simulatedView(
                    self.current
                )
            }
            
            ForEach(AppleDevice.Family.allCases) { family in
                Section(family.displayName) {
                    ForEach(AppleDevice.withFamilies(family)) { device in
                        deviceView(device)
                    }
                }
            }
            
            footerView()
        }
        .navigationTitle("Apple Devices")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    @ViewBuilder
    private func deviceView(
        _ device: AppleDevice,
        current: Bool = false
    ) -> some View {
        NavigationLink {
            DeviceView(device)
        } label: {
            HStack {
                if current {
                    Text(device.uniqueName).bold()
                } else {
                    Text(device.uniqueName)
                }
                if device.isWorkInProgress {
                    BadgeView("WIP")
                }
                Spacer()
                Text(verbatim: "\(device.year)").foregroundStyle(.secondary)
            }
        }
    }
    
    @ViewBuilder
    private func simulatedView(_ device: AppleDevice) -> some View {
        HStack {
            Text("Simulated").bold()
            Spacer()
            Text("\(device.isSimulated)".capitalized).foregroundStyle(.secondary)
        }
    }
    
    @ViewBuilder
    private func footerView() -> some View {
        HStack {
            Spacer()
            VStack {
                Text("Made with ❤️ in Las Vegas")
                Text("⭐️🍒🎰")
            }
            Spacer()
        }
        .listRowBackground(Color.clear)
    }
}

#Preview {
    NavigationView {
        MainView()
    }
}
