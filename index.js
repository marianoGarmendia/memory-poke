const url = "https://pokeapi.co/api/v2/pokemon";

//Las imagenes estan en > res > home > front default

// fetch(url + "/25")
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res.sprites.other.home.front_default);
//     console.log(res);
//   });

const renderPoke = (imgPoke, id) => {
  // console.log(imgPoke);
  const article = document.createElement("article");
  article.classList.add("card-poke");
  article.id = id;
  article.innerHTML = `
  <div class="dorso-card"><span class="dorso-card-title">Memory Poke</span></div>

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

  const cards = Array.from(cardPokeContainer.children);
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const dorsoCard = card.firstElementChild;
      const dorsoCardTitle = dorsoCard.firstElementChild;

      dorsoCard.classList.add("taping");
      dorsoCardTitle.classList.add("taping");
      setTimeout(() => {
        dorsoCard.classList.remove("taping");
        dorsoCardTitle.classList.remove("taping");
      }, 4000);
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
        const id = data.id;

        renderPoke(imgPoke, id);
      });
  }
};

const button = document.querySelector(".button-poke");
button.addEventListener("click", () => {
  selectPoke();
});
