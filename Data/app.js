const fs = require("fs");
const http = require("http");
const url = require("url");
//creating a server
const html = fs.readFileSync("./index.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./product.json", "utf-8"));
let productListHtml = fs.readFileSync("./product-list.html", "utf-8");
let productDetailHtml = fs.readFileSync("./product-details.html", "utf-8");

function replaceHtml(template, product) {
  let output = template.replace("{{%IMAGE%}}", product.productImage);
  output = output.replace("{{%NAME%}}", product.name);
  output = output.replace("{{%MODELNAME%}}", product.modeName);
  output = output.replace("{{%MODELNO%}}", product.modelNumber);
  output = output.replace("{{%SIZE%}}", product.size);
  output = output.replace("{{%CAMERA%}}", product.camera);
  output = output.replace("{{%PRICE%}}", product.price);
  output = output.replace("{{%COLOR%}}", product.color);
  output = output.replace("{{%ID%}}", product.id);
  output = output.replace("{{%ROM%}}", product.ROM);
  output = output.replace("{{%DESC%}}", product.Description);

  return output;
}

const server = http.createServer((request, response) => {
  let { query, pathname: path } = url.parse(request.url, true);
  //console.log(x);
  //let path = request.url;

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    response.writeHead(200);
    response.end(html.replace("{{%CONTENT%}}", "you are in home page"));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.writeHead(200);
    response.end(html.replace("{{%CONTENT%}}", "You r in about page"));
  } else if (path.toLocaleLowerCase() === "/products") {
    if (!query.id) {
      let productHtmlArray = products.map((prod) => {
        return replaceHtml(productListHtml, prod);
      });
      let productResponseHtml = html.replace(
        "{{%CONTENT%}}",
        productHtmlArray.join(",")
      );
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(productResponseHtml);
    } else {
      
      let prod = products[query.id];
      let productDetailResponseHtml = replaceHtml(productDetailHtml, prod);
      response.end(html.replace("{{%CONTENT%}}", productDetailResponseHtml));
    }
  } else {
    response.writeHead(404);
    response.end("ERROR 404");
  }
});

//starting a server
server.listen(8000, "127.0.0.1", () => {
  console.log("server started");
});
