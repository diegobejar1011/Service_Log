import { CreateLogService } from "../../application/services/CreateLogService";
import { Request, Response } from "express";

export class CreateLogController {
    constructor(private readonly logService: CreateLogService) {}
    async execute(req: Request, res: Response) {
        try {
            const log = req.body;
            await this.logService.execute(log);
            return res.status(201).send('Created');
        } catch (error : any) {
            return res.status(500).send(error);
        }
    }
}