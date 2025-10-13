"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping natashaskitchen.com
 * @extends BaseScraper
 */
class NatashasKitchenScraper extends BaseScraper {
  constructor(url) {
    super(url, "natashaskitchen.com/");
  }

  scrape($) {
    this.defaultSetImage($, $(".wp-block-image img").first().attr("src"));
    this.defaultSetDescription($, $("wprm-recipe-summary").text().trim());
    this.recipe.name = $(".wprm-recipe-name").text().trim();

    const { ingredients, instructions } = this.recipe;

    $(".wprm-recipe-ingredient").each((i, el) => {
      ingredients.push($(el).text().trim());
    });

    $(".wprm-recipe-instruction-text").each((i, el) => {
      instructions.push($(el).text().trim());
    });
    }
  
}

module.exports = NatashasKitchenScraper;
