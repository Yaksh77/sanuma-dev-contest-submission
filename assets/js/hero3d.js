// Three.js interactive 3D WebGL background nodes system for hero carousel

export function initHero3D() {
  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  // 1. Accessibility and Device Performance checks (Rule 4.4)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) || 
                    (navigator.deviceMemory && navigator.deviceMemory < 4);

  if (prefersReduced || isLowEnd || typeof THREE === 'undefined') {
    // Show high-quality CSS fallback
    container.classList.add('use-css-fallback');
    container.style.background = "var(--hero-bg)";
    return;
  }

  // 2. Setup Three.JS Scene
  let scene, camera, renderer, particles, lines;
  const particleCount = 70;
  const maxDistance = 120;
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];
  
  let width = container.clientWidth;
  let height = container.clientHeight;

  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.z = 400;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 3. Create Points Geometry
  const particleGeometry = new THREE.BufferGeometry();
  
  // Track theme colors programmatically from CSS variables
  let accentColorHex = getThemeAccentColor();

  const particleMaterial = new THREE.PointsMaterial({
    color: accentColorHex,
    size: 4,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  // Distribute particles randomly inside a cube bounds
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * 600 - 300;
    const y = Math.random() * 400 - 200;
    const z = Math.random() * 400 - 200;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    velocities.push({
      x: (Math.random() - 0.5) * 0.8,
      y: (Math.random() - 0.5) * 0.8,
      z: (Math.random() - 0.5) * 0.8
    });
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // 4. Create Connecting Line mesh
  const lineGeometry = new THREE.BufferGeometry();
  const lineMaterial = new THREE.LineBasicMaterial({
    color: accentColorHex,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
  });

  lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  // 5. Parallax Mouse Tracker
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.08;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.08;
  });

  // Helper: query brand colors from DOM variables
  function getThemeAccentColor() {
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue('--accent').trim();
    // Resolve standard formats (hex, rgb) to threejs color
    return new THREE.Color(accent);
  }

  // Listen to custom theme swap events (Rule 7.1)
  window.addEventListener('themeChanged', () => {
    const currentThemeColor = getThemeAccentColor();
    particleMaterial.color.copy(currentThemeColor);
    lineMaterial.color.copy(currentThemeColor);
  });

  // 6. Animation Render Loop
  function animate() {
    requestAnimationFrame(animate);

    // Apply smooth mouse parallax drift
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    scene.rotation.y = targetX * 0.01;
    scene.rotation.x = targetY * 0.01;

    // Move particles
    const positionsAttr = particles.geometry.attributes.position.array;
    const linePositions = [];
    const lineColors = [];

    for (let i = 0; i < particleCount; i++) {
      // Update coordinates by velocity
      positionsAttr[i * 3] += velocities[i].x;
      positionsAttr[i * 3 + 1] += velocities[i].y;
      positionsAttr[i * 3 + 2] += velocities[i].z;

      // Wrap around bounds
      if (positionsAttr[i * 3] < -300 || positionsAttr[i * 3] > 300) velocities[i].x *= -1;
      if (positionsAttr[i * 3 + 1] < -200 || positionsAttr[i * 3 + 1] > 200) velocities[i].y *= -1;
      if (positionsAttr[i * 3 + 2] < -200 || positionsAttr[i * 3 + 2] > 200) velocities[i].z *= -1;

      // Find nearby neighbors to draw connection lines
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positionsAttr[i * 3] - positionsAttr[j * 3];
        const dy = positionsAttr[i * 3 + 1] - positionsAttr[j * 3 + 1];
        const dz = positionsAttr[i * 3 + 2] - positionsAttr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePositions.push(positionsAttr[i * 3], positionsAttr[i * 3 + 1], positionsAttr[i * 3 + 2]);
          linePositions.push(positionsAttr[j * 3], positionsAttr[j * 3 + 1], positionsAttr[j * 3 + 2]);
        }
      }
    }

    particles.geometry.attributes.position.needsUpdate = true;

    // Update lines segment meshes
    if (linePositions.length > 0) {
      lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lines.visible = true;
    } else {
      lines.visible = false;
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize boundaries adjustments
  window.addEventListener('resize', () => {
    width = container.clientWidth;
    height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}
