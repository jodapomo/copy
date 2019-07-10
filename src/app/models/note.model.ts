import { Deserializable } from './deserializable.model';

export class Note implements Deserializable {

// tslint:disable-next-line: variable-name
    _id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
