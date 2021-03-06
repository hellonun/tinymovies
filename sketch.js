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
let onMobile;

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
  vid.elt.setAttribute("playsinline", true);
  vid.elt.setAttribute("autoplay", true);
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
  let cursorX, cursorY;
  push();
  translate(-destinationBox, -destinationBox);
  if (window.mobileAndTabletCheck() == true) {
    if (touches.length > 0) {
      cursorX = touches[0].x;
      cursorY = touches[0].y;
    }
  } else {
    cursorX = mouseX;
    cursorY = mouseY;
  }
  strokeWeight(2);
  stroke(255);
  rect(cursorX, cursorY, destinationBox, destinationBox);
  let offset = (destinationBox - sourceBox) / 2;
  image(
    vid,
    cursorX,
    cursorY,
    destinationBox,
    destinationBox,
    cursorX + x + offset - destinationBox,
    cursorY + y + offset - destinationBox,
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

window.mobileAndTabletCheck = function () {
  let onMobile = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return onMobile;
};
