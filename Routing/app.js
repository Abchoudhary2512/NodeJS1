const fs = require('fs')
const http = require('http')
//creating a server

const server = http.createServer((request,response)=>{
   let path = request.url;
   const html = fs.readFileSync('./index.html','utf-8')
    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200);
        response.end(html);
    }
    else if(path.toLocaleLowerCase() === '/about'){
        response.writeHead(200);
        response.end(html.replace('{{%CONTENT%}}',"You r in home page"));
    }
    else if(path.toLocaleLowerCase() === '/products'){
        response.end(html.replace('{{%CONTENT%}}',"You r in product page"));
    }
    
    else{
        response.writeHead(404);
        response.end("ERROR 404")
    }





});

//starting a server
server.listen(8000,'127.0.0.1',()=>{
    console.log('server started')
})