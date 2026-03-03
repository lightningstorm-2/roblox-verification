export default function handler(req, res) {
  const clientId = process.env.ROBLOX_CLIENT_ID;

  const redirectUri = `https://${req.headers.host}/api/callback`;

  const url =
    `https://apis.roblox.com/oauth/v1/authorize?` +
    `client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&scope=openid profile`;

  res.redirect(url);
}