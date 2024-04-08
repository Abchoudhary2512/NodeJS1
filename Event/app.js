const fs = require("fs");
console.log("1st line");

fs.readFile("./ip.txt", () => {
  console.log("file read done");

  setTimeout(() => {
    console.log("timeout function executed");
  }, 0);
  setImmediate(() => {
    console.log("set immediatre calback executed"); //expires immediated
  });
  process.nextTick(()=>{
    console.log("heelop")
  })
});

setTimeout(() => {
  console.log("timeout function executevd");
}, 0);
setImmediate(() => {
  console.log("set immediatre calback executed"); //expires immediated
});

console.log("2nd line");
