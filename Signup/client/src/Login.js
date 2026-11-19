// Login.js - Pure React Component WITHOUT JSX
// Uses React.createElement() to build the UI

function Login(props) {
  const onSwitchToSignup = props.onSwitchToSignup;
  const onLoginSuccess = props.onLoginSuccess;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState({ text: '', type: '' });
  const [loading, setLoading] = React.useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!email || !password) {
      setMessage({ text: 'Please enter both email and password.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      // Success
      setMessage({
        text: data.message || 'Login successful!',
        type: 'success'
      });

      // Pass user info to parent component
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 800);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({
        text: error.message || 'Something went wrong. Please check your credentials.',
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
    React.createElement('h2', { className: 'auth-title' }, 'Log In'),
    React.createElement('p', { className: 'auth-subtitle' }, 'Welcome back! Please enter your details'),

    // Feedback message (if any)
    message.text
      ? React.createElement(
          'div',
          { className: `auth-alert ${message.type}` },
          message.text
        )
      : null,

    // Login Form
    React.createElement(
      'form',
      { onSubmit: handleSubmit, className: 'auth-form' },

      // Email field
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('label', { htmlFor: 'login-email' }, 'Email'),
        React.createElement('input', {
          id: 'login-email',
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
        React.createElement('label', { htmlFor: 'login-password' }, 'Password'),
        React.createElement('input', {
          id: 'login-password',
          type: 'password',
          required: true,
          placeholder: 'Enter your password',
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
        loading ? 'Logging In...' : 'Log In'
      )
    ),

    // Footer link: Switch to Sign Up
    React.createElement(
      'div',
      { className: 'auth-footer' },
      "Don't have an account? ",
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'link-btn',
          onClick: onSwitchToSignup
        },
        'Sign Up'
      )
    )
  );
}

// Make accessible to window
window.Login = Login;
