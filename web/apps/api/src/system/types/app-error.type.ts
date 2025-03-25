import { HttpException, HttpStatus } from "@nestjs/common"
import { ErrorResponse } from "../dto/error.res.ts"

export class AppError extends HttpException {

    constructor(message?: string) {

        super(
            message ?? "Something went wrong :(",
            HttpStatus.INTERNAL_SERVER_ERROR
        )

    }

    asDto(): ErrorResponse {

        return new ErrorResponse(
            "APP", 
            this.getStatus(),
            this.message,
            undefined
        )

    }

}
