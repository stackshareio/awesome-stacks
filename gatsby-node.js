const path = require("path");
const { JSDOM } = require("jsdom");
const { createFilePath } = require("gatsby-source-filesystem");

const stackshare = require("./src/utils/stackshare");
const github = require("./src/utils/github");

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
  loadNodeContent }) => {

  const { createNodeField } = actions

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
    value: `${parent.sourceInstanceName === `docs` ? `/docs` : ``}${slugValue}`
  });

  // only process front matter for stacks
  if (parent.sourceInstanceName !== `stacks`) {
    return
  }

  const contributors = node.frontmatter.contributors;
  if (contributors) {
    const contributorsLoaded = await Promise.all(contributors.map(github.getGitHubUser)).filter(user => user);
    createNodeField({
      name: "contributors",
      node,
      value: contributorsLoaded
    });
  }

  // add a field for the list of tools used in the mdx
  const nodeContent = await loadNodeContent(node);
  const githubs = (nodeContent.match(/<GitHub [^>]+>/g) || []).map((toolTag) => {
    const nameWithOwner = (new JSDOM(toolTag)).window.document.querySelector("GitHub").attributes['name'].value;
    const [owner, name] = nameWithOwner.split('/');
    return { owner, name };
  });
  const githubsLoaded = await Promise.all(githubs.map(github.getGitHubTool)).filter(tool => tool);
  createNodeField({
    name: "gitHubTools",
    node,
    value: githubsLoaded
  });

  const stackshares = (nodeContent.match(/<StackShare [^>]+>/g) || []).map((toolTag) => {
    const name = (new JSDOM(toolTag)).window.document.querySelector("StackShare").attributes['name'].value;
    const url = `https://stackshare.io/${name}`;
    return { name, url };
  });

  // fetch the data from stackshare for each tool
  // filter out any tools that aren't found
  const stacksharesLoaded = await Promise.all(stackshares.map(stackshare.getStackShareTool)).filter(tool => tool.fullName);
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
            allMdx(filter: { fields: { sourceName: { in: ["stacks", "docs", "pages"] } } }) {
              edges {
                node {
                  id
                  fields {
                    slug
                    sourceName
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
            component: path.resolve(`./src/components/layouts/${node.fields.sourceName}-layout.js`),
            context: { id: node.id }
          });
        });
      })
    );
  });
};