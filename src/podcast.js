import SpotifyWebApi from "spotify-web-api-node";
import Conf from "conf";
import PodcastView from "./podcast-view.js";

const config = new Conf({ projectName: "spot-castify" });
const podcastView = new PodcastView();

export default class Podcast {
  constructor() {
    this.accessToken = config.get("access_token");
    this.refreshToken = config.get("refresh_token");
    this.spotifyApi = new SpotifyWebApi({
      clientId: config.get("clientId"),
      clientSecret: config.get("clientSecret"),
    });
  }

  async search() {
    await podcastView.hasToken();

    this.spotifyApi.setAccessToken(this.accessToken);
    await this.callApi();

    const podcasts = await this.getRecommendPodcast();
    await podcastView.displayPodcasts(podcasts);
  }

  async getRecommendPodcast() {
    try {
      const interested = await podcastView.askCategoryAndGenre();
      const searchResponse = await this.spotifyApi.searchShows(interested, {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async callApi() {
    try {
      await this.spotifyApi.getMe();
    } catch (error) {
      if (
        error.body.error.status === 401 &&
        error.body.error.message === "The access token expired"
      ) {
        await this.refreshAccessToken();
        await this.callApi();
        return;
      }
      throw new Error(error);
    }
  }

  async refreshAccessToken() {
    this.spotifyApi.setRefreshToken(this.refreshToken);
    try {
      const data = await this.spotifyApi.refreshAccessToken();
      config.set("access_token", data.body.access_token);
      this.spotifyApi.setAccessToken(data.body.access_token);
    } catch (error) {
      throw new Error(error);
    }
  }
}
