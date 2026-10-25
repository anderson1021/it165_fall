// 4.3: An array of strings stores the five local image paths.
const images = [
  "images/landscape1.svg",
  "images/landscape2.svg",
  "images/landscape3.svg",
  "images/landscape4.svg",
  "images/landscape5.svg"
];
const captions = ["Mountain morning", "Desert sunset", "Forest horizon", "Ocean escape", "Evening hills"];
const descriptions = [
  "Mountain peaks beneath a warm sun",
  "Orange desert dunes beneath a setting sun",
  "Evergreen trees in front of distant mountains",
  "Ocean waves beneath a sunny blue sky",
  "Purple hills beneath the evening moon"
];

// Arrays begin at index 0, so the fifth image is at index 4.
let currentIndex = 0;
const slideImage = document.getElementById("slide-image");
const slideCaption = document.getElementById("slide-caption");
const slideCounter = document.getElementById("slide-counter");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

function showSlide() {
  slideImage.src = images[currentIndex];
  slideImage.alt = descriptions[currentIndex];
  slideCaption.textContent = captions[currentIndex];
  slideCounter.textContent = `${currentIndex + 1} / ${images.length}`;
}

nextButton.addEventListener("click", function () {
  currentIndex++;
  // Going past index 4 returns to the first image (index 0).
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  showSlide();
});

previousButton.addEventListener("click", function () {
  currentIndex--;
  // Going below index 0 returns to the last image (index 4).
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  showSlide();
});
showSlide();
