const express = require('express')
let app = express();

//routes = htttp method + url
app.get('/',(req,res)=>{
    res.status(200).send('heelo from the server');
})

//post
app.post('/',()=>{
    
})

//creatre a server
const port = 3000;
app.listen(port,()=>{
    console.log('serrver has started')
})