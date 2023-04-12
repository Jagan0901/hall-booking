import { client } from './index.js';



export async function createRoom(newRoom){
    return await client
      .db("Hall-booking")
      .collection("rooms")
      .insertOne(newRoom);
}

export async function getRoomByType(roomType){
    return await client
      .db("Hall-booking")
      .collection("rooms")
      .findOne({roomName:roomType});
}

export async function updateRoomById(id,isRoomAvailable){
    return await client
      .db("Hall-booking")
      .collection("rooms")
      .updateOne({_id:id},{$set : isRoomAvailable});
}

export async function bookRoom(bookedRoom){
    return await client
      .db("Hall-booking")
      .collection("bookedRooms")
      .insertOne(bookedRoom);
}

export async function getBookedRooms(req){
    return await client
      .db("Hall-booking")
      .collection("bookedRooms")
      .find(req.query)
      .toArray();
}

export async function getCustomerBookedRooms(req){
    return await client
      .db("Hall-booking")
      .collection("bookedRooms")
      .find(req.query)
      .toArray();
}