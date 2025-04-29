const form = document.querySelector("form");
const buttonInit = document.getElementById("buttonInit");
const numbersTotal = document.getElementById("qtdnumbers");
const numberInitial = document.getElementById("initNumber");
const numberFinale = document.getElementById("finaleNumber");
const containerResult = document.querySelector(".containerResult");
const boxToggle = document.querySelector(".boxToggle");
const radioRepeat = document.getElementsByName("repeatNumber");

let numbers = [];
let totalResults = 0;
let repeat;
let total;
let min;
let max;

boxToggle.addEventListener("click", () => {
  radioRepeat.forEach((radio) => {
    if (radio.value === "not") {
      boxToggle.style.justifyContent = "end";
      radio.value = "yes";
      radio.checked = true;
    } else if (radio.value === "yes") {
      boxToggle.style.justifyContent = "start";
      radio.value = "not";
      radio.checked = false;
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const repeatNumber = document.querySelector("input[name=repeatNumber]");

  repeat = String(repeatNumber.value);
  total = numbersTotal.value;
  min = numberInitial.value;
  max = numberFinale.value;

  if (!total || total <= 0 || !min || !max) {
    alert("Digite os valores!");
  } else if (isNaN(total) || isNaN(min) || isNaN(max)) {
    alert("Somente números!");
  } else if ((total > max) & (repeat === "yes")) {
    alert(
      "O total de números não pode ser menor que o máximo quando não se pode repetir números!"
    );
  } else {
    total = Number(total);
    min = Number(min);
    max = Number(max);

    createNumbers({ total, min, max, repeat });
    createContainerResult();
  }
});

function createNumbers({ total, min, max, repeat }) {
  numbers = [];

  for (let i = 0; i < total; i++) {
    const number = sortNumber({ min, max });

    if (repeat === "yes" && numbers.includes(number)) {
      i--;
    } else {
      numbers.push(number);
    }
  }
}

function createContainerResult() {
  totalResults += 1;
  containerResult.innerHTML = "";

  const boxResult = document.createElement("div");
  const header = document.createElement("header");
  const h2 = document.createElement("h2");
  const span = document.createElement("span");
  const results = document.createElement("div");
  const button = document.createElement("button");
  const descButton = document.createElement("span");
  const img = document.createElement("img");

  h2.textContent = "RESULTADO DO SORTEIO";
  span.textContent = `${totalResults}° RESULTADO`;
  header.append(h2, span);

  results.setAttribute("class", "results");

  for (let x = 0; x < numbers.length; x++) {
    const spanResult = document.createElement("span");

    spanResult.setAttribute("class", "result");
    spanResult.textContent = numbers[x];

    results.append(spanResult);
  }

  descButton.textContent = "SORTEAR NOVAMENTE";
  img.setAttribute("src", "./assets/play_sort.svg");
  img.setAttribute("alt", "reload");
  button.setAttribute("type", "button");
  button.className = "buttonReload";
  button.append(descButton, img);

  button.addEventListener("click", () => {
    createNumbers({ total, min, max, repeat });
    createContainerResult();
  });

  boxResult.setAttribute("class", "boxResults");
  boxResult.append(header, results, button);

  containerResult.append(boxResult);
}

function sortNumber({ min, max }) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
