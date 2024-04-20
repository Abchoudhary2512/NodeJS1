
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
// Start server
const app = require('./app')
// console.log(app.get('env'))
const port  = 3000
console.log(process.env )
app.listen(port, () => {
  console.log("Server has started on port", port);
});
