import { validationResult } from 'express-validator';

export const validateReqSchema = (req,res,next)=>{
    const result =validationResult(req);
    if(result.isEmpty()) return next();
    const error =result.array();
    console.log({error})
    res.status(400).json({success:false ,message:error[0]['msg']})
}


