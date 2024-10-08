const mongoose=require('mongoose');
const mongoURL=`mongodb://localhost:27017/inotebook`;
const connectMongo=()=>{
    mongoose.connect(mongoURL).then(
        ()=>{
        console.log(`Connected to database`);
    }
).catch(err=>console.log(err))
}


module.exports=connectMongo;