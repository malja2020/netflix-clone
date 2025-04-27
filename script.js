const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  const container = carousel.querySelector('.carousel-container');
  const leftArrow = carousel.querySelector('.left');
  const rightArrow = carousel.querySelector('.right');

  let scrollAmount = 0;
  const scrollPerClick = 300; // adjust how much it moves per click

  rightArrow.addEventListener('click', () => {
    container.scrollBy({ left: scrollPerClick, behavior: 'smooth' });
  });

  leftArrow.addEventListener('click', () => {
    container.scrollBy({ left: -scrollPerClick, behavior: 'smooth' });
  });
});

const videos = document.querySelectorAll('video');

videos.forEach(video => {
  video.addEventListener('mouseenter', () => {
    video.muted = false; // Unmute
    video.play();
    setTimeout(() => {
      video.pause();
      video.currentTime = 0;
      video.load(); // Reload to reset back to poster
      video.muted = true; // Mute again
    }, 100000); // Play for 3 seconds
  });

  video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
    video.load(); // Reset to poster
    video.muted = true;
  });
});

const movies = document.querySelectorAll('.top10-carousel .movie video');

// Ensure videos are initially muted to pass autoplay restrictions
movies.forEach(movie => {
  movie.muted = true; // Initial mute to pass autoplay restrictions

  movie.addEventListener('mouseover', () => {
    movie.muted = false; // Unmute on hover to allow sound
    if (movie.paused) {
      movie.play(); // Start the video with sound
    }
  });

  movie.addEventListener('mouseleave', () => {
    movie.muted = true; // Re-mute when mouse leaves
    movie.pause(); // Pause the video when the mouse leaves
    movie.currentTime = 0; // Reset the video to the start
  });
});




const leftArrow = document.querySelector('.top10-carousel .left');
const rightArrow = document.querySelector('.top10-carousel .right');
const carouselContainer = document.querySelector('.top10-carousel .carousel-container');

// Animation duration in milliseconds
const animationDuration = 600;
const scrollAmount = 300; // How much to scroll per step

// Function to animate scrolling
function animateScroll(target, start, end, duration) {
  let startTime = null;

  // The function that will be called repeatedly by requestAnimationFrame
  function scrollAnimation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let progress = Math.min(timeElapsed / duration, 1); // Ensure progress doesn't exceed 1

    // Calculate the current position during the animation
    let currentScroll = start + (end - start) * progress;

    // Update the scroll position of the carousel
    carouselContainer.scrollLeft = currentScroll;

    // Continue animating until we reach the end
    if (progress < 1) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  // Start the animation
  requestAnimationFrame(scrollAnimation);
}

// Event listeners for the arrows
leftArrow.addEventListener('click', () => {
  let start = carouselContainer.scrollLeft;
  let end = start - scrollAmount;
  animateScroll(carouselContainer, start, end, animationDuration);
});

rightArrow.addEventListener('click', () => {
  let start = carouselContainer.scrollLeft;
  let end = start + scrollAmount;
  animateScroll(carouselContainer, start, end, animationDuration);
});

