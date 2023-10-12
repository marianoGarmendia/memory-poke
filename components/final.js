import { renderJuego } from "./juego.js";
import { inicioComponent } from "./inicio.js";

let playerUno;
let playerDos;

const renderGanador = (ganador) => {
  const indexContainer = document.querySelector(".index-container");
  const finalContainer = document.createElement("div");
  finalContainer.classList.add("final-container");
  if (ganador != null) {
    finalContainer.innerHTML = `
        <div class="card-final">
        <p class="texto-resultado-final">
          ¡Ganaste<br />
          ${ganador}!
        </p>
        <div class="buttons-container-final">
          <button id="repetir-partida" class="boton-empezar-de-nuevo button-poke">Repetir partida</button>
          <button  id="volver-inicio" class="boton-empezar-de-nuevo button-poke">Volver a inicio</button>
        </div>
      </div>
        `;
  } else {
    finalContainer.innerHTML = `
        <div class="card-final">
        <p class="texto-resultado-final">
          ¡Empate! <br />
          A jugar la revancha
        </p>
        <div class="buttons-container-final">
          <button id="repetir-partida" class="boton-empezar-de-nuevo button-poke">Repetir partida</button>
          <button  id="volver-inicio" class="boton-empezar-de-nuevo button-poke">Volver a inicio</button>
        </div>
      </div>
        `;
  }
  const elementoExistente = indexContainer.querySelector("*");
  if (elementoExistente) {
    indexContainer.replaceChild(finalContainer, elementoExistente);
  }
  const button = finalContainer.querySelector(".buttons-container-final");

  button.addEventListener("click", (e) => {
    if (e.target.id == "repetir-partida") {
      renderJuego(playerUno, playerDos, indexContainer);
    } else if (e.target.id == "volver-inicio") {
      inicioComponent(indexContainer);
    }
  });
};
// debo recibir el contador y los user
export function validarGanador(
  [contadorUserUno, userUno],
  [contadorUserDos, userDos]
) {
  playerUno = userUno.querySelector(".nombre-user").textContent;
  playerDos = userDos.querySelector(".nombre-user").textContent;

  const puntajeTotal = contadorUserUno + contadorUserDos;

  if (puntajeTotal >= 80) {
    if (contadorUserUno > contadorUserDos) {
      setTimeout(() => {
        renderGanador(playerUno);
      }, 800);
    } else if (contadorUserUno == contadorUserDos) {
      setTimeout(() => {
        renderGanador(null);
      }, 800);
    } else {
      setTimeout(() => {
        renderGanador(playerDos);
      }, 800);
    }
  }
}
