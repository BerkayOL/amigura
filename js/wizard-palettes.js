/**
 * Character-authentic color palettes for the bespoke order wizard.
 */
(function (global) {
  "use strict";

  /** @type {{ hex: string, nameKey: string }[]} */
  var DEFAULT_PALETTE = [
    { hex: "#E8B89A", nameKey: "palette.peach" },
    { hex: "#9BB89A", nameKey: "palette.sage" },
    { hex: "#C9A227", nameKey: "palette.gold" },
    { hex: "#F5E6D3", nameKey: "palette.cream" },
    { hex: "#8B9DC3", nameKey: "palette.blue" },
    { hex: "#D4A5A5", nameKey: "palette.rose" },
    { hex: "#3D4450", nameKey: "palette.charcoal" },
    { hex: "#FFFFFF", nameKey: "palette.white" },
  ];

  /** @type {Record<string, { hex: string, nameKey: string }[]>} */
  var FIGURE_PALETTES = {
    barbie: [
      { hex: "#E91E8C", nameKey: "palette.fig.barbie.pink" },
      { hex: "#F8B4C8", nameKey: "palette.fig.barbie.blush" },
      { hex: "#F5E6D3", nameKey: "palette.fig.barbie.blonde" },
      { hex: "#1A1A1A", nameKey: "palette.fig.barbie.black" },
      { hex: "#FFFFFF", nameKey: "palette.fig.barbie.white" },
    ],
    elsa: [
      { hex: "#A8D8EA", nameKey: "palette.fig.elsa.iceBlue" },
      { hex: "#FFFFFF", nameKey: "palette.fig.elsa.snow" },
      { hex: "#C0C0C0", nameKey: "palette.fig.elsa.silver" },
      { hex: "#F5E1A4", nameKey: "palette.fig.elsa.blonde" },
      { hex: "#9B8FCE", nameKey: "palette.fig.elsa.cape" },
    ],
    olaf: [
      { hex: "#FFFFFF", nameKey: "palette.fig.olaf.snow" },
      { hex: "#1A1A1A", nameKey: "palette.fig.olaf.coal" },
      { hex: "#E86C2A", nameKey: "palette.fig.olaf.carrot" },
      { hex: "#8B5A2B", nameKey: "palette.fig.olaf.stick" },
    ],
    moana: [
      { hex: "#C1272D", nameKey: "palette.fig.moana.redTop" },
      { hex: "#5D8A3E", nameKey: "palette.fig.moana.skirt" },
      { hex: "#4A3728", nameKey: "palette.fig.moana.hair" },
      { hex: "#C68642", nameKey: "palette.fig.moana.skin" },
      { hex: "#008C9E", nameKey: "palette.fig.moana.teal" },
    ],
    maui: [
      { hex: "#8D5524", nameKey: "palette.fig.maui.skin" },
      { hex: "#1C1C1C", nameKey: "palette.fig.maui.hair" },
      { hex: "#B22222", nameKey: "palette.fig.maui.red" },
      { hex: "#2E7D32", nameKey: "palette.fig.maui.leaf" },
      { hex: "#2C1810", nameKey: "palette.fig.maui.tattoo" },
    ],
    harryPotter: [
      { hex: "#1A1A1A", nameKey: "palette.fig.harryPotter.hair" },
      { hex: "#E8C49A", nameKey: "palette.fig.harryPotter.skin" },
      { hex: "#6B0F0F", nameKey: "palette.fig.harryPotter.scarfRed" },
      { hex: "#C9A227", nameKey: "palette.fig.harryPotter.scarfGold" },
      { hex: "#2D2D2D", nameKey: "palette.fig.harryPotter.robe" },
      { hex: "#F4E4BC", nameKey: "palette.fig.harryPotter.shirt" },
    ],
    hermione: [
      { hex: "#5C3317", nameKey: "palette.fig.hermione.hair" },
      { hex: "#E8C49A", nameKey: "palette.fig.hermione.skin" },
      { hex: "#8B0000", nameKey: "palette.fig.hermione.tieRed" },
      { hex: "#E8B923", nameKey: "palette.fig.hermione.tieGold" },
      { hex: "#2D2D2D", nameKey: "palette.fig.hermione.robe" },
    ],
    malefiz: [
      { hex: "#0D0D0D", nameKey: "palette.fig.malefiz.black" },
      { hex: "#5B2C6F", nameKey: "palette.fig.malefiz.purple" },
      { hex: "#7CB342", nameKey: "palette.fig.malefiz.green" },
      { hex: "#D4C4B0", nameKey: "palette.fig.malefiz.skin" },
      { hex: "#C9A227", nameKey: "palette.fig.malefiz.gold" },
    ],
    ronald: [
      { hex: "#C1440E", nameKey: "palette.fig.ronald.hair" },
      { hex: "#E8C49A", nameKey: "palette.fig.ronald.skin" },
      { hex: "#6B0F0F", nameKey: "palette.fig.ronald.scarfRed" },
      { hex: "#C9A227", nameKey: "palette.fig.ronald.scarfGold" },
      { hex: "#2D2D2D", nameKey: "palette.fig.ronald.robe" },
    ],
    wednesday: [
      { hex: "#1A1A1A", nameKey: "palette.fig.wednesday.dress" },
      { hex: "#F5F5F5", nameKey: "palette.fig.wednesday.collar" },
      { hex: "#0D0D0D", nameKey: "palette.fig.wednesday.hair" },
      { hex: "#D8CFC4", nameKey: "palette.fig.wednesday.skin" },
    ],
    thing: [
      { hex: "#8B6F47", nameKey: "palette.fig.thing.skin" },
      { hex: "#1A1A1A", nameKey: "palette.fig.thing.nails" },
      { hex: "#D8CFC4", nameKey: "palette.fig.thing.highlight" },
    ],
    pugsleyAddams: [
      { hex: "#B71C1C", nameKey: "palette.fig.pugsleyAddams.red" },
      { hex: "#1A1A1A", nameKey: "palette.fig.pugsleyAddams.black" },
      { hex: "#D8CFC4", nameKey: "palette.fig.pugsleyAddams.skin" },
      { hex: "#2D2D2D", nameKey: "palette.fig.pugsleyAddams.hair" },
    ],
    enidSinclair: [
      { hex: "#F4D03F", nameKey: "palette.fig.enidSinclair.yellow" },
      { hex: "#B39DDB", nameKey: "palette.fig.enidSinclair.lavender" },
      { hex: "#F48FB1", nameKey: "palette.fig.enidSinclair.pink" },
      { hex: "#6D4C41", nameKey: "palette.fig.enidSinclair.brown" },
      { hex: "#1A1A1A", nameKey: "palette.fig.enidSinclair.black" },
    ],
    kuromi: [
      { hex: "#1A1A1A", nameKey: "palette.fig.kuromi.black" },
      { hex: "#FF69B4", nameKey: "palette.fig.kuromi.pink" },
      { hex: "#FFFFFF", nameKey: "palette.fig.kuromi.white" },
      { hex: "#9C27B0", nameKey: "palette.fig.kuromi.purple" },
    ],
    myMelody: [
      { hex: "#FFFFFF", nameKey: "palette.fig.myMelody.white" },
      { hex: "#F8BBD9", nameKey: "palette.fig.myMelody.hood" },
      { hex: "#FFD54F", nameKey: "palette.fig.myMelody.nose" },
      { hex: "#F48FB1", nameKey: "palette.fig.myMelody.pink" },
    ],
    sonicBlue: [
      { hex: "#1E68D8", nameKey: "palette.fig.sonicBlue.blue" },
      { hex: "#F5C9A8", nameKey: "palette.fig.sonicBlue.skin" },
      { hex: "#E53935", nameKey: "palette.fig.sonicBlue.shoes" },
      { hex: "#FFFFFF", nameKey: "palette.fig.sonicBlue.gloves" },
      { hex: "#1A1A1A", nameKey: "palette.fig.sonicBlue.eyes" },
    ],
    sonicRed: [
      { hex: "#D32F2F", nameKey: "palette.fig.sonicRed.red" },
      { hex: "#F5C9A8", nameKey: "palette.fig.sonicRed.skin" },
      { hex: "#FFFFFF", nameKey: "palette.fig.sonicRed.gloves" },
      { hex: "#1A1A1A", nameKey: "palette.fig.sonicRed.eyes" },
    ],
    sonicBlack: [
      { hex: "#212121", nameKey: "palette.fig.sonicBlack.black" },
      { hex: "#F5C9A8", nameKey: "palette.fig.sonicBlack.skin" },
      { hex: "#E53935", nameKey: "palette.fig.sonicBlack.shoes" },
      { hex: "#FFFFFF", nameKey: "palette.fig.sonicBlack.gloves" },
    ],
    tails: [
      { hex: "#FF8C00", nameKey: "palette.fig.tails.orange" },
      { hex: "#FFFFFF", nameKey: "palette.fig.tails.chest" },
      { hex: "#5D4037", nameKey: "palette.fig.tails.shoes" },
      { hex: "#42A5F5", nameKey: "palette.fig.tails.eyes" },
      { hex: "#1A1A1A", nameKey: "palette.fig.tails.detail" },
    ],
    lolSurpriseDoll: [
      { hex: "#FF1493", nameKey: "palette.fig.lolSurpriseDoll.hotPink" },
      { hex: "#9C27B0", nameKey: "palette.fig.lolSurpriseDoll.purple" },
      { hex: "#26C6DA", nameKey: "palette.fig.lolSurpriseDoll.turquoise" },
      { hex: "#FFD700", nameKey: "palette.fig.lolSurpriseDoll.gold" },
      { hex: "#FFFFFF", nameKey: "palette.fig.lolSurpriseDoll.white" },
    ],
    crossbodyPaperBag: [
      { hex: "#C4A77D", nameKey: "palette.fig.crossbodyPaperBag.kraft" },
      { hex: "#F5E6D3", nameKey: "palette.fig.crossbodyPaperBag.cream" },
      { hex: "#6D4C41", nameKey: "palette.fig.crossbodyPaperBag.strap" },
      { hex: "#1A1A1A", nameKey: "palette.fig.crossbodyPaperBag.black" },
    ],
    lavenderClutch: [
      { hex: "#B39DDB", nameKey: "palette.fig.lavenderClutch.lavender" },
      { hex: "#CE93D8", nameKey: "palette.fig.lavenderClutch.lilac" },
      { hex: "#B0BEC5", nameKey: "palette.fig.lavenderClutch.silver" },
      { hex: "#FFF8E7", nameKey: "palette.fig.lavenderClutch.cream" },
    ],
    nostalgicPhoneBlue: [
      { hex: "#4A6FA5", nameKey: "palette.fig.nostalgicPhoneBlue.body" },
      { hex: "#F5F0DC", nameKey: "palette.fig.nostalgicPhoneBlue.dial" },
      { hex: "#C62828", nameKey: "palette.fig.nostalgicPhoneBlue.accent" },
      { hex: "#1A1A1A", nameKey: "palette.fig.nostalgicPhoneBlue.black" },
    ],
    nostalgicPhonePink: [
      { hex: "#F48FB1", nameKey: "palette.fig.nostalgicPhonePink.body" },
      { hex: "#F5F0DC", nameKey: "palette.fig.nostalgicPhonePink.dial" },
      { hex: "#C62828", nameKey: "palette.fig.nostalgicPhonePink.accent" },
      { hex: "#FFFFFF", nameKey: "palette.fig.nostalgicPhonePink.white" },
    ],
    nostalgicPhoneOrange: [
      { hex: "#FF9800", nameKey: "palette.fig.nostalgicPhoneOrange.body" },
      { hex: "#F5F0DC", nameKey: "palette.fig.nostalgicPhoneOrange.dial" },
      { hex: "#6D4C41", nameKey: "palette.fig.nostalgicPhoneOrange.brown" },
      { hex: "#1A1A1A", nameKey: "palette.fig.nostalgicPhoneOrange.black" },
    ],
    fruitSet: [
      { hex: "#D32F2F", nameKey: "palette.fig.fruitSet.apple" },
      { hex: "#FFEB3B", nameKey: "palette.fig.fruitSet.banana" },
      { hex: "#7B1FA2", nameKey: "palette.fig.fruitSet.grape" },
      { hex: "#43A047", nameKey: "palette.fig.fruitSet.leaf" },
      { hex: "#FF9800", nameKey: "palette.fig.fruitSet.orange" },
    ],
    vegetableSet: [
      { hex: "#E53935", nameKey: "palette.fig.vegetableSet.tomato" },
      { hex: "#FB8C00", nameKey: "palette.fig.vegetableSet.carrot" },
      { hex: "#558B2F", nameKey: "palette.fig.vegetableSet.broccoli" },
      { hex: "#4A148C", nameKey: "palette.fig.vegetableSet.eggplant" },
      { hex: "#FDD835", nameKey: "palette.fig.vegetableSet.corn" },
    ],
    trexDinosaur: [
      { hex: "#2E7D32", nameKey: "palette.fig.trexDinosaur.green" },
      { hex: "#A5D6A7", nameKey: "palette.fig.trexDinosaur.belly" },
      { hex: "#FFFFFF", nameKey: "palette.fig.trexDinosaur.teeth" },
      { hex: "#1A1A1A", nameKey: "palette.fig.trexDinosaur.eyes" },
      { hex: "#E53935", nameKey: "palette.fig.trexDinosaur.tongue" },
    ],
  };

  /**
   * @param {string | null} figureKey
   * @returns {{ hex: string, nameKey: string }[]}
   */
  function getPaletteForFigure(figureKey) {
    if (figureKey && FIGURE_PALETTES[figureKey]) {
      return FIGURE_PALETTES[figureKey];
    }
    return DEFAULT_PALETTE;
  }

  /**
   * @param {string | null} figureKey
   * @returns {boolean}
   */
  function hasCharacterPalette(figureKey) {
    return !!(figureKey && FIGURE_PALETTES[figureKey]);
  }

  global.Irem = global.Irem || {};
  global.Irem.WizardPalettes = {
    default: DEFAULT_PALETTE,
    figures: FIGURE_PALETTES,
    getForFigure: getPaletteForFigure,
    hasCharacterPalette: hasCharacterPalette,
  };
})(typeof window !== "undefined" ? window : globalThis);
