var orig_img = null;
var gray_img = null;
var red_img = null;
var rbow_img = null;
var canvas;
function upload() {
  var file = document.getElementById("f1");
  orig_img = new SimpleImage(file);
  canvas = document.getElementById("can");
  orig_img.drawTo(canvas);
  gray_img = orig_img;
  red_img = orig_img;
  rbow_img = orig_img;
}
function makeGray() {
  if(imageIsLoaded(gray_img)) {
     applyGrayScale();
     gray_img.drawTo(canvas);
  }
}
function applyGrayScale() {
  for(var pixel of gray_img.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  return gray_img;
}
function makeRed() {
  if(imageIsLoaded(red_img)) {
     applyRed();
     red_img.drawTo(canvas); 
  }
}
function applyRed() {
  for(var pixel of red_img.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if(avg < 128) {
     pixel.setRed(2*avg);
     pixel.setGreen(0);
     pixel.setBlue(0);
    }
    else {
     pixel.setRed(255);
     pixel.setGreen((2*avg)-255);
     pixel.setBlue((2*avg)-255);
    }
  }
  return red_img;
}
function makeRainbow() {
  if(imageIsLoaded(rbow_img)) {
     applyRbow();
     rbow_img.drawTo(canvas); 
  }
}
function applyRbow() {
  for(var pixel of rbow_img.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    var y = pixel.getY();
    var h = rbow_img.getHeight();
    if(y <= h/7) {
      makeColorFilter(pixel,avg,255,0,0);
    }
//make color red
    if (y > h / 7 && y <= (h * 2) / 7) {
      makeColorFilter(pixel, avg, 255, 155, 0); //make color orange
    }
    if (y > (h * 2) / 7 && y <= (h * 3) / 7) {
      makeColorFilter(pixel, avg, 255, 255, 0); //make color yellow
    }
    if (y > (h * 3) / 7 && y <= (h * 4) / 7) {
      makeColorFilter(pixel, avg, 0, 255, 0); //make color green
    }
    if (y > (h * 4) / 7 && y <= (h * 5) / 7) {
      makeColorFilter(pixel, avg, 0, 0, 255); //make color blue
    }
    if (y > (h * 5) / 7 && y <= (h * 6) / 7) {
      makeColorFilter(pixel, avg, 75, 0, 130); //make color indigo
    }
    if (y > (h * 6) / 7) {
      makeColorFilter(pixel, avg, 155, 0, 255); 
  }
}
}
function makeColorFilter(pixel, avg, Rc, Gc, Bc) {
  if (avg < 128) {
    pixel.setRed((Rc / 127.5) * avg);
    pixel.setGreen((Gc / 127.5) * avg);
    pixel.setBlue((Bc / 127.5) * avg);
  } else {
    pixel.setRed((2 - Rc / 127.5) * avg + 2 * Rc - 255);
    pixel.setGreen((2 - Gc / 127.5) * avg + 2 * Gc - 255);
    pixel.setBlue((2 - Bc / 127.5) * avg + 2 * Bc - 255);
  }
}
function imageIsLoaded(img) {
  if(img==null || !img.complete()) {
    alert("Image is not loaded");
    return false;
  }
  else {
    return true;
  }
}
function reset() {
 if(imageIsLoaded(orig_img)) {
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  gray_img = orig_img;
  red_img = orig_img;
 } 
 else {
    alert("Please load the image");
  }
}