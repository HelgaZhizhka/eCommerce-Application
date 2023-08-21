import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/LoginForm/LoginForm';

describe('LoginForm', () => {
  it('should render without errors', () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
  });

  it('should display validation error for invalid email format', async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    userEvent.type(emailInput, 'invalid-email');
    userEvent.type(passwordInput, 'ValidPassword123');
    fireEvent.click(signInButton);

    const emailError = await screen.findByText('Invalid email address');
    expect(emailError).toBeInTheDocument();
  });

  it('should display validation error for too short password', async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    userEvent.type(emailInput, 'valid@example.com');
    userEvent.type(passwordInput, 'Short1');
    fireEvent.click(signInButton);

    const passwordError = await screen.findByText('Password must be at least 8 characters long.');
    expect(passwordError).toBeInTheDocument();
  });
});
