import { Carta, Tablero } from "./model";

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const cartasBarajadas = [...cartas];
  for (let i = cartasBarajadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasBarajadas[i], cartasBarajadas[j]] = [
      cartasBarajadas[j],
      cartasBarajadas[i],
    ];
  }
  return cartasBarajadas;
};

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
let cartasVolteadas = 0;
const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  if (
    !tablero.cartas[indice].encontrada &&
    !tablero.cartas[indice].estaVuelta &&
    cartasVolteadas <= 2
  ) {
    cartasVolteadas++;
    return true;
  }

  return false;
};

export const VoltearLaCarta = (tablero: Tablero, indice: number): void => {
  const sePuedeVoltear = sePuedeVoltearLaCarta(tablero, indice);
  if (sePuedeVoltear === true) {
    tablero.cartas[indice].estaVuelta = true;
  }
};

/*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
export const ParejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;

  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";
    alert("Partida Completa");
  }
};

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  cartasVolteadas = 0;
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.cartas = barajarCartas(tablero.cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  })
};
