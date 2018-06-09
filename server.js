const express=require('express');
const expressStatic=require('express-static');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const consolidate=require('consolidate');
const multer=require('multer');
const cookiesession=require('cookie-session');
const cookieParser=require('cookie-parser');
const app=express();
let keys=[];
for (let i=0;i<100000;i++){
    keys.push("key"+Math.random());
}
app.use(cookiesession({
    name:'key',
    keys:keys,
    maxAge:20*60*1000
}));
app.use(cookieParser());
app.use(multer().any());
//创建mysql连接池
mysql.createPool({host:'localhost',username:'root',password:'root',database:'node'});
//模板
app.set('views','./template');
app.set('view engine','html');
app.engine('html',consolidate.ejs);
/*app.route('/article').get((req,res)=> {
    res.send('artivle');
});
app.route('/blog').get((req,res)=> {
    res.send('blog');
});*/
const createRouter=require('./route/1.js');

app.use('/article',createRouter());
app.use('/blog',require('./route/2.js')());

app.use(expressStatic('./static'));
app.listen(8080);

