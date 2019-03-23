const Xray = require("x-ray")

module.exports = {
  getStackShareTool: function({ name, url }) {
    var x = Xray({
      filters: {
        trim: function(value) {
          return typeof value === "string" ? value.trim() : value
        },
        clean: function(value) {
          return typeof value === "string" ? value.replace(/\n/, " ") : value
        },
        despace: function(value) {
          return typeof value === "string" ? value.replace(/ /g, "") : value
        },
        removeText: function(value) {
          return typeof value === "string"
            ? value.replace(/[a-zA-Z]+/, "")
            : value
        },
      },
    }).concurrency(1)

    return x(url, "body", {
      fullName: 'a[itemprop="name"]',
      layer: {
        name:
          'li:nth-child(2)[itemprop="itemListElement"] a[data-track="service.breadcrumb_click"] span',
        url:
          'li:nth-child(2)[itemprop="itemListElement"] a[data-track="service.breadcrumb_click"] @href',
      },
      group: {
        name: `a[itemprop="applicationSubCategory"]`,
        url: `a[itemprop="applicationSubCategory"] @href`,
      },
      category: {
        name:
          'li:nth-child(3)[itemprop="itemListElement"] a[data-track="service.breadcrumb_click"] span',
        url:
          'li:nth-child(3)[itemprop="itemListElement"] a[data-track="service.breadcrumb_click"] @href',
      },
      website: "#visit-website@href",
      tagline: "span[itemprop='alternativeHeadline']",
      description: "#service-description span",
      logo: "[itemprop='image']@src",
      features: ["#service-features li"],
      users: x("[data-track='tool_profile.clicked_companies_using_this']", [
        {
          name: "img@alt",
          url: "@href",
          logo: "img@src",
        },
      ]),
      stackShareStats: x("#service-pills-nav li", [
        {
          name: "#tab-label | despace",
          value: "#tab-link | removeText | trim",
        },
      ]),
      gitHubURL: "a[data-track='service.details.github_stats.click'] @href",
      gitHubStats: x("div.stackup-gh-count", [
        {
          name: "@data-hint | despace",
          value: ".gh-metric | trim",
          dateValue: ".gh-date | trim | clean",
        },
      ]),
    }).then(tool => {
      return {
        ...tool,
      }
    })
  },
}
