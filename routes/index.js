var express = require('express');
var router = express.Router();
var mongoose_ = require('mongoose')
const {Schema} = require("mongoose");


const uri = "mongodb+srv://zewdatabase:kb9aFnEu4Qikaax@zewgame.urb3i.mongodb.net/assignment?retryWrites=true&w=majority";
mongoose_.connect(uri).catch(err => console.log('Co Loi Xay Ra'))

const ImageBox = mongoose_.model('images',new Schema({
      _title: String,
      _content: String,
      _tag: String,
      _timeUpload: String,
      _linkIMG: String
}))
/* GET home page. */
router.get('/', function(req, res, next) {
  ImageBox.find({},function (error,result){
    if(error) throw error;
    res.render('index', { title: 'Assignment-Home',data:result });
  });
});
router.get('/index', function(req, res, next) {

  ImageBox.find({},function (error,result){
    if(error) throw error;
      res.render('index', { title: 'Assignment-Home',data:result });
  });
});
router.get('/getData', function(req, res, next) {

    ImageBox.find({},function (error,result){
        if(error) throw error;
        res.send(result);
    });
});
router.get('/testshow/', function(req, res, next) {
    const id = req.query.id
    ImageBox.findOne({_id:id},function (error,result){
        if(error) throw error;
        res.render('testshow', { title: 'Assignment-Home',data:result });
    });
});
router.get('/delete/', function(req, res, next) {
    const id = req.query.id
    ImageBox.deleteOne({_id:id},function (error,result){
        if(error) throw error;
       res.send("Xoa Thanh Cong"+`<a href='/index'>Ấn vào đây để quay trở lại Home -.- </a>`);
    });
});
router.post('/update_one',function (req,res){
    const id = req.query.id;
    var title_get = req.body.title_;

    var tag_get = req.body.tag_;

    var content_get = req.body.content_;
    var linkIMG_get = req.body.link_;
    var today_ = new Date();
    var timeUpload_get = (today_.getHours())+"h : "+(today_.getMinutes())+"' [ "+(today_.getDay())+"-"+(today_.getMonth())+"-"+(today_.getFullYear())+" ]";
    if(content_get.length<150)
    {
        res.send("Nội Dung phải lớn hơn 150 kí tự"+`<a href='`+"/testshow/?id="+id+`' style='text-decoration: none;font-size: 30px ;margin: 10px' > Quay Lại -.- </a>`);
        return;
    }
    if(linkIMG_get.lastIndexOf(".jpg")<0&&linkIMG_get.lastIndexOf(".png")<0&&linkIMG_get.lastIndexOf(".gif")<0)
    {
        res.send("link định sai định dạng vui lòng sử dụng link online có đuôi .jpg , .png hoặc .gif"+`<a href='`+"/testshow/?id="+id+`' style='text-decoration: none;font-size: 30px ;margin: 10px' > Quay Lại -.- </a>`);
        return;
    }
    var newValue = {
        $set:{_title: title_get , _content: content_get , _tag : tag_get , _timeUpload: timeUpload_get , _linkIMG:linkIMG_get}
    };
    ImageBox.updateOne({_id:id},newValue,function (err){
       if(err) throw err;
       ImageBox.find({_id:id},function (error,result){
           if (error) throw error;
           res.send("Cập Nhập Thành Công "+`<a href='/index' style='text-decoration: none;font-size: 30px ;margin: 10px' >Ấn vào đây để quay trở lại Home -.- </a>`);

       })
    });
})
router.get('/insert',function (req,res,next){
    res.render('insertdata.ejs',{title:'Assignment-Insert'});
});
router.post('/insert/',function (req,res){

    var title_get = req.body.title_;

    var tag_get = req.body.tag_;

    var content_get = req.body.content_;
    var linkIMG_get = req.body.link_;
    var today_ = new Date();
    var timeUpload_get = (today_.getHours())+"h : "+(today_.getMinutes())+"' [ "+(today_.getDay())+"-"+(today_.getMonth())+"-"+(today_.getFullYear())+" ]";
    if(content_get.length<150)
    {
        res.send("Nội Dung phải lớn hơn 150 kí tự"+`<a href='/insert' style='text-decoration: none;font-size: 30px ;margin: 10px' >quay trở lại -.- </a>`);
        return;
    }
    if(linkIMG_get.lastIndexOf(".jpg")<0&&linkIMG_get.lastIndexOf(".png")<0&&linkIMG_get.lastIndexOf(".gif")<0)
    {
        res.send("link định sai định dạng vui lòng sử dụng link online có đuôi .jpg , .png hoặc .gif"+`<a href='/insert' style='text-decoration: none;font-size: 30px ;margin: 10px' >quay trở lại -.- </a>`);
        return;
    }
    var newValue = {
        _title: title_get , _content: content_get , _tag : tag_get , _timeUpload: timeUpload_get , _linkIMG:linkIMG_get
    };
    ImageBox.insertMany([newValue],function (error,result){
        if(error) throw error;
        res.send("Thêm Thành Công "+`<a href='/index' style='text-decoration: none;font-size: 30px ;margin: 10px' >Ấn vào đây để quay trở lại Home -.- </a>`);
    });




})
router.get('/test',function (req,res,next){
  ImageBox.find({},function (error,result){
    if(error) throw error;
    res.send("Title: "+result[0]._title+"\n  --  Content :"+result[0]._content+"\n  --  tag: "+result[0]._tag[0] + "\n   --  Time: "+result[0]._timeUpload +"\n   --- Link: "+result[0]._linkIMG);
  });
})
router.post('/createImageBox/',function(req,res){
    var titleGet = req.body.title_;
    var tagGet = req.body.tag_;
    var contentGet = req.body.content_;
    var linkGet = req.body.link_;
    var timeUploadGet = (today_.getHours())+"h : "+(today_.getMinutes())+"' [ "+(today_.getDay())+"-"+(today_.getMonth())+"-"+(today_.getFullYear())+" ]";
    var newValue = {
        _title: titleGet , _content: contentGet , _tag : tagGet , _timeUpload: timeUploadGet , _linkIMG:linkGet
    };
      res.send("123");
    ImageBox.insertMany([newValue],async function (error,result){
      if(error) throw error;
          res.send("Insert Thanh Cong");
//           res.send({
//               statusCode:200,
//               message:'Thành Công !!!'
//           });
      });    
});

module.exports = router;
