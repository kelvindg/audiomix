/* AudioMix — Cut-Through research data (band EQ shaping for cut-through & clarity).
 * Synthesized from a heavy-research pass (iZotope, Audient, Boris FX, MasteringBOX,
 * Gear4music, Collaborate Worship, ProSoundWeb, Worship Sound Guy, Audio Issues).
 */

export const FREQ_BANDS = [
  { band: "Sub-bass", range: "20–60 Hz", ctrl: "Weight, rumble, physical feel",
    note: "Felt more than heard. High-pass everything that isn't kick/bass out of here." },
  { band: "Bass", range: "60–250 Hz", ctrl: "Weight, solidity, low-end body",
    note: "Kick body + bass fundamentals live here. Keep mono and centered." },
  { band: "Low-mids", range: "250–500 Hz", ctrl: "Body, warmth — and mud",
    note: "Where mix mud accumulates. The 'boxy' sound lives here." },
  { band: "Mids", range: "500 Hz–2 kHz", ctrl: "The core notes of everything",
    note: "Heart of melodies and vocals. Where intelligibility is won or lost." },
  { band: "Upper-mids", range: "2–4 kHz", ctrl: "Presence, attack, cut-through",
    note: "Most sensitive hearing region. Small moves = big clarity impact." },
  { band: "Presence", range: "5–6 kHz", ctrl: "Definition, gloss, sibilance",
    note: "Where 's' and 't' live — over-boost makes the vocal harsh." },
  { band: "Air / brilliance", range: "6–20 kHz", ctrl: "Air, sparkle, sheen",
    note: "Pure harmonics. Gentle boosts add polish; over-boost = fatigue." },
];

export const MASKING_PAIRS = [
  { pair: "Kick vs. bass", range: "50–150 Hz", problem: "Boomy, undefined lows — kick loses punch, bass loses note definition." },
  { pair: "Vocal vs. keys/guitar", range: "1–5 kHz", problem: "Keys and guitars bury the lead vocal — the classic 'buried vocal.'" },
  { pair: "Lead vs. backing vox", range: "3–4 kHz", problem: "Background vocals step on the lead. Cut BGV here, boost lead." },
  { pair: "Snare vs. vocal", range: "1–3 kHz", problem: "Snare 'crack' competes with vocal clarity." },
  { pair: "Cymbals vs. sibilance", range: "5–8 kHz", problem: "Hi-hat/overhead masks 's' and 't' in the vocal." },
];

export const MASKING_CHECKS = [
  "A/B solo pairs of clashing instruments — if you can't tell which is which in the mix but can soloed, it's masking.",
  "Sum the mix to mono. If it collapses into clutter, you were relying on panning, not frequency separation.",
  "Mute the suspected offender. If the buried instrument pops out, that instrument was the masker.",
  "Sweep a boosted EQ band slowly to hear which frequency is crowding.",
];

export const LEVERS = [
  { title: "High-pass filter (HPF)", sub: "Free space below",
    body: "The cheapest, most powerful move. Roll off the low end an instrument doesn't use to free room for kick and bass — instantly de-mudding without a single boost. Midrange instruments HPF at 80–150 Hz; overheads at 150 Hz+." },
  { title: "Subtractive EQ", sub: "Carve, don't fight",
    body: "Cut a narrow notch from the NON-priority instrument where the priority needs to be heard. To let a vocal cut through, cut 2 kHz from rhythm guitar/keys instead of boosting the vocal — it appears louder with no level change." },
  { title: "Complementary EQ", sub: "Give and take",
    body: "Boost one instrument in a band, cut the other in the SAME band. Kick gets 50–80 Hz, bass lives higher at 100–150 Hz — each gets its own pocket." },
  { title: "Cut narrow, boost wide", sub: "Q discipline",
    body: "Surgeons cut the least tissue possible. Remove problem frequencies with a narrow-Q surgical cut; boost with a wide Q so the change sounds musical, not obvious." },
  { title: "De-mud: 200–400 Hz", sub: "The bottleneck",
    body: "Almost everything overlaps around 200–300 Hz — that's why mixes get muddy. Deliberately trim low-mids from acoustic, keys, and overheads and the whole mix opens up." },
  { title: "Presence: 2–5 kHz", sub: "The cut-through lever",
    body: "Where 'cut' lives — vocal consonants, snare attack, pick definition. The most sensitive hearing region, so tiny boosts/cuts here move clarity enormously." },
];

