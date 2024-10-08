const express=require('express');
const cors=require('cors');
const connectMongo=require('./db');

connectMongo();

const app=express();
const PORT=3000;
app.use(cors())
app.use(express.json())


app.use('/user',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))

app.listen(PORT,()=>{
    console.log(`iNotebook backend is listening at : http://localhost:${PORT}`);
}) 