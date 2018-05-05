## Contributing guidelines

Contributing generally can be done in two ways - either contributing with the creation of `Issues` or through submitting code. The latter requires some prerequisites and requirements, as well as some guidelines, before a Contribution can be made.

#### Environment and Plug-ins

###### Environment
- Atom
- Node.js (npm)
- Cordova
- VueJS
- MySQL


###### Plugins
 - Atom-IDE-UI
 - Atom-IDE-TypeScript
 - DocBlockr
 - Language-Vue
 - TeleType

#### Issues and code guideline
- Issues must be labeled
- Issues has to be assigned to the responsible person
- For major contributions or changes always use/create a separate branch (Never commit to the master branch)
- write automated tests for changes
- ensure before you make a commit there are no syntax errors and their tests are successful
- Ensure that used methods can be executed properly within older environments (especially in Frontend to support Android 4 or older iOS versions)
- don't repeat yourself. Use re-usable functions and split to avoid too large, complex functions or code parts
- document your code!
- try to avoid using npm or cordova packages as often as possible - if you need them, install them with --save flag, so they will be added to the package.json file for others


#### Code preparation and build process

##### App build
###### First-time-setup
- enter app directory with `cd app`
- run `npm install`
- run `npm install -g rollup`
- copy `app_config.template.js` to `www/js/app_config.js` and adjust the values for your needs
###### Build process
- enter the app directory with `cd app`
- run `rollup -c --watch`
- now you can view the app locally within the browser or with `cordova build android` / `cordova run android`
###### Directory structure
- `/app` (*the app directory*)
    - `/hooks` (*cordova specific for hook events*)
    - `/node_modules` (*npm plugin sources*)
    - `/plugins` (*cordova plugin sources*)
    - `/res` (*will be used for images and other resources that aren't used directly within app itself like app icons*)
    - `/www` (*the main app directory*)
        - `/components` (*all VueJS components are here*)
        - `/css` (*the css files for the components*)
        - `/img` (*contains image resources*)
        - `/js` (*contains the configuration file, as well as the bundler, vue and custom functions*)
        - `index.html` (*basic html file to render Vue instance and to load scripts and resources*)
    - `app_config.template.js` (*the app configuration file template*)
    - `config.xml` (*cordova specific configuration structure file*)
    - `package.json` (*contains all required plugins and external source references*)
    - `rollup.config.js` (*module bundler configuration file*)

##### Server build
###### First-time-setup
- enter server directory with `cd server`
- run `npm install`
- run `npm install -g mocha`
- copy `srv_config.template.json` to `srv_config.json` and adjust the values for your needs
- run `mysql fleamaster < db/db_template.sql` to setup database structure
###### Build process
- enter server directory with `cd server`
- run `node server.js` or `node --inspect server.js` if you want to debug the server on the Chrome DevTools
###### Directory structure
- `/server` (*the server directory*)
    - `/modules` (*custom modules for custom functions or server requests - grouped for their base functionality (e.g. login handling within account module)*)
    - `/node_modules` (*npm plugin sources*)
    - `/tests` (*server tests, each seperated to their referencing module*)
    - `createEnv.sh` (*script for automated environment setup for travis-ci*)
    - `package.json` (*contains all required plugins and external source references*)
    - `server.js` (*server initialization and request routing handling*)
    - `srv_config.template.json` (*server configuration file template*)
    - `srv_error.json` (*server error enumerations declaration*)

#### Coding style
###### Variables declaration
```javascript
var self = this, // declare self, if you use this multiple times or within different context
    foo = 'bar', // declare variables always on top of functions
    foo2 = 'bar', // use comma - no semicolon, if there are other variables coming
    foo3 = 'bar3';

// all variables have been declared, proceed with code
```

###### Functions declaration and documentation
```javascript
/**
 * Description of function
 * @param  {String} bar description of parameter
 * @return {String}     the return value / type
 */
function foo(bar) {
    return bar || '';
}

console.log(foo('bar'));
```

###### Arrow functions
```javascript
let myArray = [1, 2, 3];

/**
 * Since arrow functions, let and const keywords are not supported by every browser or platform,
 * use them only within backend!
 */
myArray.forEach(num => console.log(num));
```

###### Callbacks
```javascript
/**
 * An asynchronous function with callback
 * @param  {Function} callback callback function
 * @return {void}
 */
function asyncFunction(callback) {
    callback(err, returnValue); // the first argument within callback is always error value!
}

asyncFunction(function(err, res) {
    console.log(err, res);
});

// or within backend with arrow-function
asyncFunction((err, res) => {
    console.log(err, res);
});
```
