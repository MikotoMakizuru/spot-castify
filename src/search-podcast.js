import SpotifyWebApi from "spotify-web-api-node";
import Conf from "conf";
import Enquirer from "enquirer";
import { categories } from "./category-data.js";

const config = new Conf({ projectName: "spot-castify" });

const accessToken = config.get("access_token");
const refreshToken = config.get("refresh_token");

const spotifyApi = new SpotifyWebApi({
  clientId: config.get("clientId"),
  clientSecret: config.get("clientSecret"),
});

const searchPodcast = async () => {
  if (!accessToken && !refreshToken) {
    console.log(
      "<Default> Here are some podcast recommendations from Spotify. Note: Require 'spot-castify settoken' command before the first time you run.",
    );
    process.exit(1);
  }

  spotifyApi.setAccessToken(accessToken);

  await callApi();
  const podcasts = await getRecommendPodcast();
  console.log("Recommended Podcasts for you!");
  podcasts.forEach((podcast) => {
    console.log(`Selected Podcast Name: ${podcast.name}`);
    console.log(`URL: ${podcast.external_urls.spotify}\n`);
  });
};

const getRecommendPodcast = async () => {
  const categoryNames = categories.map((category) => ({
    title: category.name,
    value: category,
  }));

  const categoryQuestion = {
    type: "select",
    name: "category",
    message: "Which category?",
    choices: categoryNames,
    result() {
      return this.focused.value;
    },
  };

  const categoryAnswer = await Enquirer.prompt(categoryQuestion);
  const category = categories.find(
    (category) => category.id === categoryAnswer.category.id,
  );

  const genreNames = category.genres.map((genre) => ({
    title: genre,
  }));

  const genreQuestion = {
    type: "select",
    name: "genre",
    message: `Choose your favorite genre from ${category.name}:`,
    choices: genreNames,
  };

  const genreAnswer = await Enquirer.prompt(genreQuestion);

  const searchResponse = await spotifyApi.searchShows(genreAnswer.genre, {
    limit: 10,
  });
  const podcasts = searchResponse.body.shows.items;
  const selectedPodcasts = [];

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * podcasts.length);
    selectedPodcasts.push(podcasts[randomIndex]);
    podcasts.splice(randomIndex, 1);
  }

  return selectedPodcasts;
};

const callApi = async () => {
  try {
    await spotifyApi.getMe();
  } catch (error) {
    if (
      error.body.error.status === 401 &&
      error.body.error.message === "The access token expired"
    ) {
      await refreshAccessToken();
    }
    throw new Error(error);
  }
};

const refreshAccessToken = async () => {
  spotifyApi.setRefreshToken(refreshToken);
  try {
    const data = await spotifyApi.refreshAccessToken();
    config.set("access_token", data.body.access_token);
    spotifyApi.setAccessToken(data.body.access_token);
  } catch (error) {
    throw new Error(error);
  }
};

export default searchPodcast;
