import { DatabaseRepository } from "../../domain/repositories/DatabaseRepository";
import { LogReq, LogRes, Log } from "../../domain/entities";
import { SendMessageService } from "../../../broker/application/SendMessage";
import { QueueName } from "../../../broker/domain/entities";

export class CreateLogService {
    constructor(private readonly databaseRepository: DatabaseRepository, private readonly sendMessageService: SendMessageService) {}
     async execute(log: LogReq): Promise<Log> {
        try {

            const { temperature, humidity } = await this.databaseRepository.getParams(log.id_habitat);

            //Validar los parametros sensados con los registradps
            const TemperatureCalculation = this.validateParams(temperature, log.temperature);
            const HumidityCalculation = this.validateParams(humidity, log.humidity);
            
            //Parseo
            const noteTemperature = `${Math.round(TemperatureCalculation)}%`;
            const noteHumidity = `${Math.round(HumidityCalculation)}%`;

            //Construir porcentaje final
            const note = `${Math.round((TemperatureCalculation + HumidityCalculation )/ 2)}%`;

            //Construir el nuevo log para guardar en la base de datos
            const logCreate : Log = {
                id_habitat: log.id_habitat,
                temperature: log.temperature,
                humidity: log.humidity,
                noteTemperature: noteTemperature,
                noteHumidity: noteHumidity,
                movement: log.movement,
                note: note,
                record_at: new Date(log.record_at)
            }

            

            //Guardar el nuevo log
            const id_habitat = await this.databaseRepository.create(logCreate);

            //Construir el log para la notificacion 

            const logNotification : LogRes = {
                id: id_habitat,
                id_habitat: log.id_habitat,
                noteTemperature: noteTemperature,
                noteHumidity: noteHumidity,
                movement: log.movement,
                note: note, 
                record_at: new Date(log.record_at)
            } 

            //Enviar el log como notification
            // await this.sendMessageService.execute(QueueName.NOTIFICATION, logNotification);
            
            return logCreate;

        } catch (error : any) {
            throw new Error(error);
        }
    }

    private validateParams(stored: number, record: number) : number {
            return (record * 100) / stored;
    }

}