//reading and writing async
//callback hell
const fs = require('fs')
fs.readFile('./files/ip1.txt','utf-8',(error1,data1) =>{
    console.log(data1)
    fs.readFile(`./files/${data1}.txt`,'utf-8',(error2,data2)=>{
        console.log(data2)
        fs.readFile(`./files/${data2}.txt`,'utf-8',(error3,data3)=>{
            console.log(data3)
            fs.writeFile('./files/ouptut.txt',`${data2}\n\n${data3}\n\n Date is ${new Date()}`,()=>{
                console.log("file written successfully")
            })
        })
    })
  
})
console.log('reading file-------')