# Contribution Guidelines

Please note that this project is released with a [Contributor Code of Conduct](code-of-conduct.md). By participating in this project you agree to abide by its terms.

## Adding an awesome stack

To add an awesome stack to both the README and the companion website [awesomestacks.dev](https://awesomestacks.dev/), you will write markdown that conforms to a specific format and then open a pull request to propose your changes.

Here are the different parts of an awesome stack described in markdown, using React as an example:

```markdown
### [React](https://awesomestacks.dev/react)

A popular JavaScript library for building user interfaces comprised of interactive components.

- [React](https://reactjs.org/) - [🛠](https://stackshare.io/react) - [🐙](https://github.com/facebook/react) - React makes it painless to create interactive UIs.
- [React Native](https://facebook.github.io/react-native/) - [🛠️](https://stackshare.io/react-native) - [🐙](https://github.com/facebook/react-native) - A framework for building native apps with React.
- [React Storybook](https://storybook.js.org) - [🛠️](https://stackshare.io/react-storybook) - [🐙](https://github.com/storybooks/storybook) - An open source tool for developing UI components in isolation.
```

Here is each part:

#### Stack name

Must be an H3 that contains a link. The link text is the name of the stack. This should be a few words maximum and can simply be the name of the primary tool, use case or architecture the stack is based on.

The link should go to `https://awesomestacks.dev/{slug}` where slug is the URL-ized version stack name you've chosen (spaces converted to dashes, punctuation removed, all lowercase). E.g. `React and Firebase` becomes `react-and-firebase`. This is necessary so that the link goes to the correct page on the awesomestacks.dev site.

#### Stack description

In a paragraph under the description, please describe what the stack is in a few sentences.

#### Tools

Next, specify the key tools in the stack in an unordered list. 5 tools is the recommended maximum. Choose tools that complement each other and form the basis of the stack.

For each tool, there are 4 types of information you can provide:

- Tool name and link: The first link must be the name of the tool and a link to its homepage. If it doesn't have a homepage, you can point the link to its GitHub or StackShare page.
- StackShare profile link: If the tool has a StackShare page, link to it next. Use the 🛠️ (`:hammer_and_wrench`) emoji as the link contents and the StackShare page (`https://stackshare.io/{tool}`) as the URL.
- GitHub repository link: If the tool has a GitHub repository, link to it next using the 🐙 (`:octopus`) emoji as the link content. The link URL should be to the repository (`https://github.com/{owner}/{name}`).
- Description - After all of the links, you can provide a short description of the tool. Try to make it short enough so that it doesn't cause a link break on the README's GitHub.com view. This description will show up on the awesomestacks.dev stack page as a comment attached underneath the tool's card.

The markdown must follow these conventions precisely for the companion web site to build correctly, including the URLs provided for GitHub and StackShare pages. Don't worry if you won't get it right the first time, any errors will be detected in the pull request process and fixed.

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