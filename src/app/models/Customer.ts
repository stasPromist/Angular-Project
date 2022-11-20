

export class Customer {
    id: number;
    firstName: string ;
    lastName: string;
    email: string ;
    phoneNumber: string ;
    address: string ;
    notes: string ;
    createdDate: number;
    status: UserStatus;
   

    constructor (
        id:number = new Date().getTime(),
        firstName: string = '',
        lastName: string =  '',
        email: string  = '',
        phoneNumber: string  = '',
        address: string  = '',
        notes: string  = '',
        createdDate: number = new Date().getTime(),
        status: UserStatus = 1
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.notes = notes;
        this.createdDate = createdDate;
        this.status = status;
        
    }
    toFirebase() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            address: this.address,
            notes: this.notes,
            createdDate: this.createdDate,
            status : this.status
    }
}



 get timeStempToDate() {
    var date = new Date(this.createdDate);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    
    return `${day}/${month}/${year}`;
}

static fromFirebaseToClass(data:any) {
    return new Customer(
        data.id,
        data.firstName || '',
        data.lastName || '',
        data.email || '',
        data.phoneNumber || '',
        data.address || '',
        data.notes || '',
        data.createdDate || '',
        data.status || 0
)}
}

export type UserStatus = 0 | 1 | 2;

