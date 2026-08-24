import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MovieDetails({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!movie || !movie.id) {
      return;
    }

    axios
      .get(`http://127.0.0.1:5000/movies/${movie.id}`)
      .then((response) => {
        setDetails(response.data.movie);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [movie]);

  if (!movie) {
    return null;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  if (!details) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div>
      <h2>{details.title}</h2>
      <p>{details.description}</p>

      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default MovieDetails;
