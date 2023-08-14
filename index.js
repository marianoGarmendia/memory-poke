const url = "https://pokeapi.co/api/v2/pokemon";

//Las imagenes estan en > res > home > front default

// fetch(url + "/25")
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res.sprites.other.home.front_default);
//     console.log(res);
//   });

const renderPoke = (imgPoke) => {
  console.log(imgPoke);
  const article = document.createElement("article");
  article.classList.add("card-poke");
  article.innerHTML = `
  <div class="dorso-card"></div>

  <div class="card-poke-img">
          <img
            src="${imgPoke}"
            alt=""
            class="poke-img"
          />
        </div>
        
  `;
  const cardPokeContainer = document.querySelector(".card-poke-container");
  // console.log(cardPokeContainer);
  cardPokeContainer.appendChild(article);
  // const main = document.querySelector(".card-poke-container").children;
  const cards = Array.from(cardPokeContainer.children);
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const dorsoCard = card.firstElementChild;
      dorsoCard.classList.add("taping");
      setTimeout(() => {
        dorsoCard.classList.remove("taping");
      }, 3000);
      console.log(dorsoCard.classList);
    });
  });
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
  console.log(posiciones);
  return [posiciones, [...indices, ...indices]];
};

const selectPoke = () => {
  const posiciones = indicePoke();
  const indices = posiciones[0];
  const poke = posiciones[1];
  for (let i = 0; i <= 15; i++) {
    fetch(url + `/${poke[indices[i]]}`)
      .then((res) => res.json())
      .then((data) => {
        const imgPoke = data.sprites.other.home.front_default;
        console.log(imgPoke);
        renderPoke(imgPoke);
      });
  }
};

const button = document.querySelector(".button-poke");
button.addEventListener("click", () => {
  const num = Math.floor(Math.random() * 100);
  console.log(num);
  selectPoke();
});
