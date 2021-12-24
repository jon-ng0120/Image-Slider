'use strict';

const images = ['image-1.jpg', 'image-2.jpg', 'image-3.jpg'];
const mainContainer = document.querySelector('#main-container');
const imageSelection = document.querySelector('#image-selection');
const slideImage = document.querySelector('#slide-img');
const overlay = document.querySelector('#overlay');

window.onload = () => {
  createDots();
  retrieveImage(images[0]); // defaults to first image in array on load
  applyActiveDot(document.querySelectorAll('.dot')[0]); // apply active dot on first image
};

// DOTS

const createDots = () => {
  images.forEach((image) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('dot-id', image);
    imageSelection.appendChild(dot);
  });
};

const applyActiveDot = (element) => {
  element.classList.add('active-dot');
};

const removeActiveDots = () => {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot) => {
    dot.classList.remove('active-dot');
  });
};

const activateNextDot = () => {
  const activeSlideId = slideImage.getAttribute('picture-id');
  applyActiveDot(document.querySelector(`[dot-id='${activeSlideId}']`));
};

// IMAGES

const retrieveImage = (pictureId) => {
  slideImage.src = `images/${pictureId}`;
  slideImage.setAttribute('picture-id', pictureId);
  slideImage.classList.remove('fade');
};

const prevImage = () => {
  const currentImageId = slideImage.getAttribute('picture-id');
  const imageIndex = images.findIndex((img) => img == currentImageId);
  removeActiveDots();
  if (imageIndex == 0) {
    retrieveImage(images[images.length - 1]);
  } else {
    retrieveImage(images[imageIndex - 1]);
  }
  activateNextDot();
};

const nextImage = () => {
  const currentImageId = slideImage.getAttribute('picture-id');
  const imageIndex = images.findIndex((img) => img == currentImageId);
  removeActiveDots();
  if (imageIndex == images.length - 1) {
    retrieveImage(images[0]);
  } else {
    retrieveImage(images[imageIndex + 1]);
  }
  activateNextDot();
};

// EVENT LISTENERS

document.querySelector('#next-image').addEventListener('click', () => {
  nextImage();
});

document.querySelector('#previous-image').addEventListener('click', () => {
  prevImage();
});

mainContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dot')) {
    const targetImageId = e.target.getAttribute('dot-id');
    removeActiveDots();
    retrieveImage(targetImageId);
    applyActiveDot(e.target);
  }
});

setInterval(() => {
  nextImage();
}, 5000);
