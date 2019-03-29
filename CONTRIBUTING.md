# Contribution Guidelines

Please note that this project is released with a [Contributor Code of Conduct](CODE-OF-CONDUCT.md). By participating in this project you agree to abide by its terms.

## What should I contribute?

The goal of Awesome Stacks is to gather a variety of tech stacks that are widely recognized to be good at solving a particular problem or implementing a certain feature, like "user authentication" or "handling file uploads" or "adding site search" or even "building mobile apps". Because there is usually more than one way to build a feature, there may be multiple awesome stacks with the same goal in mind, each one having a different approach and tools.

In general, if you have a stack that you think works great for solving a particular problem, and there is some evidence that the community agrees, than we encourage you to submit it to Awesome Stacks so other developers will know about it 🤘

## Adding an awesome stack

To add an awesome stack to both the README and the companion website [awesomestacks.dev](https://awesomestacks.dev/), you will write markdown that conforms to a specific format and then open a pull request to propose your changes. You can do this entirely on GitHub.com (see below) or clone the repository and edit locally.

The first thing to think about is what category to put the stack under. If you don't see anything existing that fits, you can create a new category. Use an H2 tag to do so. Aim for something multiple stacks could fit under. If you're not sure where to put a stack, just make your best guess and we'll review it in the PR.

Once you have the category in mind, it's time to write the markdown. Using React as an example, here's what that markdown looks like:

```markdown
### [PWA with Gatsby](https://awesomestacks.dev/pwa-with-gatsby)

Use Gatsby and React to build an installable progressive web app (PWA) that saves state and works offline.

- [Gatsby](https://gatsbyjs.org/) - [🛠](https://stackshare.io/gatsbyjs) - [🐙](https://github.com/gatsbyjs/gatsby) - Gatsby is a blazing fast modern site generator for React.
- [React](https://reactjs.org/) - [🛠](https://stackshare.io/react) - [🐙](https://github.com/facebook/react) - React makes it painless to create interactive UIs.
- [PouchDB](https://pouchdb.com/) - [🛠️](https://stackshare.io/pouchdb) - [🐙](https://github.com/pouchdb/pouchdb) - Open-source database that runs within the browser
- [gatsby-plugin-offline](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/) -  Creates a service worker for the site and loads the service worker into the client.
```

Here is a breakdown of each part of the markdown.

### Stack name

Must be an H3 that contains a link. The link text is the name of the stack. This should be short and including something about the use case and/or solution, e.g. "User authentication with OAuth".

The link should go to `https://awesomestacks.dev/{slug}` where slug is the URL-ized version stack name you've chosen (spaces converted to dashes, punctuation removed, all lowercase). E.g. `React and Firebase` becomes `react-and-firebase`. This is necessary so that the link goes to the correct page on the awesomestacks.dev site.

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
