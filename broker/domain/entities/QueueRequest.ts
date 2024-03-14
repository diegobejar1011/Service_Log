import { QueueName, QueueContent } from './index';

export interface QueueReq {
    queueName: QueueName;
    content: QueueContent;
}