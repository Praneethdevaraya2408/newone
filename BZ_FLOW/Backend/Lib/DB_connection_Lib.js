const mongoose=require('mongoose');
const config=require('../Config/Config')
module.exports = {
    connect : function(){
        mongoose.connect(config.mongo_connection_string, {useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true});
        
        mongoose.connection.on('connected', function(err,res){
           if(err)
           {
               console.log(err)
           }
           else{
            console.log('DB connected') 
           }
        })
    }
}