export const INSTRUMENT_RECIPES = [
  {
    icon: "🎤", name: "Female Lead Vocal", priority: true,
    fundamental: "~125 Hz up through 10 kHz+",
    hpf: "100–200 Hz (removes mud, pops, rumble)",
    cuts: "200–800 Hz gentle cut for mud/nasal; 3–4 kHz narrow cut if piercing/sibilant",
    boosts: "3–5 kHz presence (+1–2 dB); 10–12 kHz air (very light)",
    move: "Cut 3–4 kHz from keys & backing vox so the lead keeps that band to itself.",
  },
  {
    icon: "🎸", name: "Acoustic Guitar",
    fundamental: "~82 Hz up; body 200–400 Hz, attack 2–5 kHz",
    hpf: "70–80 Hz solo; ~150 Hz in a full band",
    cuts: "100–250 Hz boominess (~200 Hz if mic'd at sound hole); ~800 Hz to fix 'cheap' string",
    boosts: "2–5 kHz broad for pick definition; up to 8 kHz for string sheen",
    move: "Cutting low-mids already adds perceived presence — you may not need to boost highs.",
  },
  {
    icon: "🎹", name: "Keyboard / Piano",
    fundamental: "Wide — 60 Hz sub to 4 kHz attack",
    hpf: "~80–120 Hz (patch dependent)",
    cuts: "400–600 Hz mud (Q≈4); low shelf ~200 Hz −3 to −6 dB for boom; 3.25 kHz for vocals",
    boosts: "1–2 kHz to cut through; 3 kHz peaking (Q≈4) to brighten; light 10 kHz air",
    move: "Cut 3–4 kHz on keys during sung passages (or sidechain a dynamic EQ to duck only when the vocal sings).",
  },
  {
    icon: "🎸", name: "Bass Guitar",
    fundamental: "~41 Hz up; body 120–250 Hz; presence 800 Hz–1 kHz",
    hpf: "35–45 Hz (remove sub rumble)",
    cuts: "300–500 Hz mud; 60–90 Hz if fighting the kick",
    boosts: "80–110 Hz weight; 700 Hz–1.2 kHz definition",
    move: "Kick 50–80 Hz, bass 100–150 Hz — or sidechain/dynamic-EQ bass at ~80 Hz to duck when the kick hits.",
  },
  {
    icon: "🥁", name: "Kick Drum",
    fundamental: "40–100 Hz fundamental; knock 100–200 Hz; click 2–5 kHz",
    hpf: "30–40 Hz (remove sub competing with bass)",
    cuts: "200–500 Hz boxiness (classic −3 to −5 dB at ~400 Hz)",
    boosts: "60–80 Hz punch; 100–200 Hz knock; 2.5–5 kHz beater attack",
    move: "The 2.5–5 kHz click keeps the kick audible without excessive sub — critical in a dense mix.",
  },
  {
    icon: "🥁", name: "Snare Drum",
    fundamental: "body 150–250 Hz; crack 2–3.5 kHz; air 8 kHz+",
    hpf: "80–100 Hz (cut below ~80 Hz rumble)",
    cuts: "300–500 Hz boxiness; 400–700 Hz ring; 900 Hz–1.5 kHz 'papery'",
    boosts: "150–250 Hz body; 2–3.5 kHz crack; 8 kHz+ air",
    move: "Snare crack (1–3 kHz) competes with vocal presence — trim slightly if it hides the vocal.",
  },
  {
    icon: "🎙️", name: "Drum Overhead",
    fundamental: "cymbals/kit — 5–12 kHz presence; low end mostly unwanted",
    hpf: "150–250 Hz (removes kick bleed)",
    cuts: "300–600 Hz mud; 3–6 kHz harshness; ~4 kHz sibilance clash",
    boosts: "5–12 kHz cymbal shimmer — subtle, +1 dB if dull",
    move: "8 kHz+ overhead air can mask vocal sibilance — keep the high boost gentle.",
  },
  {
    icon: "🎧", name: "Backing Tracks + Extra Vocals",
    fundamental: "varies by stem — always secondary to lead & instruments",
    hpf: "~40–80 Hz only if safe",
    cuts: "200–400 Hz mud; 2–4 kHz (first cut so backing doesn't mask the lead)",
    boosts: "Usually NONE — preserve content, don't add",
    move: "Lower/remove duplicate stems where possible; else cut 3–4 kHz from backing vox and let the lead keep it.",
  },
];

export const PLAYBOOK_STEPS = [
  "High-pass it — free the low end it doesn't own.",
  "Find the masked pocket — is another source sharing its key range? Cut the OTHER source there (subtractive).",
  "De-mud — trim 200–400 Hz low-mid buildup.",
  "Add presence — a small 2–5 kHz boost for attack/clarity.",
  "Only then check level — often it just needs a clean spectrum, not more volume.",
];

export const ANTI_MUD_RULES = [
  { head: "Q discipline", body: "Cut narrow, boost wide — surgical cuts, musical boosts." },
  { head: "Order", body: "Cut before boost — prefer freeing space over adding energy." },
  { head: "Ownership", body: "Only one source owns any given frequency pocket at a time." },
  { head: "Context", body: "EQ in the FULL mix, never solo — soloed EQ doesn't translate." },
  { head: "Arrangement", body: "Contrast, don't collide — bright next to dark, high octave next to low." },
];

export const SOURCES = [
  { name: "Audient — Frequency Ranges Explained", url: "https://audient.com/tutorial/frequency-ranges-explained/" },
  { name: "iZotope — EQ Cheat Sheet", url: "https://www.izotope.com/community/blog/eq-cheat-sheet" },
  { name: "iZotope — How to EQ Vocals", url: "https://www.izotope.com/community/blog/how-to-eq-vocals" },
  { name: "Boris FX — Frequency Masking Explained", url: "https://borisfx.com/blog/frequency-masking-explained-and-how-to-fix-it/" },
  { name: "MasteringBOX — What is Frequency Masking?", url: "https://www.masteringbox.com/learn/frequency-masking" },
  { name: "Gear4music — Kick Drum EQ 101", url: "https://www.gear4music.com/blog/kick-drum-eq/" },
  { name: "Collaborate Worship — EQ Tips for Keys, Pianos & Synths", url: "https://collaborateworship.com/keys-eq/" },
  { name: "Audio Issues — Acoustic Guitar EQ", url: "https://www.audio-issues.com/music-mixing/acoustic-guitar-eq/" },
  { name: "Worship Sound Guy — Live Vocal Mixing in Church", url: "https://worshipsoundguy.com/live-vocal-mixing-your-guide-to-mixing-vocalists-in-church/" },
  { name: "ProSoundWeb — Church Audio: Vocal EQ", url: "https://www.prosoundweb.com/church-audio-basics-perfecting-the-art-of-vocal-eq/" },
];