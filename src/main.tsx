import { createRoot } from 'react-dom/client';
import App from './App';
import Auth0ProviderWithHistory from './authentication/auth-provider';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Router>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>
);
