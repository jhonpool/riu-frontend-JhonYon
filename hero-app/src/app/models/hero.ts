import { v4 as generateId } from 'uuid';

export class Heroe {
    id : string;
    name : string;
    description : string;
    photo : string;
    isDeleted: boolean;
    createdDate : string;
    updateDate? : string;

    constructor(name: string= "",
        description = "",photo: string = "https://as1.ftcdn.net/jpg/08/34/84/74/1000_F_834847476_t0m3TQmPCNCdEyQykfP3huUZXmOaeJwz.jpg" )
    {
        this.id = generateId();
        this.name= name;
        this.photo = photo ;
        this.description = description;
        this.isDeleted = false;
        this.createdDate = new Date().toLocaleString();
    }
}