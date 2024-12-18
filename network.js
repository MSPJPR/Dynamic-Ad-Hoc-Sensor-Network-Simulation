const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
const nodes = [];

// Add Node with Power Level
function addNode() {
  const newNode = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    power: 100  // Initial power level
  };
  nodes.push(newNode);
  drawNodes();
}

// Remove Last Node
function removeNode() {
  if (nodes.length > 0) {
    nodes.pop();
    drawNodes();
  }
}

// Draw Nodes with Power Levels
function drawNodes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fillText(`P: ${node.power}`, node.x - 10, node.y - 15);
  });
}

// Simulate Connections and Power Drain
function simulate() {
  drawNodes();
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      // Draw a line between nodes
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.strokeStyle = 'green';
      ctx.stroke();

      // Simulate power drain
      nodes[i].power -= 1;
      nodes[j].power -= 1;
    }
  }
  updateInfo();
}

// Reset Network
function reset() {
  nodes.length = 0;
  drawNodes();
  updateInfo();
}

// Update Info Display
function updateInfo() {
  const info = document.getElementById('info');
  if (nodes.length === 0) {
    info.textContent = 'No nodes in the network.';
  } else {
    info.textContent = `Total Nodes: ${nodes.length}`;
  }
}
