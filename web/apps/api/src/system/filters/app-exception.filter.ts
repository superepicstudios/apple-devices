import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common"
import { Response, Request } from "express"
import { ErrorResponse } from "../dto/error.res.ts"

export class AppExceptionFilter implements ExceptionFilter {

    catch(exception: Error, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp()
        const req = ctx.getRequest<Request>()
        const res = ctx.getResponse<Response>()

        const status = (exception instanceof HttpException) ?
            exception.getStatus() :
            HttpStatus.INTERNAL_SERVER_ERROR

        const dto = ErrorResponse.from(
            exception, 
            req
        )

        res.status(status)
        res.json({ error: dto })

    }

}
