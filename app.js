// Special Zaan: chat widget (mock) and menu card tilt.
// The chat makes no API calls; replies are fixed text.
(function () {
  var MOCK_REPLY = "Hi! I'm Special Zaan Assistant. My AI brain isn't connected yet.";

  var toggle = document.getElementById("chat-toggle");
  var windowEl = document.getElementById("chat-window");
  var closeBtn = windowEl.querySelector(".chat-close");
  var messages = document.getElementById("chat-messages");
  var form = document.getElementById("chat-form");
  var input = document.getElementById("chat-input");

  function setOpen(open) {
    windowEl.classList.toggle("open", open);
    windowEl.setAttribute("aria-hidden", open ? "false" : "true");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close Special Zaan Assistant chat" : "Open Special Zaan Assistant chat");
    if (open) {
      // Short delay so the click finishes before focus moves into the window.
      setTimeout(function () {
        input.focus();
      }, 50);
    }
  }

  function addBubble(text, who) {
    var bubble = document.createElement("div");
    bubble.className = "chat-bubble " + who;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  toggle.addEventListener("click", function () {
    setOpen(!windowEl.classList.contains("open"));
  });

  closeBtn.addEventListener("click", function () {
    setOpen(false);
    toggle.focus();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && windowEl.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) {
      return;
    }
    addBubble(text, "user");
    input.value = "";
    setTimeout(function () {
      addBubble(MOCK_REPLY, "bot");
    }, 600);
  });
})();

// Menu cards: cursor-tracking 3D tilt.
// Only CSS custom properties change, so the layout stays fixed. Only real mouse
// events trigger it (touch input is ignored), and reduced-motion visitors skip it.
(function () {
  var MAX_TILT = 8;   // degrees; kept small so the card stays under the cursor
  var REST_X = 0;     // cards rest flat
  var REST_Y = 0;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) {
    return;
  }

  var pending = null;
  var frame = null;

  function setTilt(card, x, y) {
    card.style.setProperty("--tilt-x", x.toFixed(2) + "deg");
    card.style.setProperty("--tilt-y", y.toFixed(2) + "deg");
  }

  function flush() {
    frame = null;
    if (pending) {
      setTilt(pending.card, pending.x, pending.y);
      pending = null;
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll(".menu-card"), function (card) {
    card.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") {
        return;
      }
      // Read the position on every move so scrolling while hovering stays accurate.
      var rect = card.getBoundingClientRect();
      var px = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      var py = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
      pending = {
        card: card,
        x: (0.5 - py) * 2 * MAX_TILT,
        y: (px - 0.5) * 2 * MAX_TILT
      };
      if (frame === null) {
        frame = requestAnimationFrame(flush);
      }
    });

    card.addEventListener("pointerleave", function () {
      pending = null;
      setTilt(card, REST_X, REST_Y);
    });
  });
})();
