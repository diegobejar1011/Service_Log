import { QueueReq } from "../entities";

export interface BrokerRepository {
    connection() : Promise<any>;
    assertQueue() : Promise<any>;
    publish(req: QueueReq) : Promise<void>;  
}