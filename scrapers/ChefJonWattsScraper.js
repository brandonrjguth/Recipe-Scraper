"use strict";

const BaseScraper = require("../helpers/BaseScraper");

function titleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase());
  }

/**
 * Class for scraping cookieandkate.com
 * @extends BaseScraper
 */
class ChefJonWattsScraper extends BaseScraper {
  constructor(url) {
    super(url, "chefjonwatts.com/");
  }

  scrape($) {
    this.defaultSetImage($, $(".wprm-recipe-image").find("img").attr('src'));
    this.defaultSetDescription($, $(".wprm-recipe-summary").text());
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = $(".wprm-recipe-name").text();


    $(".wprm-recipe-ingredient")
      .each((i, el) => {
        ingredients.push($(el).text());
      });

    $(".wprm-recipe-instruction-text")
      .each((i, el) => {
        instructions.push($(el).text());
      });
  }
}

module.exports = ChefJonWattsScraper;
