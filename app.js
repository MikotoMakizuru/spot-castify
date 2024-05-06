#!/usr/bin/env node

import { program } from "commander";
import AccessToken from "./src/access-token.js";
import Podcast from "./src/podcast.js";

const onFatalError = () => {
  process.exitCode = 2;
  console.error("Oops! Something went wrong! :(");
};

async function main() {
  process.on("uncaughtException", onFatalError);
  process.on("unhandledRejection", onFatalError);

  const podcast = new Podcast();
  const accessToken = new AccessToken();

  program
    .command("searchPodcast", { isDefault: true })
    .description(
      "<Default> Here are some podcast recommendations from spotify. Note:Require 'spot-castify settoken' command before the first time you run.",
    )
    .action(() => podcast.search());
  program
    .command("settoken")
    .description(
      "Login Spotify via authorization code flow (Refer: https://developer.spotify.com/documentation/general/guides/authorization-guide/).",
    )
    .action(() => accessToken.get());
  program.parse();
}

main();
