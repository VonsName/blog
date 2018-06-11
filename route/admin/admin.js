const express=require('express');
const mysql=require('mysql');
const common=require('../../libs/common');
//创建mysql连接池
let db=mysql.createPool({host:'localhost',username:'root',password:'root',database:'node'});
module.exports=function () {
    let router=express.Router();
    router.use((req,res,next)=>{
        //console.log(req.url);
        if (!req.session['user_id']&&req.url!=='/login') {//没有登陆
            res.redirect('/admin/login');
        }else {
            next();
        }
    });
    router.get('/login',(req,res)=>{
       res.render('../template/admin/login.ejs',{});
    });

    //处理用户登录请求
    router.post('/login',(req,res)=>{
        let username=req.body.username;
        let password=req.body.password;
        db.query(`select * from admin where username='${username}'`,(err,data)=>{
            if (err){
                console.error(err);
                res.status(500).send('data error').end();
            } else {
                if (data.length>0) {//有账户
                    if (common.MD5(password + common.MD5_SUFFIX) ===data[0].password) {//密码正确
                        res.render('../template/admin/index.ejs');
                    }else {//密码错误
                        res.status(400).send('account/password incorrect').end();
                    }
                }else {//没有账户
                    res.status(400).send('account is none').end();
                }
            }
        })
    });
    router.get('/banners',(req,res)=>{
        switch (req.query.act){
            case 'del':
                db.query(`delete from banners where id='${req.query.id}'`,(err,data)=>{
                    if (err){
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        if (data.length>0){
                            res.redirect('/admin/banners');
                        }else {
                            res.status(500).send('data not found').end();
                        }
                    }
                });
                break;
            case 'upd':

                db.query(`select * from banners where id='${req.query.id}'`,(err,data)=>{
                    if (err){
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {

                    }
                });

                break;
            default:
                db.query(`select * from banners`,(err,banners)=>{
                    if (err){
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.render('../template/banners.ejs',{banners});
                    }
                });
                break;
        }
    });
    router.post('/banners',(req,res)=>{
        if (req.body.id){
            db.query(`update banners set title='${req.body.title}' where id='${req.body.id}'`,(err,data)=>{
                if (err){
                    console.error(err);
                    res.status(500).send('database error').end();
                } else {
                    res.redirect('/admin/banners');
                }
            });
        } else {
            let title=req.body.title;
            let description=req.body.description;
            let href=req.body.href;
            db.query(`insert into banners(title,description,href) values('${title}','${description}','${href}')`);
            res.redirect('/admin/banners');
        }
    });
    return router;
};
