import React, { useState } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import './App.css';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div>
      <h1>Movie Picture Pipeline</h1>

      {!selectedMovie ? (
        <MovieList onSelectMovie={setSelectedMovie} />
      ) : (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default App;
