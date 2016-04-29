# js-tools-skeleton
A skeleton project for using some tools with Node.js

## Initialisation

```
npm install
gulp
```

Notice that the latter command remains "watching". In this case it can be stopped with <kbd>Ctrl</kbd>-<kbd>c</kbd>.

Gulp did the following:
* Created ```public/build``` folder and subfolders
* Compressed ```public/js/fetchContent.js``` and copied it to ```public/build/js```
* Converted ```public/less/ownstyles.less``` and copied it to ```public/build/css```
* Ran csslint to check whether our CSS is ok (no warnings were given)

## Testing that it works

```
node server.js
```

On a browser open [http://localhost:8020/demo.html](http://localhost:8020/demo.html)