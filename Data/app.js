const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceHtml = require('../Modules/replaceHtml.js')
// importing events
const events =  require('events')
const user = require('../Modules/user');
//creating a server
const html = fs.readFileSync("./index.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./product.json", "utf-8"));
let productListHtml = fs.readFileSync("./product-list.html", "utf-8");
let productDetailHtml = fs.readFileSync("./product-details.html", "utf-8");


// already declared function in a module
// function replaceHtml(template, product) {
//   let output = template.replace("{{%IMAGE%}}", product.productImage);
//   output = output.replace("{{%NAME%}}", product.name);
//   output = output.replace("{{%MODELNAME%}}", product.modeName);
//   output = output.replace("{{%MODELNO%}}", product.modelNumber);
//   output = output.replace("{{%SIZE%}}", product.size);
//   output = output.replace("{{%CAMERA%}}", product.camera);
//   output = output.replace("{{%PRICE%}}", product.price);
//   output = output.replace("{{%COLOR%}}", product.color);
//   output = output.replace("{{%ID%}}", product.id);
//   output = output.replace("{{%ROM%}}", product.ROM);
//   output = output.replace("{{%DESC%}}", product.Description);

//   return output;
// }

const server = http.createServer((request, response) => {
  let { query, pathname: path } = url.parse(request.url, true);
  //console.log(x);
  //let path = request.url;

//   if (path === "/" || path.toLocaleLowerCase() === "/home") {
//     response.writeHead(200);
//     response.end(html.replace("{{%CONTENT%}}", "you are in home page"));
//   } else if (path.toLocaleLowerCase() === "/about") {
//     response.writeHead(200);
//     response.end(html.replace("{{%CONTENT%}}", "You r in about page"));
//   } else if (path.toLocaleLowerCase() === "/products") {
//     if (!query.id) {
//       let productHtmlArray = products.map((prod) => {
//         return replaceHtml(productListHtml, prod);
//       });
//       let productResponseHtml = html.replace(
//         "{{%CONTENT%}}",
//         productHtmlArray.join(",")
//       );
//       response.writeHead(200, { "Content-Type": "text/html" });
//       response.end(productResponseHtml);
//     } else {
      
//       let prod = products[query.id];
//       let productDetailResponseHtml = replaceHtml(productDetailHtml, prod);
//       response.end(html.replace("{{%CONTENT%}}", productDetailResponseHtml));
//     }
//   } else {
//     response.writeHead(404);
//     response.end("ERROR 404");
//   }
});


let myEmitter = new user();//here the myemitter variable stores the instance of the eventEmitter class
myEmitter.on('userCreated',(id,name) => {
    console.log(`a ${name} user with ${id }is created`);
    console.log('asdasd')
})
myEmitter.emit('userCreated',101,"ajay");//userCreate request emit by the myemitter and now we have to listen that request

//starting a server
server.listen(8000, "127.0.0.1", () => {
  console.log("server started");
});

// server.on('request',(req,res) => {
//     // console.log('dssdf')
//     fs.readFile('./large-file.txt',(err,data)=>{
//         if(err)   {
//             res.end('something went wrong');
//             return;
//         } 
//         res.end(data);
//     })
// })
//****************************************************** */
// at production level use readstream
// server.on('request', (req, res) =>{
//         let rs = fs.createReadStream('./large-file.txt');
    
//         rs.on('data', (chunk) => {
//             res.write(chunk)
//         })
    
//         rs.on('end', () => {
//             res.end();
//         })
 
//         rs.on('error', (error) => {
//             res.end(error.message);
//         })
//     })

/// solutionn3 using pipe
server.on('request',(req,res) =>{
    
    let rs = fs.createReadStream('./large-file.txt');
    console.log('hii')
    rs.pipe(res);
    // for pipe method 
    // readable soruce.pip(writableDestination)
}) 