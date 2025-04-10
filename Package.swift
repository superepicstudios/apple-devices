// swift-tools-version: 6.0

import PackageDescription

let package = Package(
    name: "AppleDevices",
    platforms: [
        
        .iOS(.v15),
        .macOS(.v12),
        .tvOS(.v15),
        .visionOS(.v1),
        .watchOS(.v4)
        
    ],
    products: [

        .library(
            name: "AppleDevices",
            targets: ["AppleDevices"]
        )

    ],
    dependencies: [
        
        .package(
            url: "https://github.com/sersoft-gmbh/semver",
            from: "5.0.0"
        )
        
    ],
    targets: [

        .target(
            name: "AppleDevices",
            dependencies: [
                
                .product(
                    name: "SemVer",
                    package: "semver"
                )
                
            ],
            path: "swift/Sources/AppleDevices",
            resources: [
                .copy("Resources/data.json")
            ]
        ),

        .testTarget(
            name: "AppleDevicesTests",
            dependencies: ["AppleDevices"],
            path: "swift/Sources/AppleDevicesTests"
        )

    ],
    swiftLanguageModes: [.v6]
)
