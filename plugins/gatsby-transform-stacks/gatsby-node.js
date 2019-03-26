const path = require("path");
const cheerio = require("cheerio");
const slugify = require('@sindresorhus/slugify');
const stackshare = require("../../src/utils/stackshare");
const github = require("../../src/utils/github");

exports.onCreateNode = async ({ node,
  actions,
  getNode,
  loadNodeContent }) => {

  const { createNodeField } = actions

  if (node.internal.type !== `MarkdownRemark`) {
    return
  }

  const parent = getNode(node.parent);
  if (parent.internal.type === "File") {
    createNodeField({
      name: `sourceName`,
      node,
      value: parent.sourceInstanceName
    });
  }

  if (parent.sourceInstanceName !== `readme-stacks`) {
    return
  }

  // add a field for the list of tools used in the mdx
  const nodeContent = await loadNodeContent(node);
  const $ = cheerio.load(nodeContent);

  console.log(nodeContent)

  const categories = $(`h2`).map((_, category) => {
    return {
      name: $(category).text(),
      path: slugify($(category).text()),
      stacks: $(category).nextUntil(`h2`, `h3`).map((_, stack) => {
        return {
          name: $(stack).find("a").text(),
          description: $(stack).find("p").text(),
          path: slugify($(stack).find("a").text()),
          url: $(stack).find("a").attr("href"),
          tools: $(stack).next(`ul`).find(`li`).map((_, tool) => {
            const toolObj = {};
            $(tool).find("a").each((_, link) => {
              if ($(link).text() === "🛠️") {
                toolObj.stackShareUrl = $(link).attr("href");
              } else if ($(link).text() === "🐙") {
                toolObj.gitHubUrl = $(link).attr("href");
              }
            });
            return toolObj;
          }).get()
        }
      }).get()
    }
  }).get()

  console.log("YP")
  console.log(categories)

  // get the stacks then get the tools
  await Promise.all(categories.map(category => {

    return category.stacks.map(stack => {

      return Promise.all(stack.tools.map(async tool => {
        if (tool.gitHubUrl) {
          const [owner, name] = tool.gitHubUrl.replace(/http[s]+:\/\/github\.com\//, '').split(`/`);
          try {
            tool.gitHubData = await github.getGitHubTool({ owner, name })
          } catch (e) {
            console.warn(e);
          }
        }
        if (tool.stackShareUrl) {
          const url = tool.stackShareUrl
          const name = url.replace(/http[s]+:\/\/stackshare\.io\//, '')
          try {
            tool.stackShareData = await stackshare.getStackShareTool({ name, url });
          } catch (e) {
            console.warn(e);
          }
        }
      }));

    });

  }));

  createNodeField({
    name: "categories",
    node,
    value: categories
  });

};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(filter: { fields: { sourceName: { eq: "readme-stacks" } } }) {
              edges {
                node {
                  id
                  fields {
                    categories {
                      stacks {
                        name
                        path
                      }
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
          return
        }
        // there will just be one edge for the readme
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          node.fields.categories.forEach(category => {
            category.stacks.forEach(stack => {
              createPage({
                path: stack.path,
                component: path.resolve(`./src/components/pages/readme-stacks-page.js`),
                context: { id: node.id, stackName: stack.name }
              });
            });
          });
        });
      })
    );
  });
};