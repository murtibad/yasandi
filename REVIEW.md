# REVIEW: feature/header-controls

Claude's review. Fix these on this same branch, then push and report. Delete this file in your last commit.

## Must fix

1. **End buttons show before the game ends.** "Tekrar oyna / Başka senaryo / Paylaş" are visible right after the intro (desktop and phone). Cause: `.end-actions { display: flex }` overrides the `hidden` attribute. Add a global `[hidden] { display: none !important; }` near the top of `css/style.css` and check that the buttons appear only after an ending and the "Hikâyeni anlat" link stays hidden.

2. **No sound in the first story after a refresh.** Browsers block all sound until the visitor clicks or presses a key, so the intro of the first story is always silent. Fix it the way old text games did: on page load, show only one blinking line in the story area, `Başlamak için bir tuşa bas ya da dokun_` (use the existing cursor style). On the first keydown or pointerdown anywhere: call `sound.unlock()`, remove that line, then start the random scenario. Only on the first load; "Başka senaryo" and "Tekrar oyna" start immediately. The key that starts the game must not be typed into the input.

## Should fix

3. **Icons are still easy to miss.** They are the same grey as the dimmest text. Use `var(--fg)` at about 75% opacity for the icons (full on hover), and keep the 40px tap targets.
4. **Sticky round background after clicking.** After a click the button keeps its hover circle on touch screens. Use `@media (hover: hover)` for the hover background, and a `:focus-visible` outline for keyboard users.

Test: refresh in dark and light, desktop and 390px wide. Screen must show only the start line, then the story with sound, no end buttons until an ending.
