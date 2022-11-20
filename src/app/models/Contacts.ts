export class Contacts {
    id: number;
    Name: string ;
    Email: string ;
    Birthday: number;
    Phones: string ;
    status: UserStatus;
   

    constructor (
        id:number = new Date().getTime(),
        Name: string = '',
        Email: string  = '',
        Birthday:number = new Date().getTime(),
        Phones: string  = '',
    
        status: UserStatus = 1
    ) {
        this.id = id;
        this.Name = Name;
        this.Email = Email;
        this.Birthday = Birthday;
        this.Phones = Phones;
        this.status = status;
        
    }
    toFirebase() {
        return {
            id: this.id,
            Name: this.Name,
            Email: this.Email,
            Birthday: this.Birthday,
            Phones: this.Phones,
            status : this.status
    }
}



 get timeStempToDate() {
    var date = new Date(this.Birthday);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    
    return `${day}/${month}/${year}`;
}

static fromFirebaseToClass(data:any) {
    return new Contacts(
        data.id,
        data.Name || '',
        data.Email || '',
        data.Birthday || '',
        data.Phones || '',
        data.status || 0
)}
}

export type UserStatus = 0 | 1 | 2;

