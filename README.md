## Setup

For a fresh setup in a new repo, go ahead and click the "Use this template" button above. Then make sure to have a personal access token created. 

If you're not creating a new repo from this project, just make sure Thomas has set you up as a contributor and has given you a copy of the personal access token.

## Deployment

Once you have the project folder on your machine, make sure Node.js is installed. You can get the latest version here: https://nodejs.org/en/download/

Then copy the contents of the electron-builder-example.json5 file (located in the root directory of the project). Make a new file in the same directory called electron-builder.json5. Paste in the example file contents and add token field in the publish objects. Token value is the personal access token. If you are doing this for a new repo, also make sure to update all instances of "owner" and "repo" to your own. Here is a demo:

![electronConfigSetup](https://user-images.githubusercontent.com/102999741/169410756-146d2aa3-6a9c-4e16-9101-536b927d422a.gif)


You are now ready to deploy. Change the version number in the package.json file and save. To deploy this project run the following commands at the project's root directory level:

```bash
npm install
npm run prebuild
npm run deploy
```
Once the deploy finishes, you should be able to see a new draft in the releases section of this repo. Here you can finish publishing the release.

## Core Dependencies

- [Electron](https://www.electronjs.org/) - allows us to build cross-platform desktop apps with JavaScript, HTML, and CSS.
- [Vue.js](https://vuejs.org/) - An approachable, performant and versatile framework for building web user interfaces.
- [Vite](https://vitejs.dev/) - a build tool made by the creator of Vue.js, Vite aims to provide a faster and leaner development experience for modern web projects.
- [Axios](https://axios-http.com/docs/intro) - a promise based HTTP Client for node.js (makes API calls to get needed data).
- [Interact.js](https://interactjs.io/) - JavaScript drag and drop, resizing, and multi-touch gestures for modern browsers.
- [Pinia](https://pinia.vuejs.org/) - Pinia is a store library for Vue, it allows you to share a state (data) across components/pages. 
- [Vue-Router](https://router.vuejs.org/) - This is the official router for Vue.js. It allows you to dynamically render Vue components without reloading the page.

## Authors

- [@thomasnixon](https://www.github.com/thomasNGrayTv)


## View original boilerplate here
https://github.com/electron-vite/electron-vite-vue
