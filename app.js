const e = require('express');
const https = require("https");
const bodyParse=require("body-parser");
const request = require('request');

const app= e();
app.use(e.static("public"));
app.use(bodyParse.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
   // console.log("everything is fine")
})
app.post("/",function(req,res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var uEmail = req.body.email;
  var data = {
      members:[
          {
          email_address:uEmail,
          status:"subscribed",
          merge_fields:{
              FNAME:firstName,
              LNAME:lastName
          }
          }
          
      ]
      
  }
  const daata = JSON.stringify(data);
  const url="https://us6.api.mailchimp.com/3.0/lists/2b8c118b75"
  const options ={
      method:"POST",
      auth: "raj:3bd82b73ed05af0d995821ae89ba05f6-us6"
  }
  const request = https.request(url,options,function(response){
      response.on("data",function(data){
          console.log(JSON.parse(data));
      })
  })
  request.write(daata);
  request.end();

})
// 3bd82b73ed05af0d995821ae89ba05f6-us6
// 2b8c118b75
app.listen(5500,function(){
    console.log("server is running on port 5500")
})
