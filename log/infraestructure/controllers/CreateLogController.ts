import { CreateLogService } from "../../application/services/CreateLogService";
import { Request, Response } from "express";
import { ValidateDateService } from "../../application/services/ValidateDateService";

export class CreateLogController {
    constructor(private readonly createLogService: CreateLogService, private readonly validateDate: ValidateDateService) {}
    async execute(req: Request, res: Response) {
        try {
            const log = req.body;
            await this.validateDate.execute(log);
            await this.createLogService.execute(log);
            return res.status(201).json('Created');
        } catch (error : any) {
            console.log(error.message);
            return res.status(500).json(error);
        }
    }
}