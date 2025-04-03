"use strict";

const BaseScraper = require("../helpers/BaseScraper");

function titleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase());
  }

/**
 * Class for scraping cookieandkate.com
 * @extends BaseScraper
 */
class TamingTwinsScraper extends BaseScraper {
  constructor(url) {
    super(url, "tamingtwins.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = titleCase($("h1")
      .text().replace(/\s*{[^}]*}\s*/g, ''));

    $(".wprm-recipe-ingredient")
      .each((i, el) => {
        const ingredientText = $(el)
          .find(".wprm-recipe-ingredient-amount, .wprm-recipe-ingredient-unit, .wprm-recipe-ingredient-name, .wprm-recipe-ingredient-notes")
          .map((_, span) => $(span).text())
          .get()
          .join(" ");
        ingredients.push(ingredientText.trim());
    });

    $(".wprm-recipe-instruction-text")
      .find("span")
      .each((i, el) => {
        instructions.push($(el).text());
      });
  }
}

module.exports = TamingTwinsScraper;
