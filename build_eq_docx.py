#!/usr/bin/env python3
"""Build the AudioMix band-EQ heavy-research DOCX."""
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

AMB = RGBColor(0xE8, 0xA3, 0x3D)
DARK = RGBColor(0x1A, 0x1C, 0x1A)
MUTED = RGBColor(0x55, 0x5C, 0x56)
RED = RGBColor(0xB0, 0x45, 0x2E)
GREEN = RGBColor(0x2F, 0x6B, 0x3C)

doc = Document()

# base font
style = doc.styles['Normal']
style.font.name = 'Calibri'
style.font.size = Pt(10.5)
style.paragraph_format.space_after = Pt(6)

# heading colors
for hname, sz, col in [('Heading 1', 20, AMB), ('Heading 2', 14, DARK), ('Heading 3', 12, AMB)]:
    h = doc.styles[hname]
    h.font.name = 'Calibri'
    h.font.size = Pt(sz)
    h.font.bold = True
    h.font.color.rgb = col

def title(text):
    doc.add_heading(text, level=1)

def h2(text):
    doc.add_heading(text, level=2)

def h3(text):
    doc.add_heading(text, level=3)

def p(text, bold=False, italic=False, color=None, size=None):
    par = doc.add_paragraph()
    run = par.add_run(text)
    run.bold = bold
    run.italic = italic
    if color: run.font.color.rgb = color
    if size: run.font.size = Pt(size)
    return par

def rich(segments):
    """segments: list of (text, bold, color) tuples in one paragraph."""
    par = doc.add_paragraph()
    for text, bold, color in segments:
        r = par.add_run(text)
        r.bold = bold
        if color: r.font.color.rgb = color
    return par

def bullet(text, bold_head=None):
    par = doc.add_paragraph(style='List Bullet')
    if bold_head:
        r = par.add_run(bold_head + ' ')
        r.bold = True
    par.add_run(text)
    return par

def kv(label, value, label_color=AMB):
    par = doc.add_paragraph()
    r = par.add_run(label + ': ')
    r.bold = True
    r.font.color.rgb = label_color
    par.add_run(value)
    return par

def band_table(rows):
    """rows: list of (band, range, what it controls, notes)."""
    t = doc.add_table(rows=1, cols=4)
    t.style = 'Light Grid Accent 1'
    hdr = t.rows[0].cells
    for i, htxt in enumerate(['Band', 'Range', 'What it controls', 'EQ notes']):
        hdr[i].paragraphs[0].add_run(htxt).bold = True
    for row in rows:
        cells = t.add_row().cells
        for i, txt in enumerate(row):
            cells[i].text = txt
    doc.add_paragraph()

# ============================================================ COVER
title("Band EQ Shaping for Cut-Through, Clarity & De-Mudding")
p("A heavy-research reference for the live-worship audio engineer", italic=True, color=MUTED)
p("Prepared for Kelvin — Soundcraft Ui16 · LiveWorship · KDG", color=MUTED, size=9)
rich([("Scope: ", True, AMB),
      ("how EQ shaping on a single instrument can make it cut through a voice, sit above or around the lead vocal, avoid mud, and gain individual clarity.", False, None)])
doc.add_paragraph()
rich([("Companion documents: ", True, None),
      ("AudioMix Guide (audiomix.d3guzman.com) — EQ starting points for all 8 sources and the 8-step mix workflow.", False, MUTED)])

# ============================================================ 1
title("1 · The Frequency Bands — What Each One Controls")
p("The audible spectrum spans ~20 Hz to 20 kHz. Every instrument has a \"home\" in specific bands, and every band has a job. Knowing the map is the difference between guessing and deliberately shaping a source.", italic=True)

