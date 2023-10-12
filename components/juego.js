// import { selectPoke } from "../index.js";
import { validarGanador } from "./final.js";

const url = "https://pokeapi.co/api/v2/pokemon";

// const cardPokeContainer = document.querySelector(".card-poke-container");
let userUno;
let userDos;

const turnOn = (x) => {
  // const userDos = document.querySelector("#user-dos");
  // const userUno = document.querySelector("#user-uno");
  if (x) {
    userUno.classList.toggle("turn-on");
    userDos.classList.toggle("turn-on");
  }
};

let contadorUserUno = 0;
let contadorUserDos = 0;
/***************************************************** */
// Guardo los id para validar
let idAValidar = [];
/***************************************************** */
let cards = [];
// let destapar = true;

const validar = (idsAValidar) => {
  if (idsAValidar[0] == idsAValidar[1]) {
    // Deberia llamar a una funcion que controle si el juego termino
    // console.log("son iguales");
    if (userUno.classList.contains("turn-on")) {
      contadorUserUno = contadorUserUno + 10;

      document.querySelector(".user-uno-puntaje").innerHTML = contadorUserUno;
    } else {
      contadorUserDos = contadorUserDos + 10;
      document.querySelector(".user-dos-puntaje").innerHTML = contadorUserDos;
    }
    validarGanador([contadorUserUno, userUno], [contadorUserDos, userDos]);
    // validarGanador(userUno, userDos);
    idAValidar = [];
    cards = [];
    turnOn(false);
    destapar = true;
    // startGame((destapar = true));
  } else {
    // console.log("no son iguales");
    setTimeout(() => {
      cards[0].classList.remove("taping");
      cards[1].classList.remove("taping");
      cards = [];
      idAValidar = [];
      turnOn(true);
      destapar = true;
    }, 2000);
  }
  // Chequeando la bandera para habilitar destapar o no
};
let destapar;
const startGame = () => {
  contadorUserDos = 0;
  contadorUserUno = 0;
  contadorRenderPoke = 0;
  idAValidar = [];

  const cardPokeContainer = document.querySelector(".card-poke-container");
  // console.log(cardPokeContainer);
  cardPokeContainer.addEventListener("click", (e) => {
    // console.log(e.target);
    if (destapar) {
      if (
        e.target.id.length == 1 ||
        e.target.id.length == 2 ||
        e.target.id.length == 3
      ) {
        e.target.classList.add("taping");
        cards.push(e.target);

        idAValidar.push(e.target.id);
        if (idAValidar.length == 2) {
          destapar = false;

          validar(idAValidar);
        }
      }
    }
  });
};

let contadorRenderPoke = 0;

const renderPoke = (imgPoke, id) => {
  // console.log(imgPoke);
  // contadorRenderPoke = 0;
  const article = document.createElement("article");
  article.classList.add("card-poke");
  article.id = id;
  article.innerHTML = `
  <div id=${id} class="dorso-card"></div>
  
  <div class="card-poke-img">
  <img
            src="${imgPoke}"
            alt=""
            class="poke-img"
            />
            </div>
            
            `;
  const cardPokeContainer = document.querySelector(".card-poke-container");

  cardPokeContainer.appendChild(article);
  /********************************************** */
  contadorRenderPoke++;

  if (id == "") {
    selectPoke();
  }

  if (contadorRenderPoke == 16) {
    destapar = true;
    startGame();
  }
};

const indicePoke = () => {
  let indices = [];
  for (let i = 1; i <= 8; i++) {
    const num = Math.floor(Math.random() * 150);
    if (!indices.includes(num)) {
      indices.push(num);
    } else {
      i--;
    }
  }

  let posiciones = [];
  for (let i = 0; i <= 15; i++) {
    const num = Math.floor(Math.random() * 100);
    if (num < 16 && !posiciones.includes(num)) {
      posiciones.push(num);
    } else {
      i--;
    }
  }

  return [posiciones, [...indices, ...indices]];
};

export const selectPoke = async () => {
  contadorRenderPoke = 0;
  const posiciones = indicePoke();
  const indices = posiciones[0];
  const poke = posiciones[1];
  for (let i = 0; i <= 15; i++) {
    try {
      const response = await fetch(url + `/${poke[indices[i]]}`);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      // console.log(response);
      const imagen = await response.json();
      // console.log(imagen);

      const imgPoke = imagen.sprites.other.home.front_default;
      const id = imagen.id;
      renderPoke(imgPoke, id);
    } catch (err) {
      i--;
    }
  }
};

export function renderJuego(jugadorUno, jugadorDos, el) {
  const containerJuego = document.createElement("div");
  const buttonsContainer = document.createElement("div");

  buttonsContainer.innerHTML = `
  
  <button class="button-poke" value="electric">
    <span class="texto-btn">Jugar</span>
  </button>

  `;
  buttonsContainer.classList.add("buttons-container");
  containerJuego.classList.add("container-general");

  containerJuego.innerHTML = `
  
  
      <div class="card-poke-container"></div>
      <div class="marcador">
        <div id="user-uno" class="user-uno">
          <p class="nombre-user">${jugadorUno}</p>
          <div class="puntaje user-uno-puntaje">0</div>
        </div>
        <div id="user-dos" class="user-dos">
          <p class="nombre-user">${jugadorDos}</p>
          <div class="puntaje user-dos-puntaje">0</div>
        </div>
      </div>
   
  `;

  const elementoExistente = el.querySelector("*");
  if (elementoExistente) {
    el.replaceChild(containerJuego, elementoExistente);
  } else {
    el.appendChild(containerJuego);
  }
  el.appendChild(buttonsContainer);

  const button = buttonsContainer.querySelector(".button-poke");

  const containerGeneral = el.querySelector(".container-general");

  userDos = document.querySelector("#user-dos");
  userUno = document.querySelector("#user-uno");

  userUno.classList.add("turn-on");
  turnOn();

  button.addEventListener("click", () => {
    containerGeneral.style.display = "flex";
    buttonsContainer.style.display = "none";

    selectPoke();
  });
}
