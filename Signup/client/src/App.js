// App.js - Main Application Component WITHOUT JSX
// Coordinates between Signup, Login, and Dashboard views

function App() {
  // Current view: 'signup', 'login', or 'dashboard'
  const [currentView, setCurrentView] = React.useState('signup');
  const [currentUser, setCurrentUser] = React.useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  // If user is logged in, display the Dashboard / Welcome card
  if (currentView === 'dashboard' && currentUser) {
    return React.createElement(
      'div',
      { className: 'app-container' },
      React.createElement(
        'div',
        { className: 'auth-card' },
        React.createElement(
          'div',
          { className: 'user-badge' },
          '✓ Active Session'
        ),
        React.createElement('h2', { className: 'auth-title' }, 'Welcome!'),
        React.createElement(
          'p',
          { className: 'auth-subtitle' },
          'You are successfully authenticated.'
        ),
        React.createElement(
          'div',
          { className: 'user-profile-box' },
          React.createElement('span', { className: 'label' }, 'Logged in as:'),
          React.createElement('strong', { className: 'user-email' }, currentUser.email)
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'btn btn-secondary',
            onClick: handleLogout
          },
          'Log Out'
        )
      )
    );
  }

  // Otherwise render either Signup or Login component
  return React.createElement(
    'div',
    { className: 'app-container' },
    currentView === 'signup'
      ? React.createElement(window.Signup || Signup, {
          onSwitchToLogin: () => setCurrentView('login')
        })
      : React.createElement(window.Login || Login, {
          onSwitchToSignup: () => setCurrentView('signup'),
          onLoginSuccess: handleLoginSuccess
        })
  );
}

// Mount React application into #root element
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
}
