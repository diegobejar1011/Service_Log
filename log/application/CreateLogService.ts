import { DatabaseRepository } from "../domain/repositories/DatabaseRepository";
import { LogReq, LogRes } from "../domain/entities";

export class CreateLogService {
    constructor(private databaseRepository: DatabaseRepository) {}
    async execute(log: LogReq): Promise<LogRes> {
        try {
            //Conseguir los paramteros registrados por el usuario
            const { temperature, humidity , lightness } = await this.databaseRepository.getParams(log.id_habitat);

            //Validar los parametros sensados con los registradps
            const noteTemperature = this.validateParams(temperature, log.temperature);
            const noteHumidity = this.validateParams(humidity, log.humidity);
            const noteLightness = this.validateParams(lightness, log.lightness);

            //Construir porcentaje final
            const note = `${(noteTemperature + noteHumidity + noteLightness)/ 3}%`;

            //Construir el nuevo log
            const logCreate : LogRes = {
                ...log,
                note
            }

            //Guardar el nuevo log
            await this.databaseRepository.create(logCreate);
            
            return logCreate;
        } catch (error : any) {
            throw new Error(error);
        }
    }

    private validateParams(stored: number, record: number) : number {
        return (record * 100) / stored;
    }
}