export function initMarqueeScroll() {
  const track = document.querySelector(".brands-track");
  if (track) {
    track.innerHTML += track.innerHTML;
  }
}