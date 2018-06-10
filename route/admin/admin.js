const express=require('express');
module.exports=function () {
    let router=express.Router();
    router.use((req,res,next)=>{
        console.log(req.url);
        if (!req.session['user_id']&&req.url!=='/login') {//没有登陆
            res.redirect('/admin/login');
        }else {
            next();
        }
    });
    router.get('/login',(req,res)=>{
       res.render('../template/admin/login.ejs',{});
    });
    router.get('/info',(req,res)=>{
        res.send('info').end();
    });
    return router;
};
