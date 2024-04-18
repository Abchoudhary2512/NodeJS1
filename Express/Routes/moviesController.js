let fs = require("fs");
let movies = JSON.parse(fs.readFileSync('./movies.json'));

// exports.checkId = (req,res,next,value) => {
//   console.log('movie id is '+ value);
// }

exports.validateBody = (req,res,next) =>{
  if(!req.body.name || !req.body.releaseYear){
    return res.status(400).json({
      status:"fail",
      message:"not a valid movie"
    });
  }
  next();
}

//route handler funciotns
exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

exports.getMovie = (req, res) => {
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
};

exports.createMovie = (req, res) => {
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
};
exports.updateMovie = (req, res) => {
  let id = req.params.id * 1;
  let movieToUpdate = movies.find((el) => el.id === id);
  let index = movies.indexOf(movieToUpdate);

  Object.assign(movieToUpdate, req.body);
  movies[index] = movieToUpdate;
  fs.writeFile("./movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};

exports.deleteMovie = (req, res) => {
  const id = req.params.id * 1;
  const index = movies.findIndex((el) => el.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Movie not found",
    });
  }

  const deletedMovie = movies.splice(index, 1)[0];

  fs.writeFile("./movies.json", JSON.stringify(movies), (err) => {
    if (err) {
      // Handle error
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        movie: deletedMovie,
      },
    });
  });
};
