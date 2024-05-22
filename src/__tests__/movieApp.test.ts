import { createHtml } from '../ts/htmlFunctions';
import { IMovie } from '../ts/models/Movie';
import { displayNoResult, handleSubmit, init } from '../ts/movieApp';
import { getData } from '../ts/services/movieService';

jest.mock('../ts/services/movieService', () => ({
  getData: jest.fn(),
}));

const mockGetData = getData as jest.MockedFunction<typeof getData>;

describe('handleSubmit', () => {
  let searchText: HTMLInputElement;
  let movieContainer: HTMLDivElement;
  let form: HTMLFormElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="searchForm">
        <input id="searchText" type="text" />
        <button type="submit">Search</button>
      </form>
      <div id="movie-container"></div>
    `;

    searchText = document.getElementById('searchText') as HTMLInputElement;
    movieContainer = document.getElementById('movie-container') as HTMLDivElement;
    form = document.getElementById('searchForm') as HTMLFormElement;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSubmit();
    });

    init();
  });

  test('it should display movies when getData returns results', async () => {
    const movies: IMovie[] = [
      { Title: 'Inception', imdbID: 'tt1375666', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMmZjZWE5YjItZjM0Mi00Zjk0LWE2MDgtZDE2NjBlYzI2NjM5XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg', Year: '2010' },
    ];
    mockGetData.mockResolvedValueOnce(movies);
    searchText.value = 'Inception';

    form.dispatchEvent(new Event('submit'));

    await new Promise(process.nextTick);

    expect(movieContainer.innerHTML).toContain('Inception');
    expect(movieContainer.querySelector('img')?.src).toBe('https://m.media-amazon.com/images/M/MV5BMmZjZWE5YjItZjM0Mi00Zjk0LWE2MDgtZDE2NjBlYzI2NjM5XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg');
  });

  test('it should not display result message when getData returns no results', async () => {
    mockGetData.mockResolvedValueOnce([]);
    searchText.value = 'NonExistentMovie';

    form.dispatchEvent(new Event('submit'));

    await new Promise(process.nextTick);

    expect(movieContainer.innerHTML).toContain('Inga sökresultat att visa');
  });

  test('it should not display result message when getData throws an error', async () => {
    mockGetData.mockRejectedValueOnce(new Error('API error'));
    searchText.value = 'ErrorMovie';

    form.dispatchEvent(new Event('submit'));

    await new Promise(process.nextTick);

    expect(movieContainer.innerHTML).toContain('Inga sökresultat att visa');
  });
});


describe('createHtml', () => {
  test('it should append movie elements to container correctly', () => {
    const container = document.createElement('div');
    const movies: IMovie[] = [
      { Title: 'Inception', imdbID: 'tt1375666', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMmZjZWE5YjItZjM0Mi00Zjk0LWE2MDgtZDE2NjBlYzI2NjM5XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg', Year: '2010' },
      { Title: 'Interstellar', imdbID: 'tt0816692', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMjIxNTU4MzYzOF5BMl5BanBnXkFtZTgwNTU0OTAzNzE@._V1_SX300.jpg', Year: '2014' },
      { Title: 'The Dark Knight', imdbID: 'tt0468569', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMzYzMw@@._V1_SX300.jpg', Year: '2008' },
    ];

    createHtml(movies, container);

    expect(container.innerHTML).toContain('Inception');
    expect(container.querySelector('img')?.src).toBe('https://m.media-amazon.com/images/M/MV5BMmZjZWE5YjItZjM0Mi00Zjk0LWE2MDgtZDE2NjBlYzI2NjM5XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg');
  });
});

describe('displayNoResult', () => {
  test('it should display no result message', () => {
    const container = document.createElement('div');

    displayNoResult(container);

    expect(container.innerHTML).toContain('Inga sökresultat att visa');
  });
});