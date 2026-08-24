import { fireEvent, render, screen } from '@testing-library/react';
import MovieList from '../MovieList';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          movies: [
            {
              id: 123,
              title: 'Top Gun: Maverick',
            },
            {
              id: 456,
              title: 'Sonic the Hedgehog',
            },
            {
              id: 789,
              title: 'A Quiet Place',
            },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders movie titles', async () => {
  render(<MovieList onSelectMovie={jest.fn()} />);

  const movie1 = await screen.findByText('Top Gun: Maverick');
  const movie2 = await screen.findByText('Sonic the Hedgehog');
  const movie3 = await screen.findByText('A Quiet Place');

  expect(movie1).toBeInTheDocument();
  expect(movie2).toBeInTheDocument();
  expect(movie3).toBeInTheDocument();
});

test('calls onSelectMovie when movie details button is clicked', async () => {
  const onSelectMovie = jest.fn();

  render(<MovieList onSelectMovie={onSelectMovie} />);

  const buttons = await screen.findAllByRole('button', {
    name: /Click for details/i,
  });

  fireEvent.click(buttons[0]);

  expect(onSelectMovie).toHaveBeenCalledWith({
    id: 123,
    title: 'Top Gun: Maverick',
  });
});