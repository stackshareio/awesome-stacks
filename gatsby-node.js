const path = require("path");
const crypto = require("crypto");
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

// pick back up here
// exports.sourceNodes = ({ graphql, actions }) => {
//   const { createNode } = actions;
//   return new Promise((resolve, reject) => {
//     resolve(
//       graphql(
//         `
//           {
//             allMdx(filter: { fields: { sourceName: { eq: "stacks" } } }) {
//               edges {
//                 node {
//                   id
//                   fields {
//                     tools
//                   }
//                 }
//               }
//             }
//           }
//         `
//       ).then(result => {
//         if (result.errors) {
//           console.error(result.errors);
//           reject(result.errors);
//         }

//         return Promise.all(result.data.allMdx.edges.map(({ node: { tools } }) => {
//           const repoNode = {
//             tools
//           };
//           const contentDigest = crypto
//             .createHash(`md5`)
//             .update(JSON.stringify(repoNode))
//             .digest(`hex`);
//           repoNode.internal.contentDigest = contentDigest;
//           createNode(repoNode);
//         }));

//       }));
//   });
// };

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
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/components/stack-layout.js`),
            context: { id: node.id }
          });
        });
      })
    );
  });
};