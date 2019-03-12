const path = require("path");
const { JSDOM } = require("jsdom");
const { createFilePath } = require("gatsby-source-filesystem");
const Xray = require('x-ray');

var x = Xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
    },
    clean: function (value) {
      return typeof value === 'string' ? value.replace(/\n/, ' ') : value
    },
    despace: function (value) {
      return typeof value === 'string' ? value.replace(/ /g, '') : value
    },
    removeText: function (value) {
      return typeof value === 'string' ? value.replace(/[a-zA-Z]+/, '') : value
    }
  }
}).concurrency(2);

// to support relative paths in sass files
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

function getStackShareTool({ name, url, source }) {
  return x(url, 'body', {
    layer: {
      name: 'li:nth-child(2)[itemprop="itemListElement"] a[data-track="service.breadcrumb_click"] span',
      url: 'li:nth-child(2)[itemprop="itemListElement"] a[data-track="service.breadcrumb_click"] @href',
    },
    group: {
      name: `a[itemprop="applicationSubCategory"]`,
      url: `a[itemprop="applicationSubCategory"] @href`,
    },
    category: {
      name: 'li:nth-child(3)[itemprop="itemListElement"] a[data-track="service.breadcrumb_click"] span',
      url: 'li:nth-child(3)[itemprop="itemListElement"] a[data-track="service.breadcrumb_click"] @href',
    },
    website: '#visit-website@href',
    tagline: "span[itemprop='alternativeHeadline']",
    description: "#service-description span",
    logo: "[itemprop='image']@src",
    features: ["#service-features li"],
    users: x("[data-track='tool_profile.clicked_companies_using_this']", [{
      name: "img@alt",
      url: "@href",
      logo: "img@src"
    }]),
    stackShareStats: x("#service-pills-nav li", [{
      name: "#tab-label | despace",
      value: "#tab-link | removeText | trim"
    }]),
    gitHubURL: "a[data-track='service.details.github_stats.click'] @href",
    gitHubStats: x("div.stackup-gh-count", [{
      name: "@data-hint | despace",
      value: ".gh-metric | trim",
      dateValue: ".gh-date | trim | clean"
    }])
  }).then((tool) => {
    return {
      name, url, source,
      ...tool
    };
  });
}

exports.onCreateNode = async ({ node,
  actions,
  getNode,
  loadNodeContent,
  createNodeId,
  createContentDigest }) => {

  function transformObject(obj, id, type) {
    const toolNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    }
    createNode(toolNode)
    createParentChildLink({ parent: node, child: toolNode })
  }

  const { createNode, createNodeField, createParentChildLink } = actions

  if (node.internal.type !== `Mdx`) {
    return
  }

  // create a queryable sourceName field
  const parent = getNode(node.parent);
  if (parent.internal.type === "File") {
    createNodeField({
      name: `sourceName`,
      node,
      value: parent.sourceInstanceName
    });
  }

  // set the slug b/c outside /src/pages
  // https://gatsby-mdx.netlify.com/guides/programmatically-creating-pages
  const slugValue = createFilePath({ node, getNode });
  createNodeField({
    name: "slug",
    node,
    value: slugValue
  });

  // add a field for the list of tools used in the mdx
  const nodeContent = await loadNodeContent(node);
  const githubs = (nodeContent.match(/<GitHub [^>]+>/g) || []).map((toolTag) => {
    const name = (new JSDOM(toolTag)).window.document.querySelector("GitHub").attributes['name'].value;
    const [orgName, repoName] = name.split('/');
    const url = `https://github.com/${name}`;
    return { name, orgName, repoName, url, source: 'GitHub' };
  });
  createNodeField({
    name: "gitHubTools",
    node,
    value: githubs
  });

  const stackshares = (nodeContent.match(/<StackShare [^>]+>/g) || []).map((toolTag) => {
    const name = (new JSDOM(toolTag)).window.document.querySelector("StackShare").attributes['name'].value;
    const url = `https://stackshare.io/${name}`;
    return { name, url, source: 'StackShare' };
  });
  const stacksharesLoaded = await Promise.all(stackshares.map((stackshare) => {
    return getStackShareTool(stackshare);
  }));
  createNodeField({
    name: "stackShareTools",
    node,
    value: stacksharesLoaded
  });

};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx(filter: { fields: { sourceName: { eq: "stacks" } } }) {
              edges {
                node {
                  id
                  fields {
                    slug
                    gitHubTools {
                      name
                      source
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }
        result.data.allMdx.edges.forEach(({ node }) => {
          const query = node.fields.gitHubTools.map((tool) => `repo:${tool.name}`).join(' ');
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/components/stack-layout.js`),
            context: { id: node.id, query }
          });
        });
      })
    );
  });
};