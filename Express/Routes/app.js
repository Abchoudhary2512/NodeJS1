// const express = require("express");
// let app = express();
// let fs = require("fs");
// let movies = JSON.parse(fs.readFileSync("./movies.json"));
// const morgan = require("morgan");

// const moviesRouter = require('./moviesRoutes')

// //routes = htttp method + url
// // app.get('/',(req,res)=>{
// //     res.status(200).send('heelo from the server');
// // })

// // //post
// // app.post('/',()=>{

// // })

// app.use(express.json()); //middleware //midlle in the request and response

// //middleware function // three arguments request,response,next
// const logger = function (req, res, next) {
//   console.log("logger middleware is called");
//   next();
// };

// app.use(logger);
// app.use(morgan("dev"));
// app.use((req, res, next) => {
//   req.requestedAt = new Date().toISOString();
//   next();
// });

// // GET - /api/movies
// // app.get("/api/v1/movies",getAllMovies);

// // //get (route parameter)
// // app.get("/api/v1/movies/:id",getMovie );

// // //POST - /api/movies
// // app.post("/api/v1/movies", createMovie);
// // app.patch("/api/v1/movies/:id", updateMovie);
// // //delete the moveis
// // app.delete("/api/v1/movies/:id",deleteMovie);

// // app.route('/api/v1/movies')
// // .get(getAllMovies)
// // .post(createMovie)

// // app.route('/api/v1/movies/:id')
// // .get(getMovie)
// // .patch(updateMovie)
// // .delete(deleteMovie)

// //put
// // app.put("/api/v1/movies/:id", (req, res) => {
// //   const id = req.params.id * 1;
// //   const movieToUpdate = movies.find((el) => el.id === id);

// //   if (!movieToUpdate) {
// //     return res.status(404).json({
// //       status: "error",
// //       message: "Movie not found"
// //     });
// //   }

// //   Object.assign(movieToUpdate, req.body);

// //   fs.writeFile("./movies.json", JSON.stringify(movies), (err) => {
// //     if (err) {
// //       // Handle error
// //       return res.status(500).json({
// //         status: "error",
// //         message: "Internal server error"
// //       });
// //     }

// //     res.status(200).json({
// //       status: "success",
// //       data: {
// //         movie: movieToUpdate
// //       }
// //     });
// //   });
// // });

// // const moviesRouter =express.Router();

// // moviesRouter.route('/')
// //     .get(getAllMovies)
// //     .post(createMovie)

// //     moviesRouter.route('/:id')
// //   .get(movies)
// //   .patch(updateMovie)
// //   .delete(deletedMovie)

// // app.use('/api/v1/movies',moviesRouter)

// app.use('/api/v1/movies',moviesRouter)

// //creatre a server
// const port = 3000;
// app.listen(port, () => {
//   console.log("serrver has started");
// });

const express = require("express");
const app = express();
const morgan = require("morgan");
const moviesRouter = require('./moviesRoutes');

// Middleware
app.use(express.json()); // JSON parsing middleware
app.use(morgan("dev")); // Morgan logging middleware

// Routes
app.use('/api/v1/movies', moviesRouter);

module.exports = app;