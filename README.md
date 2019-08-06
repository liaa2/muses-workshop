# Three.js Workshop

Using three.js to make a simple universe and rotating cubes.

## pre-requisites
1. Install python 2.7 or 3.6. Link: https://www.python.org/downloads/

2. Install Curl. Link: https://curl.haxx.se/download.html




## Getting Started
1. In your repository, create a `index.html` file.
2. In the same repository, create `js`, `img` and `css` folders.
3. Inside your `css` folder, create a `styles.css` file.
4. Inside your `js` folder, run these 2 commands from your terminal to download `three.js` and `orbitControls.js`: 
- `curl https://raw.githubusercontent.com/mrdoob/three.js/dev/build/three.min.js -o three.js`

- `curl https://gist.githubusercontent.com/mrflix/8351020/raw/3d45ef56da946d6e1ae3ad30e4a4d7f992892eed/OrbitControls.js -o orbitControls.js`
5. Still inside your `js` folder, create `main-lib.js` and `main.js` files.
6. Go to `img` folder, run these 2 commands from your terminal to download images:

- `curl https://raw.githubusercontent.com/liaa2/muses-workshop/master/img/earth.jpg -o earth.jpg`


- `curl https://raw.githubusercontent.com/liaa2/muses-workshop/master/img/snowflake.png -o snowflake.png`
7. The structure of your repository should look like this:

```
threejs-workshop
├── css
│   └── styles.css
├── img
│   ├── earth.jpg
│   └── snowflake.png
├── index.html
└── js
    ├── main-lib.js
    ├── main.js
    ├── orbitControls.js
    └── three.js
```