import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders Movie Picture Pipeline heading', () => {
  render(<App />);

  const heading = screen.getByRole('heading', {
    name: /Movie Picture Pipeline/i,
  });

  expect(heading).toBeInTheDocument();
});