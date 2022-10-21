var started;
var button;
var vid;

function start(){
  if (started==false){
  userStartAudio();
  started=true;
  vid.play();
  }
}

function setup() {
createCanvas(windowWidth, windowHeight);
  getAudioContext().suspend();
  button = createButton('start');
  button.position(100,100);
  button.mousePressed(start);
  started=false;
}

function draw() {

}
