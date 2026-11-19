// Signup.js - Pure React Component WITHOUT JSX
// Uses React.createElement() to build the UI

function Signup(props) {
  const onSwitchToLogin = props.onSwitchToLogin;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState({ text: '', type: '' });
  const [loading, setLoading] = React.useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!email || !password) {
      setMessage({ text: 'Please fill in both email and password.', type: 'error' });
      return;
    }

    if (password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      // Success
      setMessage({
        text: data.message || 'Registration successful! Redirecting to login...',
        type: 'success'
      });
      setEmail('');
      setPassword('');

      // Automatically transition to login after 1.5 seconds
      setTimeout(() => {
        if (onSwitchToLogin) onSwitchToLogin();
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({
        text: error.message || 'Something went wrong. Please check if backend is running.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Build the component tree using React.createElement() (NO JSX)
  return React.createElement(
    'div',
    { className: 'auth-card' },

    // Card Header
    React.createElement('h2', { className: 'auth-title' }, 'Sign Up'),
    React.createElement('p', { className: 'auth-subtitle' }, 'Create an account to get started'),

    // Feedback message (if any)
    message.text
      ? React.createElement(
          'div',
          { className: `auth-alert ${message.type}` },
          message.text
        )
      : null,

    // Sign Up Form
    React.createElement(
      'form',
      { onSubmit: handleSubmit, className: 'auth-form' },

      // Email field
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('label', { htmlFor: 'signup-email' }, 'Email'),
        React.createElement('input', {
          id: 'signup-email',
          type: 'email',
          required: true,
          placeholder: 'name@example.com',
          value: email,
          onChange: (e) => setEmail(e.target.value)
        })
      ),

      // Password field
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('label', { htmlFor: 'signup-password' }, 'Password'),
        React.createElement('input', {
          id: 'signup-password',
          type: 'password',
          required: true,
          placeholder: 'At least 6 characters',
          value: password,
          onChange: (e) => setPassword(e.target.value)
        })
      ),

      // Submit Button
      React.createElement(
        'button',
        {
          type: 'submit',
          className: 'btn btn-primary',
          disabled: loading
        },
        loading ? 'Creating Account...' : 'Sign Up'
      )
    ),

    // Footer link: Already a member? Log In
    React.createElement(
      'div',
      { className: 'auth-footer' },
      'Already a member? ',
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'link-btn',
          onClick: onSwitchToLogin
        },
        'Log In'
      )
    )
  );
}

// Make accessible to window
window.Signup = Signup;
