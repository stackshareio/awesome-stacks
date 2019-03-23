const path = require("path");
const stackshare = require("../../src/utils/stackshare");
const github = require("../..//src/utils/github");

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

  if (parent.sourceInstanceName !== `readme`) {
    return
  }

  // if (!node.fileAbsolutePath.endsWith(`README.md`)) {
  //   return
  // }

  // add a field for the list of tools used in the mdx
  const nodeContent = await loadNodeContent(node);

  // read out the stacks
  const stacks = [{
    name: "The JAMStack",
    path: "the-jamstack",
    category: "JAMStacks",
    description: "JavaScript, APIs, markdown",
    tools: [{
      name: "Markdown",
      description: "Markdown",
      url: "https://daringfireball.net/projects/markdown/syntax",
      github: {
        url: "https://github.com/adam-p/markdown-here"
      },
      stackshare: {
        url: "https://stackshare.io/markdown"
      }
    }]
  }]

  // get the stacks then get the tools
  await Promise.all(stacks.map(stack => {

    return Promise.all(stack.tools.map(async tool => {
      if (tool.github.url) {
        const [owner, name] = tool.github.url.replace(/http[s]+:\/\/github\.com\//, '').split(`/`);
        try {
          tool.gitHubData = await github.getGitHubTool({ owner, name })
        } catch (e) {
          console.warn(e);
        }
      }
      if (tool.stackshare.url) {
        const url = tool.stackshare.url
        const name = url.replace(/http[s]+:\/\/stackshare\.io\//, '')
        try {
          tool.stackShareData = await stackshare.getStackShareTool({ name, url });
        } catch (e) {
          console.warn(e);
        }
      }
    }));

  }));

  createNodeField({
    name: "stacks",
    node,
    value: stacks
  });

};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(filter: { fields: { sourceName: { eq: "readme" } } }) {
              edges {
                node {
                  id
                  fields {
                    stacks {
                      name
                      path
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
          node.fields.stacks.forEach(stack => {
            createPage({
              path: stack.path,
              component: path.resolve(`./src/components/pages/markdown-stack.js`),
              context: { id: node.id, stackName: stack.name }
            });
          });
        });
      })
    );
  });
};