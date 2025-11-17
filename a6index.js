const BAUD_RATE = 9600; // This should match the baud rate in your Arduino sketch

let port, connectBtn; // Declare global variables

function setup() {
  setupSerial(); // Run our serial setup function (below)

  // Create a canvas that is the size of our browser window.
  // windowWidth and windowHeight are p5 variables
  createCanvas(windowWidth, windowHeight);

  // p5 text settings. BOLD and CENTER are constants provided by p5.
  // See the "Typography" section in the p5 reference: https://p5js.org/reference/
  textFont("system-ui", 50);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
}
function draw() {
  const portIsOpen = checkPort(); // Check whether the port is open (see checkPort function below)
  if (!portIsOpen) return; // If the port is not open, exit the draw loop

  let str = port.readUntil("\n"); // Read from the port until the newline
  if (str.length == 0) return; // If we didn't read anything, return.

  // trim the whitespace (the newline) and convert the string to a number
  let values = str.trim().split(","); // Split the string into an array
  if (values.length < 2) return; // If we don't have two values, return

    const xValue = Number(values[0]);
    const yValue = Number(values[1]);

    // Map the joystick values to the canvas size
    const xPos = map(xValue, 0, 1023, 0, windowWidth);
    const yPos = map(yValue, 0, 1023, 0, windowHeight);

    // Clear the background
    background("black");
    fill("white");
  

    let shape = "";
    if (xValue < 341) {
        ellipse(xPos, yPos, 100, 100); // Draw circle
        shape = "Circle";
    } else if (xValue < 682) {
        rect(xPos - 50, yPos - 50, 100, 100); // Draw square
        shape = "Square";
    } else {
        triangle(xPos, yPos - 58, xPos - 50, yPos + 29, xPos + 50, yPos + 29); // Draw triangle
        shape = "Triangle";
    }

    port.write(shape + "\n"); // Send the shape name back to Arduino
    
    // Display the shape name
    fill("white");
    text(shape, windowWidth / 2, 50);
}
// Three helper functions for managing the serial connection.

function setupSerial() {
  port = createSerial();

  // Check to see if there are any ports we have used previously
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    // If there are ports we've used, open the first one
    port.open(usedPorts[0], BAUD_RATE);
  }

  // create a connect button
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(5, 5); // Position the button in the top left of the screen.
  connectBtn.mouseClicked(onConnectButtonClicked); // When the button is clicked, run the onConnectButtonClicked function
}

function checkPort() {
  if (!port.opened()) {
    // If the port is not open, change button text
    connectBtn.html("Connect to Arduino");
    // Set background to gray
    background("gray");
    return false;
  } else {
    // Otherwise we are connected
    connectBtn.html("Disconnect");
    return true;
  }
}

function onConnectButtonClicked() {
  // When the connect button is clicked
  if (!port.opened()) {
    // If the port is not opened, we open it
    port.open(BAUD_RATE);
  } else {
    // Otherwise, we close it!
    port.close();
  }
}
