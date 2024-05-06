#!/usr/bin/env node

import { program } from "commander";
import setToken from "./src/set-token.js";
import searchPodcast from "./src/search-podcast.js";

const onFatalError = () => {
  process.exitCode = 2;
  console.error("Oops! Something went wrong! :(");
};

async function main() {
  process.on("uncaughtException", onFatalError);
  process.on("unhandledRejection", onFatalError);

  program
    .command("searchPodcast", { isDefault: true })
    .description(
      "<Default> Here are some podcast recommendations from spotify. Note:Require 'spot-castify settoken' command before the first time you run.",
    )
    .action(() => searchPodcast());
  program
    .command("settoken")
    .description(
      "Login Spotify via authorization code flow (Refer: https://developer.spotify.com/documentation/general/guides/authorization-guide/).",
    )
    .action(() => setToken());
  program.parse();
}

main();
