export class Heroe {
    id : number;
    name : string;
    photo : string;
    isDeleted: boolean;
    createdDate : string;
    updateDate? : string;

    constructor(name: string= "", id: number = 0 
        , photo: string = "https://as1.ftcdn.net/jpg/08/34/84/74/1000_F_834847476_t0m3TQmPCNCdEyQykfP3huUZXmOaeJwz.jpg")
    {
        this.id = id;
        this.name= name;
        this.photo = photo ;
        this.isDeleted = false;
        this.createdDate = new Date().getUTCDate().toLocaleString();
    }
}