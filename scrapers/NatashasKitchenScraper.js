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
    this.defaultSetImage($, $("figure.wp-block-image img").first().attr("src"));
    this.defaultSetDescription($, $("div.entry-content p").first().text());
    this.recipe.name = $("h1.entry-title").text().trim();

    const { ingredients, instructions } = this.recipe;

    // Ingredients
    $("section.wprm-recipe-ingredients ul li, .wprm-recipe-ingredient, .wp-block-ingredients li, .wprm-ingredient").each((i, el) => {
      // Fallback through matching selectors for various recipe layouts
      let text = $(el).text().replace(/\s+/g, " ").trim();
      if (text) ingredients.push(text);
    });

    // If above did not find (classic Natasha’s layout) try recipe box after heading "Ingredients"
    if (ingredients.length === 0) {
      $("h3:contains('Ingredients') + ul li").each((i, el) => {
        let text = $(el).text().replace(/\s+/g, " ").trim();
        if (text) ingredients.push(text);
      });
    }

    // Instructions
    $("section.wprm-recipe-instructions ul li, .wprm-recipe-instruction, .wp-block-instructions li, .wprm-instruction").each((i, el) => {
      let text = $(el).text().replace(/\s+/g, " ").trim();
      if (text) instructions.push(text);
    });

    // If above did not find (classic Natasha’s layout) try recipe box after heading "Instructions"
    if (instructions.length === 0) {
      $("h3:contains('Instructions')").nextUntil("h3, h2").find("li").each((i, el) => {
        let text = $(el).text().replace(/\s+/g, " ").trim();
        if (text) instructions.push(text);
      });
    }
  }
}

module.exports = NatashasKitchenScraper;
