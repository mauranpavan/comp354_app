import { render, screen } from '@testing-library/react';
import WSVApp from './wsv';

test('renders learn react link', () => {
  render(<WSVApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
