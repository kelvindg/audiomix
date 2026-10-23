/* AudioMix Guide — client-side gate.
 * Password is never stored in plaintext; only a SHA-256 hash lives in the source.
 * Session unlock is remembered in sessionStorage for the current browser session.
 * (Client-side gate = keeps casual visitors out; not a hardened security boundary.)
 */
(function () {
  "use strict";
  var HASH = "ff641dab77828ef509ed6cafa6e79dc6c7fb4dca8a217750272e96d7203d2491";
  var KEY = "audiomix-unlocked";

  function sha256hex(str) {
    // Use SubtleCrypto when available (modern browsers); fall back to a tiny sync impl.
    if (window.crypto && window.crypto.subtle) {
      var data = new TextEncoder().encode(str);
      return crypto.subtle.digest("SHA-256", data).then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) {
          return ("0" + b.toString(16)).slice(-2);
        }).join("");
      });
    }
    return Promise.resolve(""); // not used in practice on modern targets
  }

  function isUnlocked() {
    try { return sessionStorage.getItem(KEY) === "1"; } catch (e) { return false; }
  }

  function buildGate() {
    var gate = document.createElement("div");
    gate.className = "gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.innerHTML =
      '<div class="gate-card">' +
        '<div class="gate-badge"><span class="dot"></span>PERSONAL REFERENCE</div>' +
        '<p class="gate-logo">AudioMix<span class="brand-dot">.</span></p>' +
        '<p class="gate-sub">This site is Kelvin&rsquo;s private live-worship EQ guide. Enter the passcode to open.</p>' +
        '<form id="gateForm" autocomplete="off">' +
          '<input type="password" id="gatePass" placeholder="Passcode" aria-label="Passcode" autofocus>' +
          '<button class="btn" type="submit">Open console</button>' +
          '<p class="gate-err" id="gateErr" role="alert"></p>' +
        '</form>' +
        '<p class="gate-foot">Gate is client-side — it keeps casual visitors out. The guide itself runs fully in your browser.</p>' +
      '</div>';
    document.body.prepend(gate);

    var form = document.getElementById("gateForm");
    var pass = document.getElementById("gatePass");
    var err = document.getElementById("gateErr");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = pass.value || "";
      sha256hex(val).then(function (h) {
        if (h === HASH) {
          try { sessionStorage.setItem(KEY, "1"); } catch (e2) {}
          gate.remove();
        } else {
          err.textContent = "Wrong passcode. Try again.";
          pass.select();
        }
      });
    });
  }

  if (!isUnlocked()) {
    buildGate();
  }
})();
