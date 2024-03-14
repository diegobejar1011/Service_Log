import { QueueReq } from "../entities";

export interface BrokerRepositoru {
    connection() : Promise<any>;
    assertQueue() : Promise<any>;
    publish(req: QueueReq) : Promise<void>;  
}