import { LogReq } from "../../domain/entities";
import { DatabaseRepository } from "../../domain/repositories/DatabaseRepository";
export class ValidateDateService {
  constructor(private readonly databaseRepository: DatabaseRepository) {}
  async execute(log: LogReq) {
    try {
      if (!log.first_log) {
        const lastLog = await this.databaseRepository.getLastLog();
        const lastDate = new Date(lastLog.record_at);

        const { interval_review } = await this.databaseRepository.getParams(
          log.id_habitat
        );
        const hoursToAdd = interval_review;

        const updatedDate = new Date(
          lastDate.getTime() + hoursToAdd * 60 * 1000
        );
        const hoursVerified = updatedDate.getHours().toString();
        const minutesVerified = updatedDate.getMinutes().toString();

        const logHours = new Date(log.record_at).getHours().toString();
        const logMinutes = new Date(log.record_at).getMinutes().toString();

        const TimeVerified = `${hoursVerified}:${minutesVerified.toString().padStart(2, '0')}`; 
        const TimeLog = `${logHours}:${logMinutes.toString().padStart(2, '0')}`; 

        if(!(logMinutes == minutesVerified)){
            throw new Error('Log in time out');
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
