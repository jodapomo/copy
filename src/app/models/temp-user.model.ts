import { Deserializable } from './deserializable.model';

export class TempUser implements Deserializable {

    _id: string;
    username: string;
    online: boolean;
    admin: boolean;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