band_table([
    ("Sub-bass", "20–60 Hz", "Weight, rumble, physical feel", "Sub is felt as much as heard. It's the lower end of bass and synthesized lows. High-pass EVERYTHING that isn't kick/bass out of here — 'less is more.' (Audient)"),
    ("Bass", "60–250 Hz", "Weight, solidity, low-end body", "Where the kick's body and bass fundamentals live. Too much = boomy; too little = thin/'weedy.' Keep mono and centered."),
    ("Low-mids", "250–500 Hz", "Body, warmth — AND mud/boxiness", "Nearly every element has energy here, so it's where mix mud accumulates. Cut to clear clutter; the 'boxy' sound lives here."),
    ("Mids", "500 Hz–2 kHz", "The core notes of everything", "The heart of melodies and vocals. Too much = 'honky'; too little = 'brittle/cheap.' Where intelligibility is won or lost."),
    ("Upper-mids", "2–4 kHz", "Presence, attack, cut-through", "The most sensitive human-hearing region — consonants, snare/hi-hat transient, piano attack. Small moves here have big impact on clarity."),
    ("Presence", "5–6 kHz", "Definition, gloss, sibilance", "Adds tangibility/lustre. But it's where vocal sibilance ('s','t') lives — over-boost = harsh, irritating vocal."),
    ("Air/brilliance", "6–20 kHz", "Air, sparkle, sheen", "Pure harmonics. Gentle boosts add 'airy/expensive' polish; over-boost = ear fatigue."),
],)

rich([("Golden rule for cut-through: ", True, AMB),
      ("cut before you boost. Cutting overlapping frequencies in one instrument is almost always cleaner than boosting the other (Audient).", False, None)])

# ============================================================ 2
title("2 · Frequency Masking — Why Instruments Get Lost")
p("The single biggest reason an instrument 'doesn't cut through' or sounds muddy is frequency masking.", italic=True)

p("Masking is a psychoacoustic effect: when two sounds occupy the same frequency range at once, the louder one makes the quieter one hard — or impossible — to hear. The ear can't separate them, so the mix collapses into clutter.", bold=True)

h3("The classic collisions (in a live-worship band)")
band_table([
    ("Kick vs. bass", "50–150 Hz", "Low end", "Boomy, undefined lows — kick loses punch, bass loses note definition."),
    ("Vocal vs. keys/guitar", "1–5 kHz", "Presence", "Keys and guitars bury the lead vocal; 'buried vocal' is almost always masking."),
    ("Lead vs. backing vox", "3–4 kHz", "Presence", "Background vocals step on the lead. Cut BGV here, boost lead."),
    ("Snare vs. vocal", "1–3 kHz", "Attack", "Snare 'crack' competes with vocal clarity."),
    ("Cymbals vs. vocal sibilance", "5–8 kHz", "Air", "Hi-hat/overhead masks 's' and 't' in the vocal."),
],)

h3("How to detect masking")
bullet("A/B solo pairs of clashing instruments — if you can't tell which is which in the full mix but can soloed, it's masking.")
bullet("Sum the mix to mono. If it collapses into clutter, you were relying on panning, not frequency separation.")
bullet("Mute the suspected offender. If the buried instrument suddenly pops out, that instrument was the masker.")
bullet("Sweep a boosted EQ band slowly to 'hear' which frequency is crowding.")

# ============================================================ 3
title("3 · How EQ Creates Cut-Through, Clarity & De-Mud")
p("Cut-through isn't automatically 'louder.' It's about giving each instrument an unshared slice of the spectrum, then shaping its character. Here are the working levers.", italic=True)

h3("3.1 — High-pass filter (HPF): free space below")
p("The cheapest and most powerful move. Roll off the low end an instrument doesn't use, and you free room for kick and bass below it — instantly de-mudding without a single boost. (Boris FX, MasteringBOX)")
bullet("Midrange instruments (guitar, keys, vocals, backing): HPF at 80–150 Hz.", bold_head="HPF targets:")
bullet("Overheads/cymbals: HPF 150 Hz+ to drop kick bleed.")

