//
//  BadgeView.swift
//  Demo
//
//  Created by Mitch on 9/9/26.
//  Copyright © 2026 Super Epic Studios, LLC. All rights reserved.
//

import Foundation
import SwiftUI

struct BadgeView: View {
    
    private let text: String
    private let textColor: Color
    private let backgroundColor: Color
    
    init(
        _ text: String,
        textColor: Color = .primary,
        backgroundColor: Color = .orange.opacity(0.5)
    ) {
        self.text = text
        self.textColor = textColor
        self.backgroundColor = backgroundColor
    }
    
    var body: some View {
        Text(self.text)
            .font(.caption).bold()
            .foregroundStyle(self.textColor)
            .padding(.horizontal, 6)
            .padding(.vertical, 2)
            .background(Capsule().fill(self.backgroundColor))
    }
}

#Preview {
    BadgeView("Badge")
}
