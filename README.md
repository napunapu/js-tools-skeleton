# js-tools-skeleton
A skeleton project for using some tools with Node.js

## Initialisation

```
npm install
```

## Gulp

Run the command:

```
gulp
```

Notice that the latter command remains ”watching”. In this case it can be stopped with <kbd>Ctrl</kbd>-<kbd>c</kbd>.

Gulp did the following by reading the instructions from the file ```gulpfile.js```:
* Created ```public/build``` folder and subfolders
* Compressed ```public/js/fetchContent.js``` and copied it to ```public/build/js```
* Converted ```public/less/ownstyles.less``` and copied it to ```public/build/css```
* Ran csslint to check whether our CSS is ok (no warnings were given)

## Testing that it works

```
node server.js
```

On a browser open [http://localhost:8020/demo.html](http://localhost:8020/demo.html)

## Shipit

The command file is ```shipitfile.js```. For it really to work the following block needs a correct user name, server name, and server port in the ```servers``` setting:

```javascript
master: {
  servers: ['user@company.com:12345'],
  branch: 'master',
  deployTo: '/home/root/www',
  runConfig: ''
}
```

The command line command (after adding the server information) is:

```
shipit master deploy
```

where the word ```master``` refers to the configuration block name shown above.