h3("3.2 — Subtractive EQ: carve, don't fight")
p("Cut a narrow notch from the NON-priority instrument where the priority instrument needs to be heard. This is the transparent way to separate two sources.")
rich([("Example: ", True, AMB),
      ("to let a vocal cut through, cut 2 kHz from the rhythm guitar / keys instead of boosting the vocal. The vocal appears louder without any level change. (MasteringBOX, Boris FX)", False, None)])

h3("3.3 — Complementary EQ: give and take")
p("Boost one instrument in a band, cut the other in the SAME band. Kick gets 50–80 Hz, bass lives higher at 100–150 Hz — each has its own 'pocket.' (Gear4music)")

h3("3.4 — Cut narrow, boost wide")
p("\"Surgeons cut the least tissue possible.\" Remove problem frequencies with a narrow Q surgical cut; boost with a wide Q so the change sounds musical, not obvious. (ProSoundWeb)")

h3("3.5 — De-mud: the 200–400 Hz bottleneck")
p("Almost everything overlaps around 200–300 Hz, which is why mixes get muddy. Deliberately trim low-mids from instruments that don't need body there (acoustic, keys, overhead) and the whole mix opens up. (Audio Issues)")

h3("3.6 — The presence band is the cut-through lever")
p("2–5 kHz is where 'cut' lives — vocal consonants, snare attack, pick definition. It's also the most sensitive hearing region, so tiny boosts/cuts here move clarity enormously. (Audient)")

# ============================================================ 4
title("4 · Per-Instrument EQ — Cut-Through & Clarity Recipes")
p("For each of the 8 sources in your AudioMix guide: its fundamental range, the HPF, the cuts (de-mud/clarity), the boosts (cut-through/presence), and how to place it against the lead vocal.", italic=True)

# ---- VOICE ----
h2("4.1 — Female Lead Vocal")
p("The priority source. Everything else is EQ'd AROUND it.")
kv("Fundamental range", "~125 Hz and harmonics up through 10 kHz+")
kv("HPF", "100–200 Hz — removes mud, popping P/T's, room rumble (Worship Sound Guy, ProSoundWeb)")
kv("Cuts (de-mud/harshness)", "200–800 Hz gentle cut for mud/nasal (nasal lives ~500 Hz–1.2 kHz); 3–4 kHz narrow cut if piercing/sibilant — especially on female vocals where resonances stack across the mic (iZotope, Worship Sound Guy)")
kv("Boosts (clarity/cut-through)", "3–5 kHz presence (+1–2 dB); 10–12 kHz air (very light) — makes it 'pop' above keys/guitars (Worship Sound Guy, iZotope)")
kv("4–6 kHz", "The classic 'presence' boost range (ProSoundWeb)")
rich([("Cut-through move: ", True, AMB),
      ("cut 3–4 kHz from keys and backing vox so the lead keeps that band to itself.", False, None)])

# ---- ACOUSTIC ----
h2("4.2 — Acoustic Guitar")
kv("Fundamental range", "~82 Hz (low E) up; body 200–400 Hz, attack 2–5 kHz")
kv("HPF", "70–80 Hz solo; up to ~150 Hz in a full band to leave room for bass/kick (Audio Issues)")
kv("Cuts (de-mud)", "100–250 Hz boominess (esp. 200 Hz if mic'd at sound hole); ~800 Hz narrow to fix 'cheap' string sound (Audio Issues)")
kv("Boosts (cut-through)", "2–5 kHz broad for pick definition/brightness; up to 8 kHz for string sheen (Audio Issues)")
rich([("Note: ", True, GREEN),
      ("cutting low-mids already adds perceived presence — you may not need to boost highs at all.", False, None)])

