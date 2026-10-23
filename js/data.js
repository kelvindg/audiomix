/* AudioMix Guide — data from Live_Worship_EQ_Guide_Ui16.xlsx (Soundcraft Ui16) */

export const EQ_SOURCES = [
  {
    id: "vocal",
    name: "Female Lead Vocal",
    icon: "🎤",
    hpf: "100–120 Hz",
    cutFreq: "250–350 Hz; 2–4 kHz on competing channels",
    cutDb: "−2 to −3 dB at ~300 Hz if muddy",
    boostFreq: "3–5 kHz presence; 10–12 kHz air",
    boostDb: "+1 to +2 dB only if needed",
    listen: "Prioritize intelligibility; check mic technique and room reflections.",
    band: "Vocal"
  },
  {
    id: "acoustic",
    name: "Acoustic Guitar",
    icon: "🎸",
    hpf: "80–120 Hz",
    cutFreq: "180–350 Hz; ~3 kHz if masking vocal",
    cutDb: "−2 to −4 dB low mids; −2 dB at 3 kHz if needed",
    boostFreq: "2–5 kHz pick definition",
    boostDb: "0 to +2 dB if buried",
    listen: "Avoid carving away all pick attack; adjust in full mix.",
    band: "Instruments"
  },
  {
    id: "keys",
    name: "Keyboard / Piano",
    icon: "🎹",
    hpf: "~80–120 Hz (patch dependent)",
    cutFreq: "200–400 Hz; 2–4 kHz when vocal sings",
    cutDb: "−2 to −3 dB mud; −2 to −4 dB vocal masking",
    boostFreq: "500 Hz–2 kHz body; 3–5 kHz attack",
    boostDb: "Usually preserve, not boost",
    listen: "Do not EQ piano and pads identically; protect important melody.",
    band: "Instruments"
  },
  {
    id: "bass",
    name: "Bass Guitar",
    icon: "🎸",
    hpf: "35–45 Hz",
    cutFreq: "200–350 Hz mud; 60–90 Hz if kick dominates",
    cutDb: "−2 to −4 dB if muddy",
    boostFreq: "80–110 Hz weight; 700 Hz–1.2 kHz definition",
    boostDb: "+1 to +2 dB if necessary",
    listen: "Coordinate bass fundamental with kick; avoid excessive sub-bass.",
    band: "Rhythm Section"
  },
  {
    id: "kick",
    name: "Kick Drum",
    icon: "🥁",
    hpf: "30–40 Hz if needed",
    cutFreq: "250–400 Hz boxiness",
    cutDb: "−3 to −5 dB if boxy",
    boostFreq: "50–80 Hz weight; 2.5–4 kHz beater",
    boostDb: "+1 to +3 dB if needed",
    listen: "Try 65 Hz for weight and ~3 kHz for attack; phase matters.",
    band: "Drums"
  },
  {
    id: "snare",
    name: "Snare Drum",
    icon: "🥁",
    hpf: "80–100 Hz",
    cutFreq: "400–800 Hz boxiness",
    cutDb: "−2 to −4 dB if boxy",
    boostFreq: "150–250 Hz body; 2–4 kHz crack",
    boostDb: "+1 to +3 dB if needed",
    listen: "Retain body and snare-wire articulation.",
    band: "Drums"
  },
  {
    id: "oh",
    name: "Drum Overhead",
    icon: "🎙️",
    hpf: "150–250 Hz (lower for kit body)",
    cutFreq: "300–600 Hz mud; 3–6 kHz harshness",
    cutDb: "−2 to −3 dB if needed",
    boostFreq: "5–12 kHz cymbal shimmer",
    boostDb: "Usually preserve; +1 dB if dull",
    listen: "With 3 drum mics, overhead may need tom/kit body.",
    band: "Drums"
  },
  {
    id: "backing",
    name: "Backing Tracks + Extra Vocals",
    icon: "🎧",
    hpf: "Depends on stems; ~40–80 Hz only if safe",
    cutFreq: "200–400 Hz mud; 2–4 kHz vocal masking",
    cutDb: "−2 to −3 dB at ~3 kHz as first test",
    boostFreq: "Keep needed musical content",
    boostDb: "Usually no boost",
    listen: "Best: lower/remove duplicate vocals or instruments using stems.",
    band: "Tracks"
  }
];

export const MIX_WORKFLOW = [
  { step: 1, action: "Set gain and high-pass filters", check: "Leave headroom; avoid clipping. HPF is not a hard rule for every source." },
  { step: 2, action: "Balance kick and bass", check: "Separate their low-end emphasis and verify polarity/phase." },
  { step: 3, action: "Add snare and overhead", check: "Listen for boxiness and cymbal harshness." },
  { step: 4, action: "Bring in acoustic and keys", check: "Trim low-mid buildup before boosting presence." },
  { step: 5, action: "Bring in lead vocal", check: "First cut masking in keys/guitar around 2–4 kHz, then fine-tune vocal." },
  { step: 6, action: "Introduce backing tracks last", check: "Extra backing vocals may mask lead: lower or isolate stems first." },
  { step: 7, action: "Check without effects", check: "Temporarily mute reverb to distinguish masking from room acoustics." },
  { step: 8, action: "Walk the room", check: "Check vocal clarity away from mix position; room/system EQ is separate." }
];

