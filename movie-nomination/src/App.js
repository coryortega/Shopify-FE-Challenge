import React, { useEffect, useState } from "react";
import MovieCard from "./Components/MovieCard/MovieCard";
import useWindowSize from './Hooks/WindowDimensions';
import Confetti from 'react-confetti';
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const searchableMovie = query.replace(/\s/g, "+");
    const omdbKey = process.env.REACT_APP_API_KEY;

    axios
      .get(`http://www.omdbapi.com/?s=${searchableMovie}&apikey=${omdbKey}`)
      .then((res) => {
        setMovies(res.data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const addNominee = (id) => {
    let newNominee = movies.find((movie) => movie.imdbID == id);
    if (nominees.find((movie) => movie.imdbID == id)) {
      alert(`${newNominee.Title} has already been nominated! Pick another.`);
    } else {
      setNominees([...nominees, newNominee]);
      if (nominees.length == 4) {
        setConfetti(true);
        alert(
          "Congratulations, you just won! What is that you won? I have no idea, but just know that YOU DID IT!!!"
        );
      }
    }
  };

  const removeNominee = (id) => {
    let removedNominee = nominees.filter((nominee) => nominee.imdbID !== id);
    setNominees([...removedNominee]);
  };

  const { width, height } = useWindowSize()

  return (
    <div className="App">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        run={confetti}
      />
      <h1>Welcome!</h1>
      <h2>Nominate some movies to win a prize...</h2>
      <div className="container">
        <div className="search-container">
          <h2>Search for a movie!</h2>
          <form>
            <input
              className="search-bar"
              value={query}
              type="text"
              name="input"
              onChange={handleQuery}
              placeholder="Type in a movie to nominate!"
            />
          </form>
          <div className="movies-container">
            {movies?.map((movie) => {
              return (
                <div className="movie" onClick={() => addNominee(movie.imdbID)}>
                  <div className="overlay"></div>
                  <MovieCard
                    title={movie.Title}
                    year={movie.Year}
                    src={movie.Poster}
                  />
                  <a class="button">❤️</a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="nominees-container">
          <h2>⭐ Nominees ⭐</h2>
          <div className="nominees">
            {nominees?.map((nominee) => {
              return (
                <div
                  className="movie"
                  onClick={() => removeNominee(nominee.imdbID)}
                >
                  <div className="overlay"></div>
                  <MovieCard
                    title={nominee.Title}
                    year={nominee.Year}
                    src={nominee.Poster}
                  />
                  <a class="button">💔</a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
