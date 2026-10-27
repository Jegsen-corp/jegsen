/*
 * La mascotte de Jegsen : une mésange bleue en pixel art, volontairement simple pour rester nette à toutes
 * les tailles. Couleurs de la charte : bleu de la marque, blanc, bleus pâles, contour bleu nuit.
 * Grilles de caractères : chaque lettre est un pixel, « . » est vide.
 */

export const MASCOT_PALETTE: Record<string, string> = {
  N: "#1d2440",
  n: "#2440c8",
  B: "#3355ff",
  b: "#9fb1ff",
  W: "#ffffff",
  w: "#dfe5ff",
  K: "#0b0d12",
  s: "#ffffff",
}

/** Posée, de profil, tournée vers la gauche. */
export const MASCOT_STANDING = [
  ".......NNNNNN.......",
  ".....NNBBBBBBNN.....",
  "....NBBbbBBBBBBN....",
  "...NBBbBBBBBBBBBN...",
  "...NBBBBBBBBBBBBN...",
  "..NWWWWWWWWWWWBBBN..",
  "..NWWWsKWWWWWWWBBN..",
  "NNNWWWKKWWWWWWWBBN..",
  ".NNWWWWWWWWWWWBBBBN.",
  "...NWWWWWWWWWBBBBBBN",
  "...NWWWWWWWWBBBBBnnN",
  "...NWWWWWWWBWWWWBnN.",
  "...NWWWWWWWBBBBBnnN.",
  "...NwWWWWWWWBBBnN...",
  "....NwWWWWWWWBBN....",
  ".....NwwwWWWWNN.....",
  "......NNwwwwN.......",
  "........NNNN........",
  "........N..N........",
  ".......NN.NN........",
]

/** Posée, œil fermé (clignement). */
export const MASCOT_BLINK = [
  ".......NNNNNN.......",
  ".....NNBBBBBBNN.....",
  "....NBBbbBBBBBBN....",
  "...NBBbBBBBBBBBBN...",
  "...NBBBBBBBBBBBBN...",
  "..NWWWWWWWWWWWBBBN..",
  "..NWWWWWWWWWWWWBBN..",
  "NNNWWWKKWWWWWWWBBN..",
  ".NNWWWWWWWWWWWBBBBN.",
  "...NWWWWWWWWWBBBBBBN",
  "...NWWWWWWWWBBBBBnnN",
  "...NWWWWWWWBWWWWBnN.",
  "...NWWWWWWWBBBBBnnN.",
  "...NwWWWWWWWBBBnN...",
  "....NwWWWWWWWBBN....",
  ".....NwwwWWWWNN.....",
  "......NNwwwwN.......",
  "........NNNN........",
  "........N..N........",
  ".......NN.NN........",
]

/** En vol, tournée vers la gauche : ailes hautes, à l'horizontale, basses. */
export const MASCOT_FLIGHT = {
  up: [
    ".......NNNNNN..............",
    ".....NNBBBBBBNN......N.N.N.",
    "....NBBbbBBBBBBN....NnNnNnN",
    "...NBBbBBBBBBBBBN..NBBBBBnN",
    "...NBBBBBBBBBBBBN.NBBBBBBN.",
    "..NWWWWWWWWWWWBBBNBBBBBBN..",
    "..NWWWsKWWWWWWWBNWWWWWWN...",
    "NNNWWWKKWWWWWWWNbbbbbbbN...",
    ".NNWWWWWWWWWWWNbbbbbbbN....",
    "...NWWWWWWWWWNNNNNNNNN.....",
    "...NWWWWWWWWWWWWBBBNNN.....",
    "...NWWWWWWWWWWWWBBBBBnN....",
    "...NWWWWWWWWWWWWWBBnnnN....",
    "...NwWWWWWWWWWWWWBNNNN.....",
    "....NwWWWWWWWWWWN..........",
    ".....NwwwWWWWWNN...........",
    "......NNwwwwNN.............",
    "........NNNN...............",
    "...........................",
  ],
  mid: [
    ".......NNNNNN..............",
    ".....NNBBBBBBNN............",
    "....NBBbbBBBBBBN...........",
    "...NBBbBBBBBBBBBN..........",
    "...NBBBBBBBBBBBBN..........",
    "..NWWWWWWWWWWWBBBN.........",
    "..NWWWsKWWWWWWWBBN.........",
    "NNNWWWKKWWWWWWWBBN.........",
    ".NNWWWWWWWNNNNNNNNNNN......",
    "...NWWWWWWNbbbbbbbBBBNN....",
    "...NWWWWWWWNWWWWWWWWBBnN...",
    "...NWWWWWWWWNBBBBBBBBnnnN..",
    "...NWWWWWWWWWNNNNNNNNNNN...",
    "...NwWWWWWWWWWWWWBNNNN.....",
    "....NwWWWWWWWWWWN..........",
    ".....NwwwWWWWWNN...........",
    "......NNwwwwNN.............",
    "........NNNN...............",
    "...........................",
  ],
  down: [
    ".......NNNNNN..............",
    ".....NNBBBBBBNN............",
    "....NBBbbBBBBBBN...........",
    "...NBBbBBBBBBBBBN..........",
    "...NBBBBBBBBBBBBN..........",
    "..NWWWWWWWWWWWBBBN.........",
    "..NWWWsKWWWWWWWBBN.........",
    "NNNWWWKKWWWWWWWBBN.........",
    ".NNWWWWWWWWWWWBBBBN........",
    "...NWWWWWWNNNNNNNNBN.......",
    "...NWWWWWWNbbbbbbbNNNN.....",
    "...NWWWWWWWNWWWWWWWNBnN....",
    "...NWWWWWWWWNBBBBBBBNnN....",
    "...NwWWWWWWWNBBBBBBBNN.....",
    "....NwWWWWWWWNBBBBBBN......",
    ".....NwwwWWWWNBBBBBBN......",
    "......NNwwwwNNNnBnBnN......",
    "........NNNN..NnNnNnN......",
    "...............N.N.N.......",
  ],
}

/** Repères, en pixels du dessin : pointe du bec posée et en vol. */
export const MASCOT_POINTS = {
  standingBeak: { x: 0.5, y: 7.5 },
  flightBeak: { x: 0.5, y: 7.5 },
}
