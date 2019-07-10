import { Deserializable } from './deserializable.model';
import { TempUser } from './temp-user.model';
import { Item } from './item.model';
import { ITEM_TYPES } from './item-types';


export class Room implements Deserializable {

// tslint:disable-next-line: variable-name
    _id: string;
    id: number;
    name: string;
    tempUsers: TempUser[];
    items: Item[];
    createdAt: Date;
    updatedAt: Date;
    locked: boolean;


    deserialize(input: any): this {

        Object.assign(this, input);

        this.tempUsers = input.tempUsers.map( tempUser => new TempUser().deserialize(tempUser));

        this.items = input.items.map( item => new ITEM_TYPES[item.type]().deserialize(item) );

        return this;

    }

}
