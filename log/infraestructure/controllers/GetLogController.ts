import { GetLogService } from "../../application/services/GetLogService";
import { Request, Response } from "express";

export class GetLogController {
    constructor(private readonly getLogService: GetLogService){}
    async execute(req: Request, res: Response){
        try {
            const logs = await this.getLogService.execute();
            return res.status(200).json(logs);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}