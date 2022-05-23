## Setup

For a fresh setup in a new repo, go ahead and click the "Use this template" button above. Then make sure to have a personal access token created. 

If you're not creating a new repo from this project and you want to make updates, just make sure Thomas has set you up as a contributor and has given you a copy of the personal access token.

## Deployment

Once you have the project folder on your machine, make sure Node.js is installed. You can get the latest version here: https://nodejs.org/en/download/

Now allow your project to use the personal access token you obtained earlier. To do this, set a "GH_TOKEN" environment variable on your Windows machine and assign it the personal access token value. There is more than one way to do this, here is one example:
  1. Run windows powerShell from Administrator
  2. Execute [Environment]::SetEnvironmentVariable("GH_TOKEN","your personal access token","User")
  3. Launch or full restart your IDE

You are now ready to deploy. After making updates to the project, just change the version number in the package.json file and save.

**Note:** Deployment can only be done on a windows machine at this time. Deploying on a Mac and trying to run the .exe for windows has caused some problems so far.

To deploy this project run the following commands at the project's root directory level:

```bash
npm install
npm run prebuild
npm run deploy
```
Once the deploy finishes, you should be able to see a new draft in the releases section of this repo. Here you can finish publishing the release, and download the application if you'd like. After downloading the application, further releases will be auto-detected and auto-updated.

## For local development testing

```bash
npm run dev
```

## For testing as a desktop app without publishing

```bash
npm run build
```

## Core Dependencies

- [Electron](https://www.electronjs.org/) - allows us to build cross-platform desktop apps with JavaScript, HTML, and CSS.
- [Vue.js](https://vuejs.org/) - An approachable, performant and versatile framework for building web user interfaces.
- [Vite](https://vitejs.dev/) - a great alternative to webpack, this module build tool was made by the creator of Vue.js and aims to provide a faster and leaner development experience for modern web projects.
- [Axios](https://axios-http.com/docs/intro) - a promise based HTTP Client for node.js (makes API calls to get needed data).
- [Interact.js](https://interactjs.io/) - JavaScript drag and drop, resizing, and multi-touch gestures for modern browsers.
- [Pinia](https://pinia.vuejs.org/) - Pinia is a store library for Vue, which allows you to share a state (data) across components/pages. 
- [Vue-Router](https://router.vuejs.org/) - This is the official router for Vue.js. It allows you to dynamically render Vue components without reloading the page.


## Authors

- [@thomasnixon](https://www.github.com/thomasNGrayTv)


## View original boilerplate here:
https://github.com/electron-vite/electron-vite-vue
