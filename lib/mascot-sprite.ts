/*
 * La mascotte de Jegsen : une mésange bleue en pixel art, volontairement simple pour rester nette à toutes
 * les tailles. Couleurs de la charte : bleu de la marque, blanc, bleus pâles, contour bleu nuit. Bec et pattes
 * en gris bleuté clair, pour rester visibles sur les fonds sombres.
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
  A: "#8e98c4",
  a: "#6a74a3",
}

/** Posée, de profil, tournée vers la gauche. */
export const MASCOT_STANDING = [
  ".......NNNNNN.......",
  ".....NNBBBBBBNN.....",
  "....NBBbbBBBBBBN....",
  "...NBBbBBBBBBBBBN...",
  "...NBBBBBBBBBBBBN...",
  "..NWWWWWWWWWWWBBBN..",
  ".NNWWWsKWWWWWWWBBN..",
  "AAAWWWKKWWWWWWWBBN..",
  "NaaWWWWWWWWWWWBBBBN.",
  ".NNNWWWWWWWWWBBBBBBN",
  "...NWWWWWWWWBBBBBnnN",
  "...NWWWWWWWBWWWWBnN.",
  "...NWWWWWWWBBBBBnnN.",
  "...NwWWWWWWWBBBnN...",
  "....NwWWWWWWWBBN....",
  ".....NwwwWWWWNN.....",
  "......NNwwwwN.......",
  "........aNNa........",
  "........a..a........",
  ".......aa.aa........",
]

/** Posée, œil fermé (clignement). */
export const MASCOT_BLINK = [
  ".......NNNNNN.......",
  ".....NNBBBBBBNN.....",
  "....NBBbbBBBBBBN....",
  "...NBBbBBBBBBBBBN...",
  "...NBBBBBBBBBBBBN...",
  "..NWWWWWWWWWWWBBBN..",
  ".NNWWWWWWWWWWWWBBN..",
  "AAAWWWKKWWWWWWWBBN..",
  "NaaWWWWWWWWWWWBBBBN.",
  ".NNNWWWWWWWWWBBBBBBN",
  "...NWWWWWWWWBBBBBnnN",
  "...NWWWWWWWBWWWWBnN.",
  "...NWWWWWWWBBBBBnnN.",
  "...NwWWWWWWWBBBnN...",
  "....NwWWWWWWWBBN....",
  ".....NwwwWWWWNN.....",
  "......NNwwwwN.......",
  "........aNNa........",
  "........a..a........",
  ".......aa.aa........",
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
    ".NNWWWsKWWWWWWWBNWWWWWWN...",
    "AAAWWWKKWWWWWWWNbbbbbbbN...",
    "NaaWWWWWWWWWWWNbbbbbbbN....",
    ".NNNWWWWWWWWWNNNNNNNNN.....",
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
    ".NNWWWsKWWWWWWWBBN.........",
    "AAAWWWKKWWWWWWWBBN.........",
    "NaaWWWWWWWNNNNNNNNNNN......",
    ".NNNWWWWWWNbbbbbbbBBBNN....",
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
    ".NNWWWsKWWWWWWWBBN.........",
    "AAAWWWKKWWWWWWWBBN.........",
    "NaaWWWWWWWWWWWBBBBN........",
    ".NNNWWWWWWNNNNNNNNBN.......",
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