export const MIXING_TIPS = [
  {
    title: "HPF is your first mixer, not your last resort",
    body: "High-pass filters clear the mud before you ever reach for a cut. Start every channel where the sheet says, then listen — if the source still has body, you've gone too far. The HPF is a suggestion, not a law: bass and kick need their low end, so only filter them when the stage rumble demands it."
  },
  {
    title: "Cut before you boost",
    body: "The fastest path to a clear mix is subtraction. Remove the boxiness (250–400 Hz), the mud (200–350 Hz), and the vocal-masking band (2–4 kHz) in instruments first. Boost only what is still missing after the cuts — presence, attack, or air — and in small steps: +1 to +2 dB is usually enough."
  },
  {
    title: "Make room for the vocal — it's the sermon of the song",
    body: "When the lead vocal sings, the instruments must get out of its way. Keys, guitar, and backing vocals all crowd 2–4 kHz. Cut them there first (−2 to −4 dB) before touching the vocal. The vocal gets its intelligibility from 3–5 kHz presence — protect that band fiercely."
  },
  {
    title: "Kick and bass are one instrument",
    body: "They share the low end, so treat them as a team: kick weight at ~65 Hz, bass at 80–110 Hz. If they fight, one of them wins and the mix turns to mush. Check polarity/phase on both — an out-of-phase kick and bass cancel each other in the worst place possible."
  },
  {
    title: "Drum body lives in the mids, not the lows",
    body: "Snare body sits at 150–250 Hz, its crack at 2–4 kHz. Kick boxiness is 250–400 Hz — cut it before adding weight at 50–80 Hz. Overheads want shimmer (5–12 kHz), so high-pass them at 150–250 Hz to keep cymbals sparkly instead of muddy."
  },
  {
    title: "Backing tracks last, and always lower than you think",
    body: "Bring them in after the live band is balanced. Extra backing vocals mask the lead faster than anything else — if you hear two vocalists, one is too loud. Use stems to lower or remove duplicate parts rather than wrestling them with EQ."
  },
  {
    title: "Trust your ears, not the screen",
    body: "The numbers are starting points for the full-band mix, not a contract. Rooms, speakers, and systems vary. Walk the room mid-service, listen for vocal clarity away from the mix position, and remember: room/system EQ is a separate fix from channel EQ."
  },
  {
      title: "Check without effects",
      body: "Reverb and delay hide problems. Mute them temporarily to hear whether a clash is masking or room acoustics. If it sounds good dry, the effects are the problem — not the EQ."
    }
  ];

  /* Visual EQ curve data — structured filter points for drawing a real frequency-response curve.
   * hpf: high-pass cutoff (Hz). bands: {type: 'cut'|'boost', freq, gain, q} peaking filters.
   * These are the visual starting points distilled from the text reference above. */
  export const EQ_CURVES = {
    vocal: {
      hpf: 110,
      bands: [
        { type: "cut", freq: 300, gain: -2.5, q: 1.1 },
        { type: "boost", freq: 4000, gain: 1.5, q: 1.0 },
        { type: "boost", freq: 11000, gain: 1.0, q: 1.2 }
      ]
    },
    acoustic: {
      hpf: 100,
      bands: [
        { type: "cut", freq: 260, gain: -3, q: 1.0 },
        { type: "cut", freq: 3000, gain: -2, q: 1.2 },
        { type: "boost", freq: 3500, gain: 1.5, q: 1.0 }
      ]
    },
    keys: {
      hpf: 100,
      bands: [
        { type: "cut", freq: 300, gain: -2.5, q: 1.0 },
        { type: "cut", freq: 3000, gain: -3, q: 1.1 },
        { type: "boost", freq: 1200, gain: 1.0, q: 1.0 },
        { type: "boost", freq: 4000, gain: 1.0, q: 1.2 }
      ]
    },
    bass: {
      hpf: 40,
      bands: [
        { type: "cut", freq: 275, gain: -3, q: 1.0 },
        { type: "boost", freq: 90, gain: 1.5, q: 1.2 },
        { type: "boost", freq: 900, gain: 1.0, q: 1.0 }
      ]
    },
    kick: {
      hpf: 35,
      bands: [
        { type: "cut", freq: 325, gain: -4, q: 1.0 },
        { type: "boost", freq: 65, gain: 2.0, q: 1.2 },
        { type: "boost", freq: 3000, gain: 2.0, q: 1.0 }
      ]
    },
    snare: {
      hpf: 90,
      bands: [
        { type: "cut", freq: 600, gain: -3, q: 1.0 },
        { type: "boost", freq: 200, gain: 2.0, q: 1.2 },
        { type: "boost", freq: 3000, gain: 2.0, q: 1.0 }
      ]
    },
    oh: {
      hpf: 200,
      bands: [
        { type: "cut", freq: 450, gain: -2.5, q: 1.0 },
        { type: "cut", freq: 4500, gain: -2, q: 1.2 },
        { type: "boost", freq: 8000, gain: 1.0, q: 1.0 }
      ]
    },
    backing: {
          hpf: 60,
          bands: [
            { type: "cut", freq: 300, gain: -2.5, q: 1.0 },
            { type: "cut", freq: 3000, gain: -3, q: 1.1 }
          ]
        }
      };
