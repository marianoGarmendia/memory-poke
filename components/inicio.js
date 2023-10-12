import { renderJuego } from "./juego.js";

export function inicioComponent(el) {
  const container = document.createElement("div");
  container.classList.add("container-inicio");
  container.innerHTML = `
  
  <div class="ingresar-nombre">
    <p class="texto-ingresar-nombre">
      Ingresa el nombre del Jugador/a N° 1
    </p>
    <input
      type="text"
      name="nombre"
      placeholder="Ingresa tu nombre 😉"
      class="input"
    />
    <button class="guardar-jugador-btn">Guardar</button>
  </div>


`;
  const elementoExistente = el.querySelector("*");

  if (elementoExistente) {
    el.replaceChild(container, elementoExistente);
  } else {
    el.appendChild(container);
  }

  const inputEl = el.querySelector(".input");
  const btnGuardarEl = el.querySelector(".guardar-jugador-btn");
  btnGuardarEl.disabled = true;
  btnGuardarEl.style.backgroundColor = "lightgray";
  let typingTimer;

  // Habilita el boton una vez que ha dejado de tipear el nombre
  inputEl.addEventListener("input", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      //   console.log(inputEl.value);
      btnGuardarEl.disabled = false;
      btnGuardarEl.style.backgroundColor = "";
    }, 1000);
  });

  let jugadorUno;
  let jugadorDos;
  let turnoJugadorUno = true;
  const textoPregunta = container.querySelector(".texto-ingresar-nombre");

  btnGuardarEl.addEventListener("click", () => {
    if (inputEl.value != "") {
      if (turnoJugadorUno) {
        jugadorUno = inputEl.value;
        inputEl.value = "";
        textoPregunta.textContent = "Ingresa el nombre del Jugador/a N° 2";
        turnoJugadorUno = false;
        setTimeout(() => {
          btnGuardarEl.disabled = true;
          btnGuardarEl.style.backgroundColor = "lightgray";
        }, 600);
      } else {
        jugadorDos = inputEl.value;
        inputEl.value = "";
        renderJuego(jugadorUno, jugadorDos, el);
      }
    } else {
    }
  });
}
