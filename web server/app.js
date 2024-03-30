const http = require('http')
//creating a server
const server = http.createServer((request,response)=>{
console.log("new request is received")
});

//starting a server
server.listen(8000,'127.0.0.1',()=>{
    console.log('server started')
})