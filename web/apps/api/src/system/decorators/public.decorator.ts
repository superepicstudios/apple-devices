import { SetMetadata } from "@nestjs/common"

export const PublicKey = "isPublic"

export const Public = () => SetMetadata(
    PublicKey, 
    true
)
