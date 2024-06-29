const container = document.querySelector(".container");
const containerCarousel = container.querySelector(".container-carousel");
const carousel = container.querySelector(".carousel");
const carouselItems = carousel.querySelectorAll(".carousel-item");

let isMouseDown = false;
let startX = 0;
let rotation = 0;
let rotationOffset = 0;

const createCarousel = () => {
    const carouselProps = onResize();
    const length = carouselItems.length;
    const degrees = 360 / length;
    const gap = 20; // Adjust gap between items as needed
    const tz = distanceZ(carouselProps.w, length, gap);

    carousel.style.width = tz * 2 + gap * length + "px";
    carousel.style.transform = `translateZ(${-tz}px) rotateY(${rotation}deg)`;

    carouselItems.forEach((item, i) => {
        const degreesByItem = degrees * i;
        item.style.transform = `rotateY(${degreesByItem}deg) translateZ(${tz}px)`;
    });
};

const distanceZ = (widthElement, length, gap) => {
    return (widthElement / 2) / Math.tan(Math.PI / length) + gap;
};

const onResize = () => {
    const carouselDimensions = containerCarousel.getBoundingClientRect();
    return {
        w: carouselDimensions.width,
        h: carouselDimensions.height,
    };
};

const getMouseX = (e) => {
    return e.clientX || e.touches[0].clientX;
};

const handleMouseDown = (e) => {
    isMouseDown = true;
    startX = getMouseX(e);
    rotationOffset = rotation;
};

const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const x = getMouseX(e);
    const diff = (x - startX) * 0.15; // Adjust speed of rotation
    rotation = rotationOffset - diff;
    const tz = distanceZ(containerCarousel.offsetWidth, carouselItems.length, 20);
    carousel.style.transform = `translateZ(${-tz}px) rotateY(${rotation}deg)`;
};

const handleMouseUp = () => {
    isMouseDown = false;
};

const handleMouseLeave = () => {
    isMouseDown = false;
};

const initEvents = () => {
    carousel.addEventListener("mousedown", handleMouseDown);
    carousel.addEventListener("mousemove", handleMouseMove);
    carousel.addEventListener("mouseup", handleMouseUp);
    carousel.addEventListener("mouseleave", handleMouseLeave);

    carousel.addEventListener("touchstart", (e) => {
        handleMouseDown(e.touches[0]);
    });

    carousel.addEventListener("touchmove", (e) => {
        handleMouseMove(e.touches[0]);
    });

    carousel.addEventListener("touchend", handleMouseUp);

    window.addEventListener("resize", createCarousel);

    createCarousel();
};

initEvents();
