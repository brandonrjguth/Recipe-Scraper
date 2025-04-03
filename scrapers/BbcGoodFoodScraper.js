"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping bbcgoodfood.com
 * @extends BaseScraper
 */
class BbcGoodFoodScraper extends BaseScraper {
  constructor(url) {
    super(url, "bbcgoodfood.com/recipes/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;


    //test parameters 
    //this.recipe.name = "test";
    //ingredients.push("test");
    //instructions.push("test");

    this.recipe.name = $("h1")
    .text().replace(/\s*{[^}]*}\s*/g, '');
    
    
    $(".ingredients-list__item")
      .each((i, el) => {
        ingredients.push(
          $(el)
            .text()
            .replace(" ,", ",")
        );
      });

      
    $(".method-steps__list-item")
      .find("p")
      .each((i, el) => {
        instructions.push($(el).text());
      });
      
  }
}

module.exports = BbcGoodFoodScraper;
