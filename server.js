const express=require('express');
const expressStatic=require('express-static');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const consolidate=require('consolidate');
const multer=require('multer');
const cookiesession=require('cookie-session');
const cookieParser=require('cookie-parser');
const common=require('./libs/common');
const ejs=require('ejs');
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
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(multer().any());
//创建mysql连接池
let db=mysql.createPool({host:'localhost',username:'root',password:'root',database:'node'});
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
const createRouter=require('./route/admin/admin.js');
let str=common.MD5('12345'+common.MD5_SUFFIX);
console.log(str);
app.use('/admin',createRouter());
app.use('/',require('./route/web/web.js')());

app.use(expressStatic('./static'));
app.listen(8080);

