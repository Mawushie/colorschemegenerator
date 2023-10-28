const pickColorBtn = document.getElementById("color-btn");
const seedColor = document.getElementById("color-picker");
const colorMode = document.getElementById("scheme");
const colorsContainer = document.getElementById("colors-container");

let colorsArray = [];

const colorsHtml = (colors) => {
  colorsContainer.innerHTML = "";
  colors.forEach((color) => {
    colorsContainer.innerHTML += ` 
        <div>
            <div style="background-color:  ${color.hex.value}" class="color-div"  data-copy="${color.hex.value}"></div>
            <p data-copy="${color.hex.value}" class="copy-text"> ${color.hex.value}</p>
        </div>
    `;
  });
};

document.addEventListener("click", (e) => {
  if (e.target.dataset.copy) {
    copyText(e.target.dataset.copy);
  }
});
const copyText = (text) => {
  console.log(text);
  navigator.clipboard.writeText(text);
  alert(`Color code copied to clipboard`);
};

pickColorBtn.addEventListener("click", () => {
  let seed = seedColor.value;
  let mode = colorMode.value;
  let hexValue = seed.slice(1);
  // console.log("clicked", seed, mode);
  fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${mode}`)
    .then((res) => res.json())
    .then((data) => {
      colorsArray = data.colors;
      // console.log(colorsArray);
      colorsHtml(colorsArray);
      // console.log(data.colors[0].hex.value);
    });
});
