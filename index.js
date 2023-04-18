import express from 'express';
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { roomRouter } from './Routes/rooms.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;


async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}

export const client = await createConnection()

app.use(express.json());

app.get("/", (req,res) => {
    res.send(`Enter  /rooms/bookedRooms or /rooms/customerBookedRooms to get the particular data`)
});

//If you are creating rooms data, Please try to create respective data in the given below field(key) format

// 1. rooms data : 
//      roomId    : any Number,
//      roomName  : your wish,
//      amenities : ["your wish", "your wish", "your wish"],
//      seats     : your wish,
//      price     : your wish,
//      status    : "Available"


app.use("/rooms",roomRouter)

app.listen(PORT,()=> console.log("Server started on PORT",PORT))



