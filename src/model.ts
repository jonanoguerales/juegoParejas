export interface Carta {
  idFoto: number; // id del 1 al 6 para 12 cartas, así identificamos rápido si es un gatito ,un perrito...
  // el ID se repete 2 veces en el array de cartas (hay dos cartas de un perro, hay dos cartas de un gato)
  imagen: string; // por comodidad repetimos la url de la imagen
  estaVuelta: boolean;
  encontrada: boolean;
}

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const infoCartas: InfoCarta[] = [
  /* Aquí ponemos seis cartas siguiendo la interfaz de InfoCarta */
];
for (var i = 1; i <= 6; i++) {
  const url =
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/" +
    i +
    ".png";
  const idFoto = i;

  const carta: InfoCarta = {
    idFoto: idFoto,
    imagen: url,
  };
  infoCartas.push(carta);
}

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  const cartas: Carta[] = [];
  for (const infoCarta of infoCartas) {
    cartas.push(crearCartaInicial(infoCarta.idFoto, infoCarta.imagen));
    cartas.push(crearCartaInicial(infoCarta.idFoto, infoCarta.imagen));
  }
  return cartas;
  //Aquí crearemos un array de cartas a partir de un array de infoCartas y duplicaremos las cartas para que haya dos de cada tipo.
};

export let Cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

/*
  Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
  EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
*/

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}

const crearTableroInicial = (): Tablero => ({
  cartas: Cartas,
  estadoPartida: "PartidaNoIniciada",
});

export let Tablero: Tablero = crearTableroInicial();
