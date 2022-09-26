export interface Rooms{
    availableRooms:number;
    bookedRooms:number;
    totalRooms:number
}

export interface RoomList{
    roomNumber:string;
    roomType:string;
    amenities:String;
    price:number;
    photos:string;
    checkinTime:Date;
    checkoutTime:Date;
    rating:number;
}