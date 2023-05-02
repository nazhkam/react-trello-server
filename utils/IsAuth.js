import jwt from "jsonwebtoken";


export default (req,res,next)=>{

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token){
        try {
            const decoded=jwt.verify(token,'secret123');
            req.userId=decoded._id
           
            next()

        } catch (error) {
            console.log(error)
            res.json({message:"Вы не авторизованы"})
        }
    }else {
        return res.json({message:"Вы не авторизованы"})
    }



}