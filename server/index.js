import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import projectRoutes from './routes/project.js';
import teamRoutes from './routes/teams.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import morgan from 'morgan';
const app = express();
dotenv.config();

/** Middlewares */
app.use(express.json());
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

const port = 8700;

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(`mongodb+srv://pradeepsharma:pradeep@123@cluster0.vhdxt.mongodb.net/project_management?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.log(err);
    });
};


app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/project", projectRoutes)
app.use("/api/team", teamRoutes)
app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";        
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(port,()=>{
    console.log("Connected")
    connect();
})
