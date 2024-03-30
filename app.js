// console.log("hii there");
// 4th lecture
//creating interface and taking input from the user in cmd
const readline = require('readline');  // importing the package readline

// creating the interface on cmd
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

//questioning the interface
rl.question("Enter the name",(name)=>{
    console.log("name is : "+ name)
    rl.close();
})

//pop up message when input is done and also the output is displayed
rl.on('close',()=>{
    console.log("interface is closed")
    process.exit(0);
})
