
export class SchedulesModel {
    private userId:string; // Should not be modified after creation
    private date:Date;
    private medicine:Array<Object>

    constructor(object:Object); // Single object parameter
    constructor(userId:string, date:Date, medicine:Array<Object>);
    constructor(userIdOrObject:string | Object, date?:Date, medicine?:Array<Object>) {
        
        if(typeof userIdOrObject === 'object') {
            this.userId = userIdOrObject['userId'];
            this.date = userIdOrObject['date'];
            this.medicine = userIdOrObject['medicine'];
        } else {
            this.userId = userIdOrObject;
            this.date = date;
            this.medicine = medicine;
        }
    }

    public getUserId():string{
        return this.userId;
    }

    public getDate(): Date {
        return this.date;
    }
    
    public setDate(date:Date){
        this.date = date;
    }

    public setMedicine(medicine:Array<Object>) {
        this.medicine = medicine
    }

    public getMedicine(): Array<Object> {
        return this.medicine;
    }


    public toJSON():Object {
        return {userId:this.userId,
            date:this.date,
            medicine:this.medicine,
        }
    }

}



export class Medicine {
    private dayOfWeek:Array<Number>;
    private name:string;
    private timeOfUse:Number;
    private taken:Boolean;
    private userId:string;

    // Overload Signatures
    constructor(object:Object); // Single object parameter
    constructor(name:string,dayOfWeek:Array<Number>,timeOfUse:Number,taken:Boolean,userId:string); // Individual parameters.
    constructor(objectOrname: string| Object,dayOfWeek?:Array<Number>,timeOfUse?:Number,taken?:Boolean,userId?:string) {
        
        if (typeof objectOrname === 'object') {

            this.dayOfWeek = objectOrname['dayOfWeek'];
            this.name = objectOrname['medication'];
            this.timeOfUse = objectOrname['timeOfUse'];
            this.taken = objectOrname['taken'];
            this.userId = objectOrname['userId'];
        } else {
            this.dayOfWeek = dayOfWeek;
            this.name = objectOrname;
            this.timeOfUse = timeOfUse;
            this.taken = taken;
            this.userId = userId;
        }
         
    }

    public getDayOfWeek():Array<Number>{
        return this.dayOfWeek;
    }

    public getName():string{
        return this.name;
    }

    public getTimeOfUse():Number{
        return this.timeOfUse;
    }

    public getTaken():Boolean{
        return this.taken;
    }

    public getUserId():string {
        return this.userId;
    }

    public setDayOfWeek(dayOfWeek:Array<Number>) {
        this.dayOfWeek = dayOfWeek;
    }

    public setMedication(name:string){
        this.name = name;
    }

    public setTimeOfUse(timeOfUse:Number){
        this.timeOfUse = timeOfUse;
    }

    public setTaken(taken:Boolean){
        this.taken = taken;
    }

    public toJson():Object {
        return {
            dayOfWeek:this.dayOfWeek,
            medication:this.name,
            timeOfUse:this.timeOfUse,
            taken:this.taken,
            userId:this.userId
        }
    }
}