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
    // Name
    const name = $("h1.entry-title").first().text().trim();
    this.recipe.name = name;

    // Description
    const description = $("div.wprm-recipe-summary, .entry-content > p").first().text().trim();
    this.recipe.description = description;

    // Image
    const image =
      $("div.wprm-recipe-image img").attr("src") ||
      $("meta[property='og:image']").attr("content") ||
      $("figure.wp-block-image img").first().attr("src");
    this.defaultSetImage($, image);

    // Ingredients
    $(".wprm-recipe-ingredient, .wprm-recipe-ingredients ul li, .wprm-recipe-ingredient-name, .wprm-recipe-ingredient-text")
      .each((i, el) => {
        const ingredient = $(el).text().trim();
        if (ingredient.length > 0) {
          this.recipe.ingredients.push(ingredient);
        }
      });
    // Fallback: Ingredients as listed in block inside entry-content or by strong or li under Ingredients section
    if (this.recipe.ingredients.length === 0) {
      $("h3:contains('Ingredients'), h2:contains('Ingredients')")
        .nextAll("ul").first().find("li")
        .each((i, el) => {
          const ingredient = $(el).text().trim();
          if (ingredient.length > 0) {
            this.recipe.ingredients.push(ingredient);
          }
        });
    }

    // Instructions
    $(".wprm-recipe-instruction-text, .wprm-recipe-instruction, .wprm-recipe-instructions ol li")
      .each((i, el) => {
        const instruction = $(el).text().trim();
        if (instruction.length > 0) {
          this.recipe.instructions.push(instruction);
        }
      });
    // Fallback: Instructions under first "Instructions" heading, then all immediately following li elements
    if (this.recipe.instructions.length === 0) {
      $("h3:contains('Instructions'), h2:contains('Instructions')")
        .nextAll("ol, ul").first().find("li")
        .each((i, el) => {
          const instruction = $(el).text().trim();
          if (instruction.length > 0) {
            this.recipe.instructions.push(instruction);
          }
        });

      // If still nothing, parse instructions as paragraphs under instructions heading
      if (this.recipe.instructions.length === 0) {
        $("h3:contains('Instructions'), h2:contains('Instructions')")
          .nextAll("p").each((i, el) => {
            const p = $(el).text().trim();
            if (p.length && !$(el).find("strong:contains('Note')").length) {
              this.recipe.instructions.push(p);
            }
          });
      }
    }
  }
}

module.exports = LoveAndLemonsScraper;
