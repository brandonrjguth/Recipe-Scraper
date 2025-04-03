"use strict";

const BaseScraper = require("../helpers/BaseScraper");

function titleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase());
  }

/**
 * Class for scraping cookieandkate.com
 * @extends BaseScraper
 */
class InspiredTasteScraper extends BaseScraper {
  constructor(url) {
    super(url, "inspiredtaste.net/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = titleCase($("h1")
      .text().replace(/\s*{[^}]*}\s*/g, ''));

    $(".itr-ingredients")
    .find("p")
    .each((i, el) => {
      ingredients.push($(el).text());
    });

    $(".itr-directions")
    .find("p")
    .each((i, el) => {
        const textWithoutSpan = $(el)
        .contents()
        .filter(function () {
            return this.nodeType === 3; // Select only text nodes (TEXT_NODE has a value of 3)
        })
        .text()
        .trim(); // Remove any extra spaces

        if (textWithoutSpan !== "") {
        instructions.push(textWithoutSpan);
        }
    });

  }
}

module.exports = InspiredTasteScraper;
