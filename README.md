## Deployment

First make sure Node.js is installed. You can get the latest version here: https://nodejs.org/en/download/

Then copy the contents of the electron-builder-example.json5 file in the root directory of the project. Make a new file in the same directory called electron-builder.json5. Paste in the example file contents and add token field in the publish objects. This is the personal access token for the github repo.

![electronConfigSetup](https://user-images.githubusercontent.com/102999741/169410756-146d2aa3-6a9c-4e16-9101-536b927d422a.gif)


Your are now ready to deploy. To deploy this project run the following commands in the specified order:

```bash
npm install
npm run prebuild
npm run deploy
```


# View original boilerplate here
https://github.com/electron-vite/electron-vite-vue
