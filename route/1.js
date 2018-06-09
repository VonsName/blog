const express=require('express');
module.exports=function () {
    let router=express.Router();
    router.get('/user',(req,res)=>{
        res.send('user');
    });
    router.get('/info',(req,res)=>{
        res.send('info');
    });
    return router;
};
