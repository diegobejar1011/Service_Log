import { DatabaseRepository } from "../../domain/repositories/DatabaseRepository";
import { LogReq, LogRes, Log } from "../../domain/entities";
import { SendMessageService } from "../../../broker/application/SendMessage";
import { QueueName } from "../../../broker/domain/entities";

export class CreateLogService {
    constructor(private readonly databaseRepository: DatabaseRepository, private readonly sendMessageService: SendMessageService) {}
     async execute(log: LogReq): Promise<Log> {
        try {
            //Conseguir los paramteros registrados por el usuario
            const { temperature, humidity , movement } = await this.databaseRepository.getParams(log.id_habitat);

            //Validar los parametros sensados con los registradps
            const noteTemperature = this.validateParams(temperature, log.temperature);
            const noteHumidity = this.validateParams(humidity, log.humidity);

            /*
                Traer la hora de la ultimo log que registro movimiento
                Traer el tiempo que especifico el usuario 
                Sumar ambos valores para conseguir la hora en que se revisará el movimiento 

                Guardar ese valor para al recibir una notificación con esa hora, verificar si hubo movimiento 
                Si no hubo movimiento, enviar notificación
            */ 

            //Construir porcentaje final
            const note = `${Math.round((noteTemperature + noteHumidity )/ 2)}%`;


            //Construir el nuevo log para guardar en la base de datos
            const logCreate : Log = {
                id_habitat: log.id_habitat,
                temperature: log.temperature,
                humidity: log.humidity,
                noteTemperature: `${Math.round(noteTemperature)}%`,
                noteHumidity: `${Math.round(noteHumidity)}%`,
                movement: log.movement,
                note: note
            }

            //Construir el log para la notificacion 
            const logNotification : LogRes = {
                id_habitat: log.id_habitat,
                noteTemperature: noteTemperature.toString(),
                noteHumidity: noteHumidity.toString(),
                movement: log.movement,
                note: note
            }

            //Guardar el nuevo log
            await this.databaseRepository.create(logCreate);
            //await this.sendMessageService.execute(QueueName.NOTIFICATION, logNotification);
            
            return logCreate;
        } catch (error : any) {
            throw new Error(error);
        }
    }

    private validateParams(stored: number, record: number) : number {
            return (record * 100) / stored;
    }
}