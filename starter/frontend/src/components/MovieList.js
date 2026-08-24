import React, { useEffect, useState } from 'react';

function MovieList({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        return response.json();
      })
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>Movie ID: {movie.id}</p>

          <button onClick={() => onSelectMovie(movie)}>Click for details →</button>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
