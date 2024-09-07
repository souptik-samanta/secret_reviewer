// Change the background color dynamically
document.body.style.backgroundColor = "#333";  // Default color, can be changed

// Sample list of images (replace with actual image URLs or use a backend to fetch dynamically)
const images = [
    './img/img1.png',
    './img/img2.png',
    './img/img1.png',
    './img/img1.png',
    './img/img1.png',
];

// Infinite scrolling variables
let currentImageIndex = 0;
const galleryContainer = document.getElementById('gallery-container');

// Function to load images dynamically
function loadImages() {
    for (let i = 0; i < 5; i++) {  // Load 5 images at a time
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;  // Reset to the beginning for infinite effect
        }

        const imageFrame = document.createElement('div');
        imageFrame.classList.add('image-frame');

        const img = document.createElement('img');
        img.src = images[currentImageIndex];
        imageFrame.appendChild(img);

        // Add Three.js frame effect here
        addThreeJsFrame(imageFrame);

        galleryContainer.appendChild(imageFrame);
        currentImageIndex++;
    }
}

// Infinite scroll listener
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadImages();
    }
});

// Initial load
loadImages();

// Adding a simple Three.js frame to each image
function addThreeJsFrame(container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 392 / 698, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(392, 698);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(380, 680, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const frame = new THREE.Mesh(geometry, material);
    scene.add(frame);

    camera.position.z = 500;

    const animate = function () {
        requestAnimationFrame(animate);
        frame.rotation.x += 0.01;
        frame.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();
}
