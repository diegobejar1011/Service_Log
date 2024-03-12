import { DatabaseRepository } from "../../domain/repositories/DatabaseRepository";
import { LogRes } from "../../domain/entities";

export class GetLogService {
    constructor(private readonly databaseRepository: DatabaseRepository) {}
    async execute(): Promise<LogRes[]> {
        try {
            const logs = await this.databaseRepository.get();
            return logs;
        } catch (error : any) {
            throw new Error(error);
        }
    }
}