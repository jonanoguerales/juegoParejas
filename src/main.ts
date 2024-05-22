import {
  iniciaPartida,
  ParejaEncontrada,
  parejaNoEncontrada,
  sonPareja,
  VoltearLaCarta,
} from "./motor";
import { Carta, Tablero } from "./model";

const imagenes = document.querySelectorAll(".imgTarjeta");
const intentosUsuario = document.querySelector(".intentos");

let cartaVolteadaIndices: number[] = [];
let intentosFallidos: number = 0;

function cambiarUrl(event: MouseEvent, carta: Carta[]) {
  if (
    event.target !== null &&
    event.target !== undefined &&
    event.target instanceof HTMLImageElement &&
    cartaVolteadaIndices.length < 2
  ) {
    const imgClicada = event.target;

    const indiceStr = imgClicada.dataset.indiceId;
    const indice = indiceStr ? parseInt(indiceStr, 10) : undefined;

    if (indice !== undefined && carta[indice] && !carta[indice].estaVuelta) {
      VoltearLaCarta(Tablero, indice);
      imgClicada.src = carta[indice].imagen;
      cartaVolteadaIndices.push(indice);
      if (cartaVolteadaIndices.length === 2) {
        const [indice1, indice2] = cartaVolteadaIndices;
        if (sonPareja(indice1, indice2, Tablero)) {
          ParejaEncontrada(Tablero, indice1, indice2);
          cartaVolteadaIndices = [];
        } else {
          parejaNoEncontrada(Tablero, indice1, indice2);
          intentosFallidos++;
          if(intentosUsuario !== null && intentosUsuario !== undefined && intentosUsuario instanceof HTMLSpanElement){
            intentosUsuario.textContent = `Intentos fallidos:${intentosFallidos.toString() }`; 
          }
          setTimeout(() => {
            cartaVolteadaIndices.forEach((indice) => {
                imagenes[indice].setAttribute('src', '/ParteAtras.png');
            });
            cartaVolteadaIndices = [];
        }, 400);
        }
      }
    }else{
      alert("Ya has volteado esta tarjeta");
    }
  }
}

const divsImagenes = document.querySelectorAll(".tarjeta");

divsImagenes.forEach((imagen) => {
  imagen.addEventListener("click", (event) => {
    if (event !== null && event !== undefined && event instanceof MouseEvent) {
      cambiarUrl(event, Tablero.cartas);
    }
  });
});

const botonInicio = document.querySelector(".botonInicio");

botonInicio?.addEventListener("click", () => {
  iniciaPartida(Tablero);
  divsImagenes.forEach((divs) => {
    divs.classList.remove("deshabilitar");
  });
  imagenes.forEach(function (elemento: Element): void {
    if (elemento instanceof HTMLImageElement) {
      elemento.src = "/ParteAtras.png";
    }
  });
  intentosFallidos = 0; 
  if(intentosUsuario !== null && intentosUsuario !== undefined && intentosUsuario instanceof HTMLSpanElement){
    intentosUsuario.textContent = `Intentos fallidos:${intentosFallidos.toString() }`; 
  }
});
