import { IMovie } from '../../models/Movie';

export let testData: IMovie[] = [
    { Title: "Inception", imdbID: "tt1375666", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMmZjZWE5YjItZjM0Mi00Zjk0LWE2MDgtZDE2NjBlYzI2NjM5XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg", Year: "2010" },
    { Title: "Interstellar", imdbID: "tt0816692", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMjIxNTU4MzYzOF5BMl5BanBnXkFtZTgwNTU0OTAzNzE@._V1_SX300.jpg", Year: "2014" },
    { Title: "The Dark Knight", imdbID: "tt0468569", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMzYzMw@@._V1_SX300.jpg", Year: "2008" },
];

export const getData = async (): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (testData.length > 0) {
      resolve(testData);
    } else {
      reject("Couldn't find a match");
    }
  });
};