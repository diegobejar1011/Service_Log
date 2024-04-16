export interface LogReq {
    id_habitat : number;
    temperature : number;
    humidity : number;
    movement : string;
    record_at: string;
    first_log: boolean;
}