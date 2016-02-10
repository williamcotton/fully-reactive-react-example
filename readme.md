#React: not going fully reactive

###React is _not_ reactive

Nowadays React is getting more and more popular. However, despite the name, it is **not** fully reactive solution.

That's a good thing.

###Going reactive in the component

Look how confusing and verbose it is to use Rx.Observable:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {count: 0};
  }

  // Click events are now observables! No more proactive approach.
  componentDidMount () {
    const plusBtn = document.getElementById('plus');
    const minusBtn = document.getElementById('minus');

    const plus$ = Rx.Observable.fromEvent(plusBtn, 'click').map(e => 1);
    const minus$ = Rx.Observable.fromEvent(minusBtn, 'click').map(e => -1);

    Rx.Observable.merge(plus$, minus$).scan((acc, n) => acc + n)
      .subscribe(value => this.setState({count: value}));
  }

  render () {
    return (
        <div>
          <button id="plus">+</button>
          <button id="minus">-</button>
          <div>count: {this.state.count}</div>
        </div>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'));
```

Why not just do it this way?

```js
import React from 'react'
import ReactDOM from 'react-dom'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = { count: 0 }
  }
  render () {
    return <div>
      <button id='plus' onClick={ e => this.setState({ count: this.state.count + 1 }) }>+</button>
      <button id='minus' onClick={ e => this.setState({ count: this.state.count - 1 }) }>-</button>
      <div>count: { this.state.count }</div>
    </div>
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'))
```

Also, look how confusing and verbose it is to use Webpack:

```js
var path = require('path');
var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_DEV || "0");

module.exports = {
  entry: './src/main.js',
  devtool: !PROD ? 'source-map' : undefined,
  output: {
    path: './dist',
    filename: 'bundle.min.js',
    sourceMapFilename: '[name].js.map'
  },
  devServer: {
    inline: true,
    contentBase: './dist'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /.+.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
```

Why not just use a Makefile?

```make
all: dist/bundle.min.js

dist/bundle.js:
  browserify src/main.js -t [ babelify --presets [ es2015 react ] ] > $@

dist/bundle.min.js: dist/bundle.js
  uglifyjs $< -m -c > $@
```

Keep it simple, silly!