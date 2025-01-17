import * as bcrypt from 'bcrypt';
import { Router, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import * as usercontroller from "../controllers/usercontroller";
import { User } from '../models/user';
const winston = require('winston');
const { body, validationResult } = require("express-validator");
const router = Router();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

 async function hashPassword(password:string):Promise<string>{
    const saltRounds = 15;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password,salt);
    return hash;
 }

 async function comparePassword(password:string,hash:string):Promise<boolean> {
    const hasMatch = await bcrypt.compare(password,hash);
    return hasMatch;
 }
 router.post("/auth/register",async(req,res)=>{

    try{
    const user = req.body;
    const {name,email,password}=user;
    
    const newUser = await User.create({
        name,email,password
    });
    res.status(200).json({
        status: 201,
        success: true,
        message: " User created Successfully",
        user: newUser,
    });
}
catch(error:any){
    res.status(400).json({
        status: 400,
        message: error.message.toString(),
        });
}

 });

router.post("/auth/login",async (req,res)=>{
    //Logging using winston
    logger.info('Info message');
    
    const userId=12333444;
    const emailFromDB = "ram@ram.com";
    const passwordFromDB = "Ram@1234";
    const user = req.body;
    const {email,password}=user;
    [
        [
            body(req.body.email).isEmail(),
            body(req.body.password).notEmpty()
        ]
    ]
    //Sanitization of payload
    const errors = validationResult(req.body);
    
    const hashedPassword = await hashPassword(passwordFromDB);
    const isMatch = await comparePassword(password,hashedPassword);
    //Get email from DB
    if(emailFromDB===email && isMatch){
        try{
        const token = jwt.sign({id:userId,email:emailFromDB},hashedPassword,{expiresIn:"1d"});
        res.status(200).json(
            {
            status: 200,
            success: true,
            message: "login success",
            token: token,
            });    
        }catch(error:any){
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
                });
        };
        
    }else{
        res.json("Invalid credentials!")
        }
});
export default router;