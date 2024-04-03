const fs = require('fs')
const http = require('http')
//creating a server
const html =  fs.readFileSync('./index.html','utf-8')
const server = http.createServer((request,response)=>{
    response.end(html)
console.log("new request is received")
});

//starting a server
server.listen(8000,'127.0.0.2',()=>{
    console.log('server started')
})