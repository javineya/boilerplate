Whoo, lots to unpack here. We're running React without using create-react-app.

In order to pull this off, we have to do a ton of configuration. Might be worth it to keep a "barebones" example of this sort of thing handy in order to spare the time it takes later.

First up, we have to install Babel. Babel translates the React-style code we're writing into something the browser can understand.
= In order to use Babel's functionality, we have to tell it which file WE are writing, and then tell it where to put the file IT writes.
== It's also a good idea to add --watch onto the command so that we don't have to restart Babel every time we change something.

Second, in order for us to see an example, we install Live-Server and tell it so serve our public folder's contents (which is where we told Babel to write ITS file) to our localserver on port 8080, by default.

In order to break our code into separate files, instead of having one monolithic file that is ugly and hard to navigate, we have to use Webpack. Webpack tracks all our files and then "bundles" them all together into a single, minified file, which Webpack auto-generates (like Babel) in our /public folder.

Then, in order to use Webpack and Babel, we have to install some Babel presets, namely 'env' and 'react' and tell Babel what's happening with Webpack. We do this in a file called '.babelrc'. We also have to tell Webpack to expect Babel via a configuration file called 'webpack.config.js'.

When all is said and done, with all dependencies and configuration files in the write places, we can throw some scripts into our 'package.json' folder to make it easier to run the commands we need to get coding.

It's no wonder people tend to use create-react-app, even with its meaty package.

But a barebones Webpack/Babel setup would probably be faster than create-react-app if you just copy/pasted it from a code library. It also produces a nice, minified file in bundle.js to reference in index.html, which will make the webpages faster, too.