# ---- KEYS ----
h2("4.3 — Keyboard / Piano")
kv("Fundamental range", "wide — 60 Hz sub to 4 kHz attack; the workhorse midrange instrument")
kv("HPF", "~80–120 Hz (patch dependent)")
kv("Cuts (de-mud)", "400–600 Hz mud (Q≈4) especially when layered; low shelf ~200 Hz −3 to −6 dB for boomy pianos; 3.25 kHz to make room for vocals (Collaborate Worship)")
kv("Boosts (cut-through)", "1–2 kHz to cut through; 3 kHz peaking (Q≈4) to brighten piano; light 10 kHz air (Collaborate Worship)")
rich([("Masking move: ", True, AMB),
      ("keys and piano occupy the same wide midrange as the vocal — cut 3–4 kHz on keys during sung passages, or sidechain a dynamic EQ to duck only when the vocal is present.", False, None)])

# ---- BASS ----
h2("4.4 — Bass Guitar")
kv("Fundamental range", "~41 Hz (low E) up; body 120–250 Hz; presence 800 Hz–1 kHz")
kv("HPF", "35–45 Hz — remove sub rumble so the kick owns the very bottom")
kv("Cuts (de-mud)", "300–500 Hz mud; 40–120 Hz cut if fighting the kick's fundamental (Gear4music, iZotope)")
kv("Boosts (cut-through)", "80–110 Hz weight; 700 Hz–1.2 kHz definition/presence so it's audible on small speakers")
rich([("Kick/bass split: ", True, AMB),
      ("kick 50–80 Hz, bass 100–150 Hz — or sidechain/dynamic-EQ the bass at ~80 Hz so it ducks when the kick hits (Gear4music, Boris FX).", False, None)])

# ---- KICK ----
h2("4.5 — Kick Drum")
kv("Fundamental range", "40–100 Hz fundamental; knock 100–200 Hz; beater 'click' 2–5 kHz")
kv("HPF", "30–40 Hz — remove sub that competes with bass")
kv("Cuts (de-mud)", "200–500 Hz boxiness (classic −3 to −5 dB at ~400 Hz); 300–500 Hz (iZotope, Gear4music)")
kv("Boosts (cut-through)", "60–80 Hz punch; 100–200 Hz knock/body; 2.5–5 kHz beater attack — this makes the kick 'speak' over guitars (Gear4music, iZotope)")
rich([("Cut-through move: ", True, AMB),
      ("the 2.5–5 kHz click is how the kick stays audible without excessive sub — critical in a dense worship mix.", False, None)])

# ---- SNARE ----
h2("4.6 — Snare Drum")
kv("Fundamental range", "body 150–250 Hz; crack 2–3.5 kHz; air 8 kHz+")
kv("HPF", "80–100 Hz (cut below 80 Hz to remove rumble)")
kv("Cuts (de-mud)", "300–500 Hz boxiness; 400–700 Hz narrow ring; 900 Hz–1.5 kHz 'papery' tone (iZotope)")
kv("Boosts (cut-through)", "150–250 Hz body; 2–3.5 kHz attack/crack; 8 kHz+ air")
rich([("Vs. vocal: ", True, AMB),
      ("snare crack (1–3 kHz) competes with vocal presence — trim snare slightly in 1–3 kHz if it hides the vocal (Boris FX).", False, None)])

# ---- OVERHEAD ----
h2("4.7 — Drum Overhead")
kv("Fundamental range", "cymbals/kits — presence 5–12 kHz; low end mostly unwanted")
kv("HPF", "150–250 Hz — removes kick bleed; lower toward 150 if you want kit body")
kv("Cuts (de-mud/harshness)", "300–600 Hz mud; 3–6 kHz harshness; ~4 kHz sibilance clashes with vocal (iZotope)")
kv("Boosts (cut-through)", "5–12 kHz cymbal shimmer/air — subtle, +1 dB if dull")
rich([("Watch: ", True, RED),
      ("8 kHz+ overhead air can mask vocal sibilance — keep the high boost gentle (MasteringBOX).", False, None)])

