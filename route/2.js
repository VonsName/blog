const express=require('express');
module.exports=function () {
  let router=express.Router();
  router.get('/info',(req,res)=>{
      res.send('blog  info');
  });
  return router;
};