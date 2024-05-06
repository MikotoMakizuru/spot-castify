import SpotifyWebApi from "spotify-web-api-node";
import pkg from "enquirer";
import express from "express";
import Conf from "conf";

const { Form } = pkg;
const config = new Conf({ projectName: "spot-castify" });

const scopes = ["user-read-playback-position"];

const questionClientId = new Form({
  type: "input",
  name: "clientId",
  message: "Please setting your Client ID:",
  choices: [{ name: "clientId", message: "Client ID（required）" }],
  validate: (input) => (input ? true : "Client ID is required"),
});

const questionClientSecret = new Form({
  type: "input",
  name: "clientSecret",
  message: "Please setting your Client secret:",
  choices: [{ name: "clientSecret", message: "Client secret（required）" }],
  validate: (input) => (input ? true : "Client Secret is required"),
});

async function setToken() {
  const clientIdAnswer = await questionClientId.run();
  const clientSecretAnswer = await questionClientSecret.run();
  config.set("clientId", clientIdAnswer.clientId);
  config.set("clientSecret", clientSecretAnswer.clientSecret);

  const spotifyApi = new SpotifyWebApi({
    clientId: config.get("clientId"),
    clientSecret: config.get("clientSecret"),
    redirectUri: "http://localhost:8888/callback",
  });

  const app = express();

  app.get("/login", (_req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });

  app.get("/callback", (req, res) => {
    const error = req.query.error;
    const code = req.query.code;

    if (error) {
      console.error("Callback Error:", error);
      res.send(`Callback Error: ${error}`);
      return;
    }

    spotifyApi.authorizationCodeGrant(code).then((data) => {
      config.set("access_token", data.body.access_token);
      config.set("refresh_token", data.body.refresh_token);

      res.send("Success! You can now close the window.");
      console.log(
        "Successfully retrieved access token! You can start 'spot-castify'! with 'spot-castify' command."
      );

      server.close();
      process.exit(0);
    });
  });

  const server = app.listen(8888, () =>
    console.log(
      "HTTP Server up. Now go to http://localhost:8888/login in your browser."
    )
  );
}

export default setToken;
