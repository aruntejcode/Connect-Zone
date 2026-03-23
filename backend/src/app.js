// import express from "express";
// import { createServer } from "node:http";

// import { Server } from "socket.io";

// import mongoose from "mongoose";
// import { connectToSocket } from "./controllers/socketManager.js";

// import cors from "cors";
// import userRoutes from "./routes/users.routes.js";

// const app = express();
// const server = createServer(app);
// const io = connectToSocket(server);


// app.set("port", (process.env.PORT || 8000))
// app.use(cors());
// app.use(express.json({ limit: "40kb" }));
// app.use(express.urlencoded({ limit: "40kb", extended: true }));

// app.use("/api/v1/users", userRoutes); // const connectionDb = await mongoose.connect("mongodb+srv://imdigitalashish:imdigitalashish@cluster0.cujabk4.mongodb.net/")

// const start = async () => {
//     app.set("mongo_user")
//     const connectionDb = await mongoose.connect("mongodb+srv://aruntej2003_db_user:aruntej2003@cluster0.4g7jkg7.mongodb.net/apnavideocall")

//     console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
//     server.listen(app.get("port"), () => {
//         console.log("LISTENIN ON PORT 8000")
//     });



// }



// start();

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// --- SETTINGS ---
app.set("port", (process.env.PORT || 8000));

// --- MIDDLEWARES ---
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json({ limit: "40kb" })); // Parse incoming JSON
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// --- ROUTES ---
app.use("/api/v1/users", userRoutes);

// --- STARTUP LOGIC ---
const start = async () => {
    try {
        // Connect to YOUR database
        const connectionDb = await mongoose.connect("mongodb+srv://aruntej2003_db_user:aruntej2003@cluster0.4g7jkg7.mongodb.net/apnavideocall");

        console.log(`✅ MONGO Connected Host: ${connectionDb.connection.host}`);

        server.listen(app.get("port"), () => {
            console.log(`🚀 SERVER RUNNING ON PORT ${app.get("port")}`);
        });
    } catch (error) {
        console.error("❌ MONGODB CONNECTION ERROR:", error.message);
        process.exit(1); // Stop the server if DB fails
    }
}

start();

