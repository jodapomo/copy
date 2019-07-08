import { Deserializable } from './deserializable.model';
import { TempUser } from './temp-user.model';

export class Room implements Deserializable {

// tslint:disable-next-line: variable-name
    _id: string;
    id: number;
    name: string;
    tempUsers: TempUser[];
    items: string[];
    createdAt: Date;
    updatedAt: Date;
    locked: boolean;


    deserialize(input: any): this {

        Object.assign(this, input);

        this.tempUsers = input.tempUsers.map( tempUser => new TempUser().deserialize(tempUser));

        return this;
    }

}
