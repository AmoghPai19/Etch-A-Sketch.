const container = document.querySelector('.container');
const btn=document.querySelector('#reset-button');
const colorButtons = document.querySelectorAll(".color-btn");
let isDrawing = false;
document.addEventListener("mousedown", () => {
  isDrawing = true;
});

document.addEventListener("mouseup", () => {
  isDrawing = false;
});



let currentColor = "gray";

colorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentColor = btn.dataset.color;
  });
});


console.log(container);
// Initial grid
createGrid(16);

// Button click
btn.addEventListener("click", () => {
  let size = prompt("Enter grid size (max 100):");

  size = Number(size);

  if (!size || size > 100) {
    alert("Please enter a number between 1 and 100");
    return;
  }

  createGrid(size);
});


// =========================
// Core function
// =========================
function createGrid(size) {
  // 1️⃣ Clear old grid
  container.innerHTML = "";

  // 2️⃣ Calculate square size
  const squareSize = 720 / size;

  // 3️⃣ Create squares
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // 4️⃣ Hover effect
    square.dataset.darkness = 0;

    square.addEventListener("mouseenter", () => {
        if (!isDrawing) return;
        let darkness = Number(square.dataset.darkness);

        if (darkness >= 10) return;

        darkness += 1;
        square.dataset.darkness = darkness;

        const shade = 255 - darkness * 25;
        square.style.backgroundColor = currentColor;
        

        if (currentColor === "gray") {
        square.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;   
        } else if (currentColor === "red") {
        square.style.backgroundColor = `rgb(255, ${shade}, ${shade})`;   
        } else if (currentColor === "blue") {
        square.style.backgroundColor = `rgb(${shade}, ${shade}, 255)`;   
        }
        });



        container.appendChild(square);
    }
}