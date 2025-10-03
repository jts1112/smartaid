import { SchedulesModel } from "./schedulesModel";

export class UserModel {

    private userId:string; // should not be able modified after object creation. users Id.
    private email:string;
    private name:string;
    private primarySchedule:SchedulesModel; // New field for primary shedule

    constructor(object:Object); // singel object parameter
    constructor(Id:string, email:string, name:string, primarySchedule:SchedulesModel);
    constructor(idOrObject:string | Object, email?:string, name?:string, primarySchedule?:SchedulesModel,userId?:string) {
        if(typeof idOrObject === 'object') {
            this.userId = idOrObject['userId'];
            this.email = idOrObject['email'];
            this.name = idOrObject['name'];
            this.primarySchedule = new SchedulesModel(idOrObject['primarySchedule']);
        }
        else {
            this.email = email;
            this.name = name;
            this.primarySchedule = primarySchedule;
            this.userId = userId;
        }
    }

    
    public getUserId():string{
        return this.userId;
    }

    public getEmail():string{
        return this.email;
    }

    public getName():string{
        return this.name;
    }

    public getPrimarySchedule():SchedulesModel{
        return this.primarySchedule;
    }

    public setPrimarySchedule(primarySchedule:SchedulesModel) {
        this.primarySchedule = primarySchedule;
    }

    public toJSON():Object {
        return {
            userId:this.userId,
            email:this.email,
            name:this.name,
            primarySchedule:this.primarySchedule.toJSON(),
        }
    }
}