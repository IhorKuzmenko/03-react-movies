import { useState } from "react";
import css from './App.module.css'
import { toast, Toaster } from "react-hot-toast";
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from '../../services/movieService'; 
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    setMovies([]); 

    try {
      const results = await fetchMovies(query);

      if (!results.length) {
        toast.error("No movies found for your request.");
      } else {
        setMovies(results);
      }
    } catch {
      setIsError(true);
    } finally {
       setIsLoading(false);
    }
  };

const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.api}>
       <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && <MovieGrid movies={movies} onSelect={handleSelect} />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default App;