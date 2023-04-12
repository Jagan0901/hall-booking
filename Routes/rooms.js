import express from 'express';
import { createRoom, getRoomByType, updateRoomById, bookRoom, getBookedRooms, getCustomerBookedRooms } from '../helper.js';

const router = express.Router();

router.post("/create", async(req,res)=>{
    const newRoom= req.body;
    const create = await createRoom(newRoom);
    res.send(create);
})

router.post("/book", async(req,res)=>{
    const bookedRoom = req.body;
    const roomType = bookedRoom.roomName;
    
    const isRoomAvailable = await getRoomByType(roomType);

    if(isRoomAvailable.status === "Available"){

        isRoomAvailable.status = "Booked";
        const id = isRoomAvailable._id; 
        const roomId        = isRoomAvailable.roomId
        const updatedRoom   = await updateRoomById(id,isRoomAvailable);
        bookedRoom.roomId   = roomId;
        const bookingStatus = isRoomAvailable.status;
        bookedRoom.status   = bookingStatus;
        const bookingRoom   = await bookRoom(bookedRoom)
        return res.send({message:"Your room has been booked"});

    }else if(isRoomAvailable.status === "Booked"){
        return res.status(404).send({error:"This room is already booked. Please try some other"})
    }

})

router.get("/bookedRooms", async(req,res)=>{
    const bookedRooms = await getBookedRooms(req);
    res.send(bookedRooms);
})

router.get("/customerBookedRooms", async(req,res)=>{
    const bookedRooms = await getCustomerBookedRooms(req);
    res.send(bookedRooms);
})


export const roomRouter = router;