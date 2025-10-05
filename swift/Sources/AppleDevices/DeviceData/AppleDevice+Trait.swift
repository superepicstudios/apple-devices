//
//  AppleDevice+Trait.swift
//  AppleDevices
//
//  Created by Mitch on 3/16/25.
//

import Foundation

public extension AppleDevice /* Trait */ {
    
    /// Representation of the various device traits.
    enum Trait: String, Codable, CaseIterable, Sendable {

        // MARK: Audio

        /// An active noise cancelling (ANC) audio trait.
        case activeNoiseCancelling = "audio.anc"

        /// A spatial audio trait.
        case spatialAudio = "audio.spatial"

        // MARK: Button

        /// An action button trait.
        case actionButton = "button.action"

        /// A camera (control) button trait.
        case cameraButton = "button.camera"

        /// A home button trait.
        case homeButton = "button.home"

        // MARK: Display

        /// An always-on display trait.
        case alwaysOnDisplay = "display.always-on"
        
        /// A dynamic-island display trait.
        case dynamicIsland = "display.dynamic-island"

        /// A fluid (edge-to-edge) display trait.
        case fluidDisplay = "display.fluid"

        /// A notch (cutout) display trait.
        case notch = "display.notch"

        /// A pro-motion display trait.
        case proMotionDisplay = "display.pro-motion"

        // MARK: Identification

        /// A FaceID trait.
        case faceId = "id.face"

        /// An OpticID trait.
        case opticId = "id.optic"

        /// A TouchID trait.
        case touchId = "id.touch"

        // MARK: Other

        /// An intelligence (AI) trait.
        case intelligence

    }
    
}
