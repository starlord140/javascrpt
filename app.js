var express=require('express');
var routes=require('./routes');
var http=require('http');
var path=require('path');
var urlencoded=require('url');
var bodyparser=require('body-parser');      
var logger=require('logger');
var json=require('json');
var methodoverride=require('method-override');
var sys=require('util');

var nano=require('nano')('http://localhost:5984');
var db=nano.use('address');
var app=express();
app.set('port',process.env.PORT ||3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodoverride());
app.use(express.static(path.join(__dirname,'public')));


app.get(  '/',routes.index);
app.post('/createdb',function(req,res){
    nano.db.create(req.body.name,function(err){
        if(err)
       { res.send("error creating database"+req.body.name);
        return;
    }
    res.send("database"+req.body.name+"creates success");
});
});

app.post('/new_contacts',function(req,res){
    var name=req.body.name;
    var phone=req.body.phone;
    db.insert({name:name,phone:phone,crazy:true},phone,function(err,body,header){
        if(err)
       { res.send("error creating contact");
        return;
    }
    res.send("database creates success");
});
});
app.post(
'/view_contact',function(req,res){
    var alloc="followig are the contacts";
    db.get(req.body.phone,{revs_info:true},function(error,body){
    if(!err){
        console.log(body);
    }
    if(body){
        alldoc +="Name:"+body.name+"<br/>phone Number:"+body.phone;

    
    }else{
        alldoc="no reccord found";
    }
    res.send(alldoc);

}


);
});
app.post('/delete contact',function(req,res){
 db.get(req.body.phone,{revs_info:true},function(error,body){
     if(!err)
     db.destroy(req.body.phone,body._rev,function(err,body){
         if(err){
         res.send("error deleting contact");
         }
     });
     res.send("contacts deleted successfully");
 });



});

http.createServer(app).listen(app.get('port'),function(){
    console.log('Express server listening on port'+app.get('port'));
});