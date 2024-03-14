import { QueueContent, QueueName, QueueReq } from "../domain/entities";
import { BrokerRepository } from "../domain/respositories/BrokerRepository";

export class SendMessageService {
    constructor(private readonly brokerRepository: BrokerRepository) {}

    async execute(queueName: QueueName, queueContent: QueueContent) : Promise<any> {
        try {
            const queueReq : QueueReq = { queueName, content: queueContent };
            await this.brokerRepository.publish(queueReq);
        } catch ( error : any ) {
            throw new Error( error );
        }
    }
}