const fs = require('fs')
const http = require('http')
//creating a server

const server = http.createServer((request,response)=>{
    response.end('<h1>lskdfjlksd</h1>')
console.log("new request is received")
});

//starting a server
server.listen(8000,'127.0.0.1',()=>{
    console.log('server started')
})