# ---- BACKING ----
h2("4.8 — Backing Tracks + Extra Vocals")
kv("Fundamental range", "varies by stem — but always secondary to lead vox and instruments")
kv("HPF", "~40–80 Hz only if safe (depends on stems)")
kv("Cuts (de-mud)", "200–400 Hz mud; 2–4 kHz — the FIRST place to cut so backing content doesn't mask the lead vocal")
kv("Boosts", "usually NONE — preserve musical content, don't add")
rich([("Best practice: ", True, GREEN),
      ("lower/remove duplicate instruments or vocals using stems/multitracks rather than EQ where possible (Worship Sound Guy context). If stems aren't available, cut 3–4 kHz from backing vox and let the lead keep it (ProSoundWeb).", False, None)])

# ============================================================ 5
title("5 · The Quick Cut-Through Playbook")
p("When an instrument isn't cutting through, work this order before touching a fader:", bold=True)
for i, step in enumerate([
    "High-pass it — free the low end it doesn't own.",
    "Find the masked pocket — is another source sharing its key range? Cut the OTHER source there (subtractive).",
    "De-mud — trim 200–400 Hz low-mid buildup.",
    "Add presence — a small 2–5 kHz boost for attack/clarity.",
    "Only then check level — often it just needs a clean spectrum, not more volume.",
], start=1):
    p(f"{i}. {step}")

h3("Five rules that prevent mud in the first place")
bullet("Cut narrow, boost wide (surgical cuts, musical boosts).", bold_head="Q discipline:")
bullet("Cut before boost — prefer freeing space over adding energy.", bold_head="Order:")
bullet("Only one source owns any given frequency pocket at a time.", bold_head="Ownership:")
bullet("EQ in the FULL mix, never solo — soloed EQ doesn't translate.", bold_head="Context:")
bullet("Contrast, don't collide — bright source next to dark source, high octave next to low (MasteringBOX).", bold_head="Arrangement:")

# ============================================================ SOURCES
title("Sources")
sources = [
    ("Audient — Frequency Ranges Explained", "https://audient.com/tutorial/frequency-ranges-explained/"),
    ("iZotope — EQ Cheat Sheet (Nick Messitte)", "https://www.izotope.com/community/blog/eq-cheat-sheet"),
    ("iZotope — How to EQ Vocals", "https://www.izotope.com/community/blog/how-to-eq-vocals"),
    ("Boris FX — Frequency Masking Explained (Bojan Veselinovikj)", "https://borisfx.com/blog/frequency-masking-explained-and-how-to-fix-it/"),
    ("MasteringBOX — What is Frequency Masking?", "https://www.masteringbox.com/learn/frequency-masking"),
    ("Gear4music — Kick Drum EQ 101", "https://www.gear4music.com/blog/kick-drum-eq/"),
    ("Collaborate Worship — EQ Tips for Keys, Pianos & Synths", "https://collaborateworship.com/keys-eq/"),
    ("Audio Issues — Acoustic Guitar EQ (Björgvin Benediktsson)", "https://www.audio-issues.com/music-mixing/acoustic-guitar-eq/"),
    ("Worship Sound Guy — Live Vocal Mixing in Church", "https://worshipsoundguy.com/live-vocal-mixing-your-guide-to-mixing-vocalists-in-church/"),
    ("ProSoundWeb — Church Audio: Perfecting the Art of Vocal EQ (Chris Huff)", "https://www.prosoundweb.com/church-audio-basics-perfecting-the-art-of-vocal-eq/"),
]
for name, url in sources:
    par = doc.add_paragraph(style='List Bullet')
    par.add_run(name + ' — ').bold = True
    r = par.add_run(url)
    r.font.color.rgb = RGBColor(0x2A, 0x5B, 0x8F)

doc.add_paragraph()
p("Prepared by Leo — lead visual design & full-stack coder. Starting points, not rules: the room, the room's acoustics, and the full band are the final judge.", italic=True, color=MUTED, size=9)

out = "/home/d3g7760/Band_EQ_Shaping_CutThrough_Clarity.docx"
doc.save(out)
print("SAVED:", out)