import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedMovies } from "../redux/actions/moviesActions";
import { ChevronRight } from "lucide-react";

export const RecommendedMovies = () => {
  const dispatch = useDispatch();
  const { topRatedLoading, topRatedMovies, topRatedError } = useSelector(
    (state) => state.movieData
  );

  useEffect(() => {
    dispatch(getTopRatedMovies());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-textLight">Recommended Movies</h2>
        <a href="/movies" className="text-primary flex items-center group">
          See All
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>

      {topRatedLoading ? (
        <p>Loading recommended movies...</p>
      ) : topRatedError ? (
        <p className="text-red-500">Error: {typeof topRatedError === 'object' ? (topRatedError.error || JSON.stringify(topRatedError)) : topRatedError}</p>
      ) : (
        <div className="flex overflow-x-scroll no-scrollbar space-x-4 pb-4">
          {topRatedMovies.map((movie) => (
            <div key={movie.movieId} className="flex-none w-64 bg-white dark:bg-footerBg shadow-md rounded-lg overflow-hidden relative cursor-pointer transform transition-transform duration-300 hover:scale-105">
              <div className="relative">
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-80 object-cover rounded-t-lg" />
                {/* Overlay for rating and votes */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
                  {movie.rating && movie.votes && (
                    <p className="text-base font-semibold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400 mr-1">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006Z" clipRule="evenodd" />
                      </svg>
                      {movie.rating}/10 {movie.votes} Votes
                    </p>
                  )}
                  {movie.likes && !movie.rating && !movie.votes && (
                    <p className="text-base font-semibold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400 mr-1">
                        <path d="M7.493 18.5c-.425 0-.78-.204-.937-.504a3.32 3.32 0 0 1-.097-.478V9.736c0-1.058.196-1.637-.674-2.019a.7.7 0 0 1-.212-.345.71.71 0 0 1 .09-.54l.099-.148c.258-.385.642-.816 1.053-1.075L7.493 4.5c2.144 0 2.871 1.282 3.42 2.894.464 1.356.556 2.507.202 4.133.153.07.29.15.42.234 1.764 1.037 2.32 2.085 2.573 2.956.126.435.158.854.084 1.257-.042.22-.112.424-.216.602a.844.844 0 0 0-.258.461c-.042.203-.01.412.084.622.083.2.223.364.404.49.097.067.214.11.332.146.478.14.735.34.735.602 0 .285-.297.433-.761.433H7.493Z" />
                        <path d="M17.29 17.5c-.244 0-.49-.06-.71-.18l-.946-.5a.542.542 0 0 0-.6-.09.778.778 0 0 0-.58.74c0 .355.29.585.526.71.187.098.4.154.623.178.675.076 1.472-.08 2.227-.36.4-.148.86-.39 1.258-.664.12-.08.24-.17.358-.262.244-.2.43-.448.536-.723.1-.26.11-.53.05-.79a.834.834 0 0 0-.244-.476.953.953 0 0 0-.42-.207.728.728 0 0 0-.512.074.74.74 0 0 0-.493.585c-.045.203-.03.414.043.617.06.173.174.305.32.41.096.075.216.11.334.13.25.04.46.01.59-.06.27-.14.3-.36.19-.51a.66.66 0 0 0-.17-.18Zm.21-1.5a.732.732 0 0 0-.5-.19c-.18 0-.353.06-.5.18-.17.13-.26.29-.26.49 0 .21.1.4.28.52.19.12.4.18.63.18.23 0 .44-.06.63-.18.18-.12.28-.3.28-.52a.732.732 0 0 0-.5-.19Z" />
                      </svg>
                      {movie.likes} Likes
                    </p>
                  )}
                </div>
              </div>
              <div className="px-3 py-2">
                <h4 className="text-lg font-bold dark:text-textLight">{movie.title}</h4>
                <p className="text-sm text-gray-500 dark:text-footerText mb-1">{movie.genre}</p>
                {/* You can add language here if needed, but it's not in the reference image for recommended section */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
