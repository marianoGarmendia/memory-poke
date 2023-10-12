import { inicioComponent } from "./components/inicio.js";

function main() {
  const indexContainer = document.querySelector(".index-container");
  inicioComponent(indexContainer);
  // startGame();
}
main();

// console.log(inicioComponent);

// const url = "https://pokeapi.co/api/v2/pokemon";

// const cardPokeContainer = document.querySelector(".card-poke-container");

//Las imagenes estan en > res > home > front default

// fetch(url + "/25")
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res.sprites.other.home.front_default);
//     console.log(res);
//   });

// const renderPoke = (imgPoke, id) => {
//   // console.log(imgPoke);
//   const article = document.createElement("article");
//   article.classList.add("card-poke");
//   article.id = id;
//   article.innerHTML = `
//   <div id=${id} class="dorso-card"><p class="dorso-card-title">Pokemon</p></div>

//   <div class="card-poke-img">
//   <img
//             src="${imgPoke}"
//             alt=""
//             class="poke-img"
//             />
//             </div>

//             `;
//   const cardPokeContainer = document.querySelector(".card-poke-container");

//   cardPokeContainer.appendChild(article);
// };
//********************************* */
//Contador para user Uno
// let contadorUserUno = 0;
// let contadorUserDos = 0;
/***************************************************** */
// Guardo los id para validar
// let idAValidar = [];
/***************************************************** */
// const turnOn = (x) => {
//   if (x) {
//     userUno.classList.toggle("turn-on");
//     userDos.classList.toggle("turn-on");
//   }
// };

// const validar = (idsAValidar) => {
//   if (idsAValidar[0] == idsAValidar[1]) {
//     console.log("son iguales");
//     if (userUno.classList.contains("turn-on")) {
//       contadorUserUno = contadorUserUno + 10;
//       document.querySelector(".user-uno-puntaje").innerHTML = contadorUserUno;
//     } else {
//       contadorUserDos = contadorUserDos + 10;
//       document.querySelector(".user-dos-puntaje").innerHTML = contadorUserDos;
//     }
//     idAValidar = [];
//     cards = [];
//     turnOn(false);
//   } else {
//     console.log("no son iguales");
//     setTimeout(() => {
//       cards[0].classList.remove("taping");
//       cards[1].classList.remove("taping");
//       cards = [];
//       idAValidar = [];
//       turnOn(true);
//     }, 2000);
//   }
// };

// // Inicializo el turno en el user uno, podria hacerlo en una funcion en el modulo de vista
// const userDos = document.querySelector("#user-dos");
// const userUno = document.querySelector("#user-uno");

// userUno.classList.add("turn-on");
// turnOn();

// /********************************************** */
// let cards = [];
// cardPokeContainer.addEventListener("click", (e) => {
//   if (e.target.id.length == 2 || e.target.id.length == 3) {
//     // console.log(typeof e.target.id);
//     e.target.classList.add("taping");
//     cards.push(e.target);
//     // console.log(cards);
//     idAValidar.push(e.target.id);
//   }

//   // console.log(idAValidar.length);
//   if (idAValidar.length == 2) {
//     console.log(idAValidar);
//     validar(idAValidar);
//   }
// });

// const indicePoke = () => {
//   let indices = [];
//   for (let i = 1; i <= 8; i++) {
//     const num = Math.floor(Math.random() * 150);
//     if (!indices.includes(num)) {
//       indices.push(num);
//     } else {
//       i--;
//     }
//   }

//   let posiciones = [];
//   for (let i = 0; i <= 15; i++) {
//     const num = Math.floor(Math.random() * 100);
//     if (num < 16 && !posiciones.includes(num)) {
//       posiciones.push(num);
//     } else {
//       i--;
//     }
//   }

//   return [posiciones, [...indices, ...indices]];
// };

// export const selectPoke = () => {

//   const posiciones = indicePoke();
//   const indices = posiciones[0];
//   const poke = posiciones[1];
//   for (let i = 0; i <= 15; i++) {
//     fetch(url + `/${poke[indices[i]]}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const imgPoke = data.sprites.other.home.front_default;
//         const id = data.id;

//         renderPoke(imgPoke, id);
//       });
//   }
// };
