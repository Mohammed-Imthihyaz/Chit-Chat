import cors from "cors";
import express from "express";
import { connectDB } from "./db/connectDB.js";

import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


const PORT = process.env.PORT|| 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Using middleware to parse JSON
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes); 
app.use("/api/messages", messageRoutes); 

app.get('/', (req, res) => {
    res.status(200).send("Welcome to root URL of Server");
});

server.listen(PORT, (error) => {
    connectDB();
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});
