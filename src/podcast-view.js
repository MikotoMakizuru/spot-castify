import Enquirer from "enquirer";
import { categories } from "./category-data.js";
import Podcast from "./podcast.js";

export default class PodcastView {
  async askCategoryAndGenre() {
    try {
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

      return genreAnswer.genre;
    } catch (error) {
      throw new Error(error);
    }
  }

  async hasToken() {
    const podcast = new Podcast();
    if (!podcast.accessToken && !podcast.refreshToken) {
      console.log(
        "<Default> Here are some podcast recommendations from Spotify. Note: Require 'spot-castify settoken' command before the first time you run.",
      );
      process.exit(1);
    }
  }

  async displayPodcasts(podcasts) {
    console.log("Recommended Podcasts for you!");
    podcasts.forEach((podcast) => {
      console.log(`Selected Podcast Name: ${podcast.name}`);
      console.log(`URL: ${podcast.external_urls.spotify}\n`);
    });
  }
}
