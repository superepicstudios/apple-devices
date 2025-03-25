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
    
    var body: some View {
                
        Form {
            
            Section("Current") {
                
                deviceView(
                    AppleDevice(),
                    bold: true
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
        
    }
    
    private func deviceView(_ device: AppleDevice,
                            bold: Bool = false) -> some View {
        
        HStack {
            
            if bold {
                
                Text(device.descriptiveName)
                    .bold()

            }
            else {
                Text(device.descriptiveName)
            }
            
            Spacer()
            
            Text(verbatim: "\(device.year)")
                .italic()
                .foregroundStyle(.secondary)
            
        }
        
    }
    
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
    MainView()
}
