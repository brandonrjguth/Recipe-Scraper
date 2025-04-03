"use strict";

const BaseScraper = require("../helpers/BaseScraper");

function titleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase());
  }

/**

 * @extends BaseScraper
 */
class AllRecipesScraper extends BaseScraper {
  constructor(url) {
    super(url, "allrecipes.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = titleCase($("h1")
      .text().replace(/\s*{[^}]*}\s*/g, ''));

      //instructions.push("first")
      $(".mm-recipes-structured-ingredients__list-item p").each((i, el) => {
        ingredients.push($(el).text().trim());
      });

      $(".mntl-sc-block-group--LI .mntl-sc-block-html").each((i, el) => {
        const text = $(el).text().trim();
        console.log(text);
        instructions.push(text);
      });
      
  }
}

module.exports = AllRecipesScraper;
