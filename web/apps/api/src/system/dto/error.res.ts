import { HttpException, HttpStatus } from "@nestjs/common"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Request } from "express"
import { AppError } from "../types/app-error.type.ts"
import { DtoBase } from "./dto.base.ts"

export class ErrorResponse extends DtoBase {

    @ApiProperty()
    type: string

    @ApiProperty()
    status: HttpStatus | number

    @ApiProperty()
    message: string

    @ApiPropertyOptional()
    code?: string

    constructor(
        
        type: string,
        status: HttpStatus | number,
        message: string,
        code?: string
    
    ) {

        super()

        this.type = type
        this.status = status
        this.message = message
        this.code = code

    }

    static from(

        error: Error, 
        req?: Request

    ): ErrorResponse {

        if (error instanceof AppError) {
            return error.asDto()
        }
        else if (error instanceof HttpException) {

            if (error.getStatus() == 404) {

                // Custom 404

                const message = (req != undefined) ? 
                    `${req.method} ${req.path} not found` :
                    "Not found"

                return new ErrorResponse(
                    "HTTP",
                    HttpStatus.NOT_FOUND,
                    message,
                    undefined
                )

            }
            else {

                return new ErrorResponse(
                    "HTTP",
                    error.getStatus(),
                    error.message,
                    undefined
                )

            }

        }

        return new AppError(
            error.message
        )
        .asDto()

    }

}
