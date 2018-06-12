const koa=require('koa');
const server=new koa();
const mysql=require('koa-mysql');
const db=mysql.createPool({host:'localhost',user:'root',password:'root',database:'node'});
server.use(function *(){
    let data=yield db.query(`select * from banner`);
    this.body=data;
});
server.listen(8080);