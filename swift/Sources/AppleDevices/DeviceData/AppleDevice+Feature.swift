//
//  AppleDevice+Feature.swift
//  AppleDevices
//
//  Created by Mitch on 3/16/25.
//

import Foundation

public extension AppleDevice /* Feature */ {
    
    /// Representation of the various device features.
    enum Feature: String, Codable, CaseIterable, Sendable {
        
        /// An action button feature.
        case actionButton     = "button.action"
        
        /// A camera (control) button feature.
        case cameraButton     = "button.camera"
        
        /// A home button feature.
        case homeButton       = "button.home"
        
        /// An always-on display feature.
        case alwaysOnDisplay  = "display.always-on"
        
        /// A dynamic-island display feature.
        case dynamicIsland    = "display.dynamic-island"
        
        /// A fluid (edge-to-edge) display feature.
        case fluidDisplay     = "display.fluid"
        
        /// A notch (cutout) display feature.
        case notch            = "display.notch"
        
        /// A pro-motion display feature.
        case proMotionDisplay = "display.pro-motion"
        
        /// A FaceID feature.
        case faceId           = "id.face"
        
        /// An OpticID feature.
        case opticId          = "id.optic"
        
        /// A TouchID feature.
        case touchId          = "id.touch"
        
        /// An intelligence (AI) feature.
        case intelligence
        
    }
    
}
