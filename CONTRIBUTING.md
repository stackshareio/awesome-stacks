# Contribution Guidelines

Please note that this project is released with a [Contributor Code of Conduct](CODE-OF-CONDUCT.md). By participating in this project you agree to abide by its terms.

## tl;dr

- Edit the README file
- Add a new stack using markdown
- Open a pull request
- StackShare team approves or gives feedback on the PR
- When merged, your stack will appear in the README and on [awesomestacks.dev](https://awesomestacks.dev/)

## What should I contribute?

The goal of Awesome Stacks is to gather a variety of tech stacks that are widely recognized to be good at solving a particular problem or implementing a certain feature, like "user authentication" or "handling file uploads" or "adding site search" or "building mobile apps". Because there is usually more than one way to build a feature, there may be multiple awesome stacks with the same goal in mind, each one having a different approach and tools.

In general, if you have a stack that you think works great for solving a particular problem, and there is some evidence that the community agrees, than we encourage you to submit it to Awesome Stacks so other developers will know about it 🤘

## Adding an awesome stack

To add an awesome stack to both the README and the companion website [awesomestacks.dev](https://awesomestacks.dev/), you will write markdown that conforms to a specific format and then open a pull request to propose your changes. You can do this entirely on GitHub.com (see below) or clone the repository and edit locally.

one thought near the top of the guide: after "You can do this entirely on GitHub.com (see below) or clone the repository and edit locally." you might consider the following edits:

### Category

To get started, review the categories of stacks in the README, and determine where your stack fits. If you're not sure where to put a stack, just make your best guess and we'll review it in the PR.

If you don't see a category that makes sense for your stack, you can create a new one. Aim for a category broad enough to contain multiple stacks, and use an H2 for the category name. Categories are sorted alphabetically.

Once you have the category in mind, it's time to create the stack with some markdown. Here's an example:

```markdown
### [PWA with Gatsby](https://awesomestacks.dev/pwa-with-gatsby)

Build a simple polling progressive web application with some great modern tech.

- [Gatsby](https://gatsbyjs.org/) - [🛠](https://stackshare.io/gatsbyjs) - [🐙](https://github.com/gatsbyjs/gatsby) - Gatsby is a blazing fast modern site generator for React.
- [Cloud Firestore](https://firebase.google.com/docs/firestore/) - [🛠️](https://stackshare.io/cloud-firestore) - A noSQL cloud database that exposes event listeners for real-time updates.
- [Netlify](https://netlify.com/) - [🛠️](https://stackshare.io/netlify) - Netlify is a global CDN that makes continuous deployments as simple as a few clicks.
- [styled components](https://www.styled-components.com/) - [🛠](https://stackshare.io/styled-components) - [🐙](https://github.com/styled-components) - A react-specific css-in-js solution.

> Get the [code](https://medium.com/@UnicornAgency/jamstack-pwa-lets-build-a-polling-app-with-gatsby-js-firebase-and-styled-components-pt-1-78a03a633092)
```

Here's a breakdown of all of the different elements in the markdown.

### Stack name

This goes first. It must be an `H3` that contains a link. The link text is the name of the stack. This should be short and including something about the use case and/or solution, e.g. "User authentication with OAuth".

The link should go to `https://awesomestacks.dev/{slug}` where slug is the URL-ized version stack name you've chosen (spaces converted to dashes, punctuation removed, all lowercase). E.g. `React and Firebase` becomes `react-and-firebase`. This is necessary so that the link goes to the correct page on the awesomestacks.dev site, which will be built automatically from the markdown you're creating!

### Stack description

In a paragraph under the description, please describe what the stack is used for, what makes it different than other stacks, and anything else useful to mention.

### Tools

Next, specify the key tools in the stack in an unordered list. 5 tools is the recommended maximum. Choose tools that complement each other and form the basis of the stack.

For each tool, there are 4 types of information you are asked to provide:

**Tool name and homepage** (required): The first link must be the name of the tool and a link to its homepage. If it doesn't have a homepage, you can point the link to its GitHub or StackShare page.

**StackShare profile link** (optional): If the tool has a StackShare page, link to it next. Use the 🛠️ (`:hammer_and_wrench`) emoji as the link contents and the StackShare page (`https://stackshare.io/{tool}`) as the URL.

**GitHub repository link** (optional): If the tool has a GitHub repository, link to it next using the 🐙 (`:octopus`) emoji as the link content. The link URL should be to the repository (`https://github.com/{owner}/{name}`).

**Description** (optional): After all of the links, you can provide a short description of the tool. Try to stick to 20 words or less. This description will show up on the awesomestacks.dev stack page as a comment attached underneath the tool's card.

The markdown must follow these conventions precisely for the companion web site to build correctly, including the URLs provided for GitHub and StackShare pages. Don't worry if you won't get it right the first time, any errors will be detected in the pull request process and can be addressed there.

### Resources

If there is a starter kit of blog post that would help someone get started with this stack, link to it after the tools in a blockquote element, just like this:

```markdown
> Get [vue-starter](https://github.com/devCrossNet/vue-starter)
```

## Improving an awesome stack

The process is roughly the same as creating the stack, but instead of creating a whole markdown block you will just add to or change one that already exists. We welcome contributions for adding additional tools or improving the descriptions of both stacks and tools.

> If you aren't yet ready to add an entire stack, this is a great way to make a first contribution!

## Finding tool pages

To quickly locate the right pages for the tools you're adding, here are two handy links:

- [GitHub search page](https://github.com/search)
- [StackShare search page](https://stackshare.io/search)

## Editing and opening a pull request on GitHub

If you have something awesome to contribute to an awesome stack, this is a way to do it all from github.com.

You'll need a [GitHub account](https://github.com/join)!

1. Go to: https://github.com/stackshareio/awesome-stacks
2. Click on the `README.md` file: ![Step 2 Click on Readme.md](https://cloud.githubusercontent.com/assets/170270/9402920/53a7e3ea-480c-11e5-9d81-aecf64be55eb.png)
3. Now click on the edit icon. ![Step 3 - Click on Edit](https://cloud.githubusercontent.com/assets/170270/9402927/6506af22-480c-11e5-8c18-7ea823530099.png)
4. You can start editing the text of the file in the in-browser editor. Make sure you follow guidelines above. You can use [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/). ![Step 4 - Edit the file](https://cloud.githubusercontent.com/assets/170270/9402932/7301c3a0-480c-11e5-81f5-7e343b71674f.png)
5. Say why you're proposing the changes, and then click on "Propose file change". ![Step 5 - Propose Changes](https://cloud.githubusercontent.com/assets/170270/9402937/7dd0652a-480c-11e5-9138-bd14244593d5.png)
6. Submit the [pull request](https://help.github.com/articles/using-pull-requests/)!

## Updating your Pull Request

Sometimes, a maintainer of an awesome list will ask you to edit your Pull Request before it is included. This is normally due to spelling errors or because your PR didn't match the awesome-* list guidelines.

[Here](https://github.com/RichardLitt/knowledge/blob/master/github/amending-a-commit-guide.md) is a write up on how to change a Pull Request, and the different ways you can do that.
