import { Request, Response, NextFunction } from "express"

export const RequestIdHeaderKey = "X-Request-Id"
const RequestIdAttributeKey = "id"

export function requestId(req: Request, res: Response, next: NextFunction) {

    const existingId = req.get(RequestIdHeaderKey)
    const id = (existingId === undefined) ? crypto.randomUUID() : existingId

    req.id
    req[RequestIdAttributeKey] = id
    res.set(RequestIdHeaderKey, id)

    next()

}
