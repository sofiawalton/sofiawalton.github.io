const BAUD_RATE = 9600;
let port, connectBtn;

function setup() {
  setupSerial();
  createCanvas(windowWidth, windowHeight);
  textFont("system-ui", 50);
  textAlign(CENTER, CENTER);
}

function draw() {
  const portIsOpen = checkPort();
  if (!portIsOpen) return;

  let str = port.readUntil("\n");
  if (str.length == 0) return;

  let values = str.trim().split(",");
  if (values.length < 2) return;

  let xVal = Number(values[0]);
  let yVal = Number(values[1]);

  let xPos = map(xVal, 0, 1023, 0, windowWidth);
  let yPos = map(yVal, 0, 1023, 0, windowHeight);
noStroke();
  fill("red");
  rect(0,0,windowHeight,windowWidth/3);

  fill("green");
  rect(0,windowWidth/3,windowHeight,windowWidth/3);

  fill("yellow");
  rect(0,(2*windowWidth/3,windowHeight,windowWidth/3));

  let shape = "";
    
  if (xVal < 400) {
    ellipse(xPos, yPos, 100, 100);
    shape = "circle";
    fill("red");
  } else if (xVal > 700) {
    rect(xPos - 50, yPos - 50, 100, 100);
    shape = "square";
    fill("green");
 } 
//else {
//     triangle(xPos, yPos - 50, xPos - 50, yPos + 50, xPos + 50, yPos + 50);
//     shape = "triangle";
//     fill("yellow");
//   }

  // Send shape command to Arduino
  port.write(shape + "\n");

  // Display text
  fill("black");
  text(`Shape: ${shape}`, windowWidth / 2, 50);
}

// Serial setup
function setupSerial() {
  port = createSerial();
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], BAUD_RATE);
  }
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(5, 5);
  connectBtn.mouseClicked(onConnectButtonClicked);
}

function checkPort() {
  if (!port.opened()) {
    connectBtn.html("Connect to Arduino");
    background("gray");
    return false;
  } else {
    connectBtn.html("Disconnect");
    return true;
  }
}

function onConnectButtonClicked() {
  if (!port.opened()) {
    port.open(BAUD_RATE);
  } else {
    port.close();
  }
}
