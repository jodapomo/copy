import { TempUser } from '../models/temp-user.model';

export interface Session {
    token: string;
    roomId: number;
}
