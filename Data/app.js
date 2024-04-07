const fs = require('fs')
const http = require('http')
const url = require('url')
//creating a server
const html = fs.readFileSync('./index.html','utf-8')
let products = JSON.parse(fs.readFileSync('./product.json','utf-8'))
let productListHtml = fs.readFileSync('./product-list.html','utf-8')

let productHtmlArray = products.map((prod)=>{
    let output = productListHtml.replace('{{%IMAGE%}}',prod.productImage)
     output  = output.replace('{{%IMAGE%}}',prod.name)
     output = output.replace('{{%MODELNAME%}}', prod.modeName);
         output = output.replace('{{%MODELNO%}}', prod.modelNumber);
         output = output.replace('{{%SIZE%}}', prod.size);
         output = output.replace('{{%CAMERA%}}', prod.camera);
         output = output.replace('{{%PRICE%}}', prod.price);
         output = output.replace('{{%COLOR%}}', prod.color);
         output = output.replace('{{%ID%}}', prod.id);
         output = output.replace('{{%ROM%}}', prod.ROM);
         output = output.replace('{{%DESC%}}', prod.Description);

         return output;
;})
const server = http.createServer((request,response)=>{
   let {query, pathname: path} = url.parse(request.url,true);
   //console.log(x);
   //let path = request.url;
   
    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200);
        response.end(html.replace('{{%CONTENT%}}','you are in home page'));
    }
    else if(path.toLocaleLowerCase() === '/about'){
        response.writeHead(200);
        response.end(html.replace('{{%CONTENT%}}',"You r in about page"));
    }
    else if(path.toLocaleLowerCase() === '/products'){
        if(!query.id){
            let productResponseHtml =   html.replace('{{%CONTENT%}}',productHtmlArray.join(','))
            response.writeHead(200,{
                'Content-Type':'text/html'
            });
            response.end(productResponseHtml)
           console.log('success')
        }
        else{
            response.end('this is product with id= ' + query.id)
        }
     
       
       
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