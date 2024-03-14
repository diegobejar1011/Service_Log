import { QueueReq } from "../entities";

export interface BrokerRepository {
    connection() : Promise<any>;
    createChannel() : Promise<any>;
    publish(req: QueueReq) : Promise<void>;  
}