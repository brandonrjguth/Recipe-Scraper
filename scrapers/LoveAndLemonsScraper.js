"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping loveandlemons.com
 * @extends BaseScraper
 */
class LoveAndLemonsScraper extends BaseScraper {
  constructor(url) {
    super(url, "loveandlemons.com/");
  }

  scrape($) {
    this.defaultSetImage($, $(".entry-content img").first().attr("src"));
    this.defaultSetDescription($, $(".entry-content p").first().text());
    const { ingredients, instructions } = this.recipe;
    this.recipe.name = $(".entry-content h1, .entry-content h2").first().text();

    $(".wprm-recipe-ingredient, .entry-content .wprm-recipe-ingredients-list li, .entry-content .ingredients li")
      .each((i, el) => {
        ingredients.push($(el).text());
      });

    $(".wprm-recipe-instruction-text, .entry-content .wprm-recipe-instructions-list li, .entry-content .instructions li")
      .each((i, el) => {
        instructions.push($(el).text());
      });
  }
}

module.exports = LoveAndLemonsScraper;
