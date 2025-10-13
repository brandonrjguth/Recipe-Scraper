"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping loveandlemons.com
 * @extends BaseScraper
 */
class LoveAndLemonsBroccoliCheddarScraper extends BaseScraper {
  constructor(url) {
    super(url, "loveandlemons.com/");
  }

  scrape($) {
    this.recipe.name = $("h1.entry-title").text().trim();
    this.defaultSetDescription($, $(".entry-content > p").first().text().trim());
    this.defaultSetImage($, $(".post-thumbnail img").attr("src"));

    const { ingredients, instructions } = this.recipe;

    $(".wprm-recipe-ingredient").each((i, el) => {
      ingredients.push($(el).text().trim());
    });

    $(".wprm-recipe-instruction-text").each((i, el) => {
      instructions.push($(el).text().trim());
    });
  }
}

module.exports = LoveAndLemonsBroccoliCheddarScraper;
