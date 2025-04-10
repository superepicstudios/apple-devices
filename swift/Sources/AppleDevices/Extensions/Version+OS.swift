//
//  Version+OS.swift
//  AppleDevices
//
//  Created by Mitch Treece on 4/9/25.
//

import Foundation
import SemVer

extension SemVer.Version /* OS */ {
    
    init(os: OperatingSystemVersion) {
        
        self.init(
            major: os.majorVersion,
            minor: os.minorVersion,
            patch: os.patchVersion
        )
        
    }
    
}
