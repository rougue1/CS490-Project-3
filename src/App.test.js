/*eslint-disable */
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  //making sure login page is working
  const linkElement = screen.getByText('Login with Google');
  expect(linkElement).toBeInTheDocument(); 
  // fireEvent.click(linkElement);

  // //making sure homepage is working
  // const greeting = screen.getByText("Amount");
  // expect(greeting).toBeInTheDocument();
});
