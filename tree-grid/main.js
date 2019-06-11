function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var canvas = document.getElementById('huh');
var ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth * window.devicePixelRatio;
canvas.height = canvas.clientHeight * window.devicePixelRatio;

const squareSide = 50;
const worldSize = 80;

function loadImage(src) {
	return new Promise((resolve, reject) => {
		var img = new Image();
		img.src = src;
		img.onload = () => resolve(img);
		img.onerror = reject;
	});
}

function loadAllImages(srcs) {
	return Promise.all(srcs.map(loadImage));
}


// input handlers:
// TK

var srcs = ["assets/transparency.png",
			"assets/cuteflower.png",
			"assets/pinetree.png",
			"assets/seedling2.png",
			"assets/tree2.png",
			"assets/groundflower.png",
			"assets/seedling1.png",
			"assets/tree1.png"];

var images = [];

// load:
loadAllImages(srcs).then(_images => {
	images = _images;

	// start animation:
	initGrid();
	tick();
});

function makeGrid() {
	let grid = new Array(worldSize).fill([]).map(e => {return new Array(worldSize).fill(0)})
	return grid;
}

function fillCell() {
	return getRandomInt(srcs.length);
}

function initGrid() {
	grid = makeGrid();
	grid = grid.map(row => {return row.map(cell => {return fillCell()})})
}

var then = performance.now();

// input handlers:
const keyboardState = {};

window.addEventListener('keydown', (e) => {
	console.log(keyboardState);
	tick();
	//keyboardState[e.key] = true;
});

/*window.addEventListener('keyup', (e) => {
	delete keyboardState[e.key];
});*/

function tick() {
	console.log('called');
	var now = performance.now();
	var dt = (now - then) / 1000; // diff in seconds

	initGrid();
	update(dt);
	draw();

	then = now;

	//window.requestAnimationFrame(tick); // scheduling next frame
}

var state = {
	rect: { x: 0, y: 0, width: 100, height: 100 }
};

function update(dt) {
}

colorOptions = ['#6abe30', '#37946e', '#4b692f']

function draw() {
	const width = canvas.width;
	const height = canvas.height;
	ctx.clearRect(0, 0, width, height);
/*
	for each in dumbIndices.keys:
		give the image[index] a name as a variable,
		drawImage

	var cuteflower = images[0];
	var x = 0;
	var y = 0;
	images.forEach(item => {
					x += 50*Math.random();
					y += 50*Math.random();
					ctx.drawImage(item, x, y)});*/
	for(let x=0; x<worldSize; x++) {
		for(let y=0; y<worldSize; y++) {
			ctx.fillStyle = colorOptions[Math.round((grid[x][y])/3)];
			ctx.fillRect(x*squareSide, y*squareSide, squareSide, squareSide);
			imageIndex = grid[x][y]
			ctx.drawImage(images[imageIndex], x*squareSide, y*squareSide, squareSide, squareSide);
		}
	}

}

























