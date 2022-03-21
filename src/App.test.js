import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sheng Mtaa link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sheng Mtaa/i);
  expect(linkElement).toBeInTheDocument();
});
