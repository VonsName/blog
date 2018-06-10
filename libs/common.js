const crypto=require('crypto');
module.exports={
  MD5_SUFFIX:"ADASDADasdassadasdezmczjpquwepxlZXn",
  MD5:function (str) {
    let obj=crypto.createHash('md5');
    obj.update(str);
    let screct=obj.digest('hex');
   // console.log(screct);
    return screct;
  }
};