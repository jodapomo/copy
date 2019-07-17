import { Deserializable } from './deserializable.model';
import { Note } from './note.model';


export class Item implements Deserializable {

    // tslint:disable-next-line: variable-name
    _id: string;
    user: {
        _id: string,
        username: string,
        admin: boolean,
    };
    notes: Note[];
    type: string;
    createdAt: Date;
    updatedAt: Date;


    deserialize(input: any): this {

        Object.assign(this, input);

        this.notes = input.notes.map( note => new Note().deserialize(note));

        return this;

    }


}
