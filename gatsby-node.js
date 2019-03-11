const path = require("path");
const { JSDOM } = require("jsdom");
const { createFilePath } = require("gatsby-source-filesystem");

// to support relative paths in sass files
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
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
  const stackshares = (nodeContent.match(/<StackShare [^>]+>/g) || []).map((toolTag) => {
    const name = (new JSDOM(toolTag)).window.document.querySelector("StackShare").attributes['name'].value;
    const url = `https://stackshare.io/${name}`;
    return { name, url, source: 'StackShare' };
  });
  createNodeField({
    name: "tools",
    node,
    value: [].concat(stackshares).concat(githubs)
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
                    tools {
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
        }
        result.data.allMdx.edges.forEach(({ node }) => {
          const query = node.fields.tools.map((tool) => (`repo:${tool.name}`)).join(' ');
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