import { Deserializable } from './deserializable.model';

export class TempUser implements Deserializable {

    _id: string;
    username: string;
    online: boolean;
    last_login: Date;
    createdAt: Date;
    updatedAt: Date;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
