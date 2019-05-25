import { Deserializable } from './deserializable.model';
import { TempUser } from './temp-user.model';

export class Room implements Deserializable {
    
    _id: string;
    id: number;
    name: string;
    temp_users: TempUser[];
    items: string[];
    createdAt: Date;
    updatedAt: Date;
    locked: boolean;


    deserialize(input: any): this {
        
        Object.assign(this, input);
    
        this.temp_users = input.temp_users.map( tempUser => new TempUser().deserialize(tempUser));
    
        return this;
    }

}
