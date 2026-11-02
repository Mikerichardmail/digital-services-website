import { google } from 'googleapis';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CREDENTIALS_PATH = path.join(ROOT_DIR, 'oauth-credentials.json');
const TOKEN_PATH = path.join(ROOT_DIR, 'token.json');

const SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/webmasters'
];

const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

export async function getOAuth2Client() {
  const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
  const credentials = JSON.parse(content);
  const info = credentials.web || credentials.installed;
  return new google.auth.OAuth2(info.client_id, info.client_secret, REDIRECT_URI);
}

export async function generateAuthUrl() {
  const oAuth2Client = await getOAuth2Client();
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES
  });
}

export async function exchangeCode(code) {
  const oAuth2Client = await getOAuth2Client();
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2), 'utf8');
  console.log('✅ Token successfully saved to token.json');
  return tokens;
}

// If executed directly from command line
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const manualCode = process.argv[2];
  
  if (manualCode) {
    let cleanCode = manualCode;
    if (cleanCode.includes('code=')) {
      try {
        const u = new URL(cleanCode.startsWith('http') ? cleanCode : `http://localhost/?${cleanCode}`);
        cleanCode = u.searchParams.get('code');
      } catch (e) {
        // use as is
      }
    }
    console.log('Exchanging authorization code for tokens...');
    exchangeCode(cleanCode)
      .then(() => {
        console.log('AUTH_COMPLETE: SUCCESS');
        process.exit(0);
      })
      .catch((err) => {
        console.error('AUTH_COMPLETE: ERROR', err.message);
        process.exit(1);
      });
  } else {
    generateAuthUrl().then((url) => {
      console.log('\n================ AUTHORIZATION REQUIRED ================');
      console.log('Please open this link in your browser:');
      console.log(url);
      console.log('========================================================\n');
      console.log('Listening for callback on http://localhost:3000/oauth2callback ...');

      const server = http.createServer(async (req, res) => {
        try {
          const reqUrl = new URL(req.url, 'http://localhost:3000');
          if (reqUrl.pathname === '/oauth2callback') {
            const code = reqUrl.searchParams.get('code');
            const error = reqUrl.searchParams.get('error');

            if (error) {
              res.writeHead(400, { 'Content-Type': 'text/html' });
              res.end(`<h1>Authorization Failed</h1><p>${error}</p>`);
              console.error('OAuth Callback Error:', error);
              server.close();
              process.exit(1);
              return;
            }

            if (code) {
              await exchangeCode(code);
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(`
                <div style="font-family: sans-serif; text-align: center; padding: 40px;">
                  <h1 style="color: #16a34a;">✅ Authorization Successful!</h1>
                  <p>Your Search Console token has been saved to <strong>token.json</strong>.</p>
                  <p>You can close this tab now and return to Antigravity.</p>
                </div>
              `);
              console.log('AUTH_COMPLETE: SUCCESS');
              server.close();
              process.exit(0);
              return;
            }
          }
          res.writeHead(404);
          res.end('Not found');
        } catch (err) {
          console.error('Error handling callback:', err);
          res.writeHead(500);
          res.end('Server error');
        }
      });

      server.listen(3000, () => {
        console.log('Local receiver server ready on port 3000.');
      });

      // Auto close after 5 minutes
      setTimeout(() => {
        console.log('OAuth server timed out after 5 minutes.');
        server.close();
        process.exit(0);
      }, 300000);
    });
  }
}
