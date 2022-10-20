let phase = 0;
let zoff = 0;
var mic, vol, fft, bass, mid, treble;
var prevVol, prevTreb, prevMid, prevBass;
var firstTreb, firstMid,firstBass;
var a=0;
var x=0;
var y=0;
var button;
var started;

var capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  getAudioContext().suspend();
  button = createButton('start');
  button.position(windowWidth/2, 50);
  //button.mousePressed(userStartAudio);
  started = false;
  
  function start(){
  userStartAudio();
  started=true;
  }
  
  button.mousePressed(start);
  
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  vol = mic.getLevel();
  //frameRate(10);
  background(0);
  
  prevTreb=createVector(0,0);
  prevBass=createVector(0,0);
  prevMid=createVector(0,0);
  
  firstTreb=createVector(200,0); // makes vector for first point of circle, must add for each circle
  firstMid=createVector(200,0);
  firstBass=createVector(200,0);
}

  
  function draw(){   
    
                   if (started==true){
  
  vol = mic.getLevel();
  let fftanalyze = fft.analyze();
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");
  treble = fft.getEnergy("treble");
  
  translate(windowWidth/2, windowHeight/2);
  
  //beginShape TREBLE();
  let treblemax = map(treble, 0, 255, 0, 400); //can adjust where necessary
    rotate(PI/2*3);
    xoff = map(cos(a+phase), -1, 5, 0, treblemax);
    yoff = map(sin(a), -1, 5, 0, treblemax);
    r = treblemax+200;
    x = r * cos(a);
    y = r * sin(a);
    stroke((255),random(200,210),random(0,130)); //add variating colour
    strokeWeight(2);
    
    if (a==0){ // no line from center to radius
    noStroke()}
    
    if (a<=TWO_PI){ // stop drawing at 360 degrees
    line(x, y, prevTreb.x, prevTreb.y);
    prevTreb.x=x;
    prevTreb.y=y;}
    
    if (a>=TWO_PI){ // close shape by drawing to vect. 'first point'
    rotate();
    line(firstTreb.x, firstTreb.y, prevTreb.x, prevTreb.y)} // correct to Treb not Mid
  //endShape(CLOSE);
  
  //beginShape MID();
  let midmax = map(mid, 0, 255, 0, 200); //can adjust where necessary
    //rotate(PI/2*3);
    xoff = map(cos(a+phase), -1, 5, 0, midmax);
    yoff = map(sin(a), -1, 5, 0, midmax);
    r = midmax+200;
    x = r * cos(a);
    y = r * sin(a);
    stroke((255),random(200,210),random(0,130));
    //stroke(gold);
    //stroke(255,0,0);
    strokeWeight(3.5);
    
    if (a==0){ // no line from center to radius
    noStroke()}
    
    if (a<=TWO_PI){ // stop drawing at 360 degrees
    line(x, y, prevMid.x, prevMid.y);
    prevMid.x=x;
    prevMid.y=y;}
    
    if (a>=TWO_PI){ // close shape by drawing to vect. 'first point'
    rotate();
    line(firstMid.x, firstMid.y, prevMid.x, prevMid.y)} // correct to Treb not Mid
  //endShape(CLOSE);
  
  //beginShape BASS();
  let bassmax = map(bass, 0, 255, 0, 200); //can adjust where necessary
    //rotate(PI/2*3);
    xoff = map(cos(a+phase), -1, 5, 0, bassmax);
    yoff = map(sin(a), -1, 5, 0, bassmax);
    r = bassmax+200;
    x = r * cos(a);
    y = r * sin(a);
    stroke((255),random(200,210),random(0,130)); //add variating colour
    //stroke(gold);
    //stroke(255,0,0);
    //stroke((255),random(200,225),random(0,220)); //add variating colour
    strokeWeight(4.5);
    
    if (a==0){ // no line from center to radius
    noStroke()}
    
    if (a<=TWO_PI){ // stop drawing at 360 degrees
    line(x, y, prevBass.x, prevBass.y);
    prevBass.x=x;
    prevBass.y=y;}
    
    if (a>=TWO_PI){ // close shape by drawing to vect. 'first point'
    rotate();
    line(firstBass.x, firstBass.y, prevBass.x, prevBass.y)} // correct to Treb not Mid
    //endShape(CLOSE);
  
  phase += 1;
  a+=0.1/10;
  
}

//push();
//  translate(width,0);
//  scale(-1, 1);
//  image(capture, 0, 0, windowWidth, windowHeight);
//  pop();
}
