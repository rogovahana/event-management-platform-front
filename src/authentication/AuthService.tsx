import auth0 from 'auth0-js';
import config from '../../auth_config.json';

interface AuthResult {
  accessToken: string;
  idToken: string;
  expiresIn: number;
}

class AuthService {
  private auth0: auth0.WebAuth;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: config.domain,
      clientID: config.clientId,
      redirectUri: `${window.location.origin}/callback`,
      audience: config.audience,
      responseType: 'token id_token',
      scope: 'openid profile email'
    });
  }

  // Initiates login
  login = (): void => {
    this.auth0.authorize();
  };

  signup = (): void => {
    this.auth0.authorize({ screen_hint: 'signup' });
  };

  // Handles authentication callback
  handleAuthentication = (callback: () => void): void => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const idToken = params.get('id_token');
      const expiresIn = params.get('expires_in');

      if (accessToken && idToken) {
        const authResult: AuthResult = {
          accessToken: accessToken,
          idToken: idToken,
          expiresIn: expiresIn ? parseInt(expiresIn, 10) : 0
        };

        this.setSession(authResult);
        window.history.replaceState({}, document.title, window.location.pathname);
        callback();
      } else {
        console.error('Failed to get tokens from URL');
      }
    } else {
      console.error('No hash found in URL');
    }
  };

  // Stores tokens in session storage
  setSession = (authResult: AuthResult): void => {
    sessionStorage.setItem('accessToken', authResult.accessToken);
    sessionStorage.setItem('idToken', authResult.idToken);
    sessionStorage.setItem('expiresAt', JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime()));
  };

  // Logs out the user
  logout = (): void => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('idToken');
    sessionStorage.removeItem('expiresAt');
    this.auth0.logout({
      returnTo: config.redirectUri
    });
  };

  // Checks if the user is authenticated
  isAuthenticated = (): boolean => {
    const expiresAt = JSON.parse(sessionStorage.getItem('expiresAt') || '0');
    return new Date().getTime() < expiresAt;
  };

  // Gets the access token from session storage
  getAccessToken = (): string | null => {
    return sessionStorage.getItem('accessToken');
  };

  // Gets the ID token from session storage
  getIdToken = (): string | null => {
    return sessionStorage.getItem('idToken');
  };
}

const authService = new AuthService();
export default authService;