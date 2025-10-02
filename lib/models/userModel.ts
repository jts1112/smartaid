import { SchedulesModel } from "./schedulesModel";

class userModel {

    private id:String; // Should not be modified after initialization
    private email:String;
    private name:String;
    private primarySchedule:SchedulesModel; // New field for primary shedule
    
    private readonly collectionName:String = 'users'; // easy reference to collection name to be used.


    constructor(object:Object); // singel object parameter
    constructor(Id:String, email:String, name:String, primarySchedule:SchedulesModel);
    constructor(idOrObject:String | Object, email?:String, name?:String, primarySchedule?:SchedulesModel) {
        if(typeof idOrObject === 'object') {
            this.id = idOrObject['id'];
            this.email = idOrObject['email'];
            this.name = idOrObject['name'];
            this.primarySchedule = new SchedulesModel(idOrObject['primarySchedule']);
        }
        else {
            this.email = email;
            this.name = name;
            this.id = idOrObject;
            this.primarySchedule = primarySchedule;
        }
    }

    public getId():String{
        return this.id;
    }

    public getEmail():String{
        return this.email;
    }

    public getName():String{
        return this.name;
    }

    public getPrimarySchedule():SchedulesModel{
        return this.primarySchedule;
    }

    public setPrimarySchedule(primarySchedule:SchedulesModel) {
        this.primarySchedule = primarySchedule;
    }

    public getCollectionName():String{
        return this.collectionName;
    }

    public toJSON():Object {
        return {
            id:this.id,
            email:this.email,
            name:this.name,
            primarySchedule:this.primarySchedule.toJSON(),
        }
    }
}