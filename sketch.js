let vid;
let t = "Loading...";
let playing = false;
let wideMode = false;
let nativeWidth = 3840;
let nativeHeight = 2160;
let x = 0;
let y = 0;
let destinationBox;
let sourceBox;


function preload() {
  vid = createVideo(
    "https://player.vimeo.com/external/523183775.hd.mp4?s=19cfd5089daa2d8f3a067d0c66763af126011eb5&profile_id=172&oauth2_token_id=1538764509",
    displayClicktext
  );
  vid.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (nativeWidth / nativeHeight < width / height) {
    wideMode = true;
    destinationBox = width / 12;
    sourceBox = width / 26;
    console.log("wide");
  } else {
    destinationBox = height / 8;
    sourceBox = height / 16;
  }
}

function draw() {
  if (!playing) {
    background(0);
    fill(255);
    noStroke(); 
    textAlign(CENTER, CENTER);
    text(t, width / 2, height / 2);
  } else {
    image(vid, 0, 0, width, height, x, y, width, height);
    drawMagnifyingglass();
    calculateCompletion();
  }
  stroke(255);
}

// -------------------------------------------
// -------------------------------------------

function displayClicktext() {
  t = "Click to start";
}

function mousePressed() {
  vid.play();
  //vid.time(325);
  playing = true;
  if (wideMode) {
    vid.height = (width / nativeWidth) * nativeHeight;
    vid.width = width;
    y = (vid.height - height) / 2;
  } else {
    vid.width = (height / nativeHeight) * nativeWidth;
    vid.height = height;
    x = (vid.width - width) / 2;
  }
}

function drawMagnifyingglass() {
  push();
  translate(-destinationBox, -destinationBox);
  rect(mouseX, mouseY, destinationBox, destinationBox);
  let offset = (destinationBox - sourceBox) / 2;
  image(
    vid,
    mouseX,
    mouseY,
    destinationBox,
    destinationBox,
    mouseX + x + offset - destinationBox,
    mouseY + y + offset - destinationBox,
    sourceBox,
    sourceBox
  );
  noFill();
  // rect(mouseX + offset, mouseY + offset, sourceBox, sourceBox);
  pop();
}

function calculateCompletion() {
  let completion = vid.time() / vid.duration();
  if (completion == 1) {
    playing = false;
    vid = createVideo(
      "https://player.vimeo.com/external/523183775.hd.mp4?s=19cfd5089daa2d8f3a067d0c66763af126011eb5&profile_id=172&oauth2_token_id=1538764509",
      displayClicktext
    );
    vid.hide();
  }
}