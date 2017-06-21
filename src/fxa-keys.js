const fxaKeyUtils = new FxaCryptoRelier.KeyUtils();

const FXA_OAUTH_SERVER = 'http://127.0.0.1:9010';
const REDIRECT_URL = browser.identity.getRedirectURL();
const CLIENT_ID = 'c6d74070a481bc10';
const SCOPES = ['profile https://identity.mozilla.org/apps/notes'];
const AUTH_URL =
  `${FXA_OAUTH_SERVER}/v1/authorization
?client_id=${CLIENT_ID}
&state=state
&redirect_uri=${encodeURIComponent(REDIRECT_URL)}
&scope=${encodeURIComponent(SCOPES.join(' '))}`;
const TOKEN_URL = `${FXA_OAUTH_SERVER}/v1/token`;


function handleAuthentication() {
  return fxaKeyUtils.createApplicationKeyPair()
    .then((keyTypes) => {
      // ...
      // make an oauth web auth flow
      return browser.identity.launchWebAuthFlow({
        interactive: true,
        // client_id
        url: `${AUTH_URL}&keys_jwk=${keyTypes.base64JwkPublicKey}`
      });
    })


}
