const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem");

// to support relative paths in sass files
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
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
      value: `${slugValue}`
    });
  }
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
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        // this is some boilerlate to handle errors
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }
        // We'll call `createPage` for each result
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            // This is the slug we created before
            // (or `node.frontmatter.slug`)
            path: node.fields.slug,
            // This component will wrap our MDX content
            component: path.resolve(`./src/components/stack-layout.js`),
            // We can use the values in this context in
            // our page layout component graphql query
            context: { id: node.id, owner: "dzello", name: "reveal-hugo" }
          });
        });
      })
    );
  });
};