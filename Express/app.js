const exp = require("constants");
const express = require("express");
let app = express();
let fs = require("fs");
let movies = JSON.parse(fs.readFileSync("./movies.json"));
const morgan = require('morgan')

//routes = htttp method + url
// app.get('/',(req,res)=>{
//     res.status(200).send('heelo from the server');
// })

// //post
// app.post('/',()=>{

// })

app.use(express.json()); //middleware //midlle in the request and response



//middleware function // three arguments request,response,next 
const logger = function(req,res,next){
  console.log("logger middleware is called") 
  next();
} 

app.use(logger)
app.use(morgan('dev'))
app.use((req,res,next)=>{
      req.requestedAt = new Date().toISOString();
      next();
})
// GET - /api/movies
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies,
    },
  });
});

//get (route parameter)
app.get("/api/v1/movies/:id", (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1; //number mein convert krdiya

  //finding the movie based on the id
  let movie = movies.find((el) => el.id === id);

  if (!movie) {
    return res.status(404).json({
      status: "failed",
      message: "movie not found",
    });
  }
  //sending the response
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
});

//POST - /api/movies
app.post("/api/v1/movies", (req, res) => {
  // console.log(req.body);
  const newId = movies[movies.length - 1].id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);
  fs.writeFile("./movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
  // res.send('created');   // yaha jo movie aayegi uski id 4 honi chahiye
});

app.patch("/api/v1/movies/:id", (req,res) => {
  let id = req.params.id * 1;
  let movieToUpdate = movies.find((el) => el.id === id);
  let index = movies.indexOf(movieToUpdate);

  Object.assign(movieToUpdate, req.body);
  movies[index] = movieToUpdate;
  fs.writeFile("./movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate
      },
    });
  });
});

//put 
app.put("/api/v1/movies/:id", (req, res) => {
  const id = req.params.id * 1;
  const movieToUpdate = movies.find((el) => el.id === id);

  if (!movieToUpdate) {
    return res.status(404).json({
      status: "error",
      message: "Movie not found"
    });
  }

  Object.assign(movieToUpdate, req.body);

  fs.writeFile("./movies.json", JSON.stringify(movies), (err) => {
    if (err) {
      // Handle error
      return res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate
      }
    });
  });
});


//delete the moveis
app.delete("/api/v1/movies/:id", (req, res) => {
  const id = req.params.id * 1;
  const index = movies.findIndex((el) => el.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Movie not found"
    });
  }

  const deletedMovie = movies.splice(index, 1)[0];

  fs.writeFile("./movies.json", JSON.stringify(movies), (err) => {
    if (err) {
      // Handle error
      return res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        movie: deletedMovie
      }
    });
  });
});



// const moviesRouter =express.Router();

// moviesRouter.route('/')
//     .get(getAllMovies)
//     .post(createMovie)

//     moviesRouter.route('/:id')
//   .get(movies)
//   .patch(updateMovie)
//   .delete(deletedMovie)


// app.use('/api/v1/movies',moviesRouter)



//creatre a server
const port = 3000;
app.listen(port, () => {
  console.log("serrver has started");
});
