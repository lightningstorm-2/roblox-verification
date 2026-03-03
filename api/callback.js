export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No code provided.");
  }

  const redirectUri = `https://${req.headers.host}/api/callback`;

  // Exchange code for token
  const tokenResponse = await fetch(
    "https://apis.roblox.com/oauth/v1/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.ROBLOX_CLIENT_ID,
        client_secret: process.env.ROBLOX_CLIENT_SECRET,
        redirect_uri: redirectUri,
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return res.status(400).send("Failed to get access token.");
  }

  // Get user info
  const userResponse = await fetch(
    "https://apis.roblox.com/oauth/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    }
  );

  const userData = await userResponse.json();

  res.send(`
    <h1>Logged In Successfully</h1>
    <p><strong>Username:</strong> ${userData.preferred_username}</p>
    <p><strong>User ID:</strong> ${userData.sub}</p>
  `);
}