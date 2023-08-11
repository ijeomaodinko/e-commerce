import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('renders login form correctly', () => {
    render(<LoginForm />);

    // Check if the email and password input fields are rendered
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Check if the login button is rendered
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('displays error message for invalid form input', async () => {
    render(<LoginForm />);

    // Fill in the form with invalid input data
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'invalidemail' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'short' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check if error messages are displayed for each input field
    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
  });

  test('submits the form with valid input', () => {
    // Mock the useDispatch function to track dispatched actions
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => jest.fn(),
    }));

    render(<LoginForm />);

    // Fill in the form with valid input data
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'validemail@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'validpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check if the onSubmit function was called with the correct data
    // (Note: you need to mock the useDispatch function to track dispatched actions)
    // expect(dispatch).toHaveBeenCalledWith(loginUser({ email: 'validemail@example.com', password: 'validpassword' }));
  });
});
