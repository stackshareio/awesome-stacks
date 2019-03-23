const stackshare = require("../../src/utils/stackshare");
const github = require("../..//src/utils/github");

exports.onCreateNode = async ({ node,
  actions,
  getNode,
  loadNodeContent }) => {

  const { createNodeField } = actions

  if (node.internal.type !== `Mdx`) {
    return
  }

  const parent = getNode(node.parent);
  console.log("YOP" + parent.sourceInstanceName);
  console.log("YOP" + node);

  if (node.name !== `README`) {
    return
  }


  // add a field for the list of tools used in the mdx
  const nodeContent = await loadNodeContent(node);

  // read out the stacks
  const stacks = [{
    name: "JAMStack",
    path: "jamstack",
    category: "JAMStacks",
    description: "JavaScript, APIs, markdown",
    tools: [{
      name: "Markdown",
      description: "Markdown",
      url: "https://daringfireball.net/projects/markdown/syntax",
      github: {
        url: "https://github.com/markdown/markdown"
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
        const [name, owner] = tool.github.url.replace(/http[s]+:\/\/github\.com/, '').split(`/`);
        tool.gitHubData = await github.getGitHubTool({ name, owner })
      }
      if (tool.stackshare.url) {
        const url = tool.stackshare.url
        const name = url.replace(/http[s]+:\/\/stackshare\.io/, '')
        tool.stackShareData = await stackshare.getStackShareTool({ name, url });
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
            allMdx(filter: { fields: { sourceName: { in: ["readme"] } } }) {
              edges {
                node {
                  id
                  fields {
                    slug
                    stacks {
                      name
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
        // just one
        result.data.allMdx.edges.forEach(({ node }) => {
          node.fields.stacks.forEach(({ name, path }) => {
            // createPage({
            //   path,
            //   component: path.resolve(`./src/components/layouts/readme-layout.js`),
            //   context: { name }
            // });
          });
          // here we go through everything in fields
        });
      })
    );
  });
};