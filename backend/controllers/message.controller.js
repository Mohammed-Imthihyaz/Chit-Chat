import Message from "../models/message.model.js";
import { User } from "../models/user.model.js";


export const getUsersForSidebar= async(req,res)=>{
    try {
        const loggedUserId=req.userId;
        //$ne means not loogedinuser noob u
        const filteredUser=await User.find({_id:{$ne:loggedUserId}}).select("-password");
        res.status(201).json(filteredUser);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
};
export const getMessages= async(req,res)=>{
    try {
        const {id}=req.params;
        const myId=req.userId;
        const messages=await Message.find({
            $or:[
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId },
            ]
        })
        // simply getting the mesage from u or from the the person 
        res.status(201).json(messages);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}
export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id}=req.params;
        const myId =req.userId;
        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
          }
          const newMessage=new Message({
            myId,
            id,
            text,
            image:imageUrl,
          })
          await newMessage.save();
          //todo:socket-implementation
          res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}