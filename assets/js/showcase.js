// Before & After Interactive Inspection Room engine

const SHOWCASE_DATA = {
  macbook: {
    beforeSrc: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=900&auto=format&fit=crop&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&auto=format&fit=crop&q=80',
    beforeAlt: 'MacBook logic board with visible liquid corrosion damage',
    afterAlt: 'MacBook logic board after professional micro-soldering restoration',
    caseTitle: 'MacBook Pro Logic Board — Liquid Corrosion Recovery',
    caseFindings: '"Carbonated beverage spill caused acid erosion on PPBUS capacitors and corroded copper trace pathways near the Thunderbolt controller. Ultrasonic bath cleaning followed by stereomicroscope trace reconstruction."',
    complexity: '9.2 / 10',
    duration: '3.5 Hours',
    hotspots: [
      { x: 28, y: 38, title: 'Corroded Capacitor C7020', body: 'Shorted to ground from liquid contact. Replaced with original-spec ceramic capacitor under 40× lens.' },
      { x: 55, y: 60, title: 'Broken Trace Line', body: 'Acid-eroded copper lane reconstructed using conductive silver epoxy and fine solder wire.' }
    ]
  },
  phone: {
    beforeSrc: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=900&auto=format&fit=crop&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&auto=format&fit=crop&q=80',
    beforeAlt: 'iPhone with severely cracked OLED screen and shattered glass panel',
    afterAlt: 'iPhone with pristine new OEM-spec OLED display after professional replacement',
    caseTitle: 'iPhone 15 Pro Max — OLED Display Integration',
    caseFindings: '"Drop impact shattered the Ceramic Shield glass and fractured the OLED panel matrix. Thermal plate separation at 85°C removed the original assembly. New OEM-grade panel press-bonded and digitizer calibrated."',
    complexity: '6.5 / 10',
    duration: '1.5 Hours',
    hotspots: [
      { x: 42, y: 30, title: 'Shattered Digitizer Layer', body: 'Touch matrix completely broken. New full assembly with force-touch calibration data restored.' },
      { x: 60, y: 65, title: 'Frame Adhesive Seal', body: 'IP68 waterproof gasket re-applied post-assembly to maintain original dust and water resistance rating.' }
    ]
  },
  desktop: {
    beforeSrc: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=900&auto=format&fit=crop&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1593640408182-31c228f63e7c?w=900&auto=format&fit=crop&q=80',
    beforeAlt: 'Gaming PC CPU with dried and flaking thermal compound causing high temperatures',
    afterAlt: 'Gaming PC CPU after professional thermal repaste with temperatures reduced by 22°C',
    caseTitle: 'Gaming Rig — CPU/GPU Thermal Repaste & Liquid Cooling',
    caseFindings: '"6-year-old thermal paste had oxidized and crumbled, blocking heat transfer to the copper block. Disassembled AIO cooler, applied Thermal Grizzly Kryonaut compound, re-routed tubing. Peak temps dropped from 97°C to 75°C under full load."',
    complexity: '5.8 / 10',
    duration: '2 Hours',
    hotspots: [
      { x: 50, y: 45, title: 'CPU Heat Spreader', body: 'Dried compound scraped with isopropyl alcohol. Fresh Kryonaut diamond-particle paste applied in cross pattern.' },
      { x: 30, y: 62, title: 'AIO Pump Assembly', body: 'Pump impeller cleared of sediment. Distilled coolant flushed and refilled with anti-algae solution.' }
    ]
  }
};

export function initShowcase() {
  const tabBtns = document.querySelectorAll('.showcase-tab-btn');
  if (!tabBtns.length) return;

  const viewport = document.getElementById('slider-viewport');
  const imgBefore = document.getElementById('img-before');
  const imgAfter = document.getElementById('img-after');
  const layerBefore = document.getElementById('img-layer-before');
  const divider = document.getElementById('slider-divider-line');
  const hotspotsContainer = document.getElementById('hotspots-layer-container');

  // Case notes elements
  const caseTitle = document.getElementById('case-title');
  const caseFindings = document.getElementById('case-findings');
  const caseComplexity = document.getElementById('case-complexity');
  const caseDuration = document.getElementById('case-duration');

  let isDragging = false;
  let currentPosition = 50; // percentage

  // Load the default (macbook) category on init
  loadCategory('macbook');

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadCategory(btn.dataset.category);
    });
  });

  function loadCategory(key) {
    const data = SHOWCASE_DATA[key];
    if (!data) return;

    // Swap images
    imgBefore.src = data.beforeSrc;
    imgBefore.alt = data.beforeAlt;
    imgAfter.src = data.afterSrc;
    imgAfter.alt = data.afterAlt;

    // Lazy loading
    imgBefore.loading = 'lazy';
    imgAfter.loading = 'lazy';

    // Reset slider to 50%
    currentPosition = 50;
    applyPosition(50);

    // Update case notes
    if (caseTitle) caseTitle.textContent = data.caseTitle;
    if (caseFindings) caseFindings.textContent = data.caseFindings;
    if (caseComplexity) caseComplexity.textContent = data.complexity;
    if (caseDuration) caseDuration.textContent = data.duration;

    // Render hotspot pins
    renderHotspots(data.hotspots, currentPosition);
  }

  function applyPosition(percent) {
    // Clamp between 5% and 95%
    percent = Math.max(5, Math.min(95, percent));
    currentPosition = percent;

    // Clip the before layer to the drag position
    layerBefore.style.width = `${percent}%`;
    divider.style.left = `${percent}%`;

    // Show/hide hotspots based on which side they're on
    updateHotspotVisibility(percent);
  }

  // Mouse events
  divider.addEventListener('mousedown', startDrag);
  viewport.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);

  // Touch events for mobile
  divider.addEventListener('touchstart', startDrag, { passive: true });
  viewport.addEventListener('touchmove', onDrag, { passive: false });
  document.addEventListener('touchend', stopDrag);

  // Keyboard accessibility on the divider
  divider.setAttribute('tabindex', '0');
  divider.setAttribute('role', 'slider');
  divider.setAttribute('aria-label', 'Comparison slider. Use arrow keys to compare before and after.');
  divider.setAttribute('aria-valuenow', '50');
  divider.setAttribute('aria-valuemin', '5');
  divider.setAttribute('aria-valuemax', '95');

  divider.addEventListener('keydown', (e) => {
    let step = 5;
    if (e.key === 'ArrowLeft') {
      applyPosition(currentPosition - step);
      divider.setAttribute('aria-valuenow', Math.round(currentPosition));
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      applyPosition(currentPosition + step);
      divider.setAttribute('aria-valuenow', Math.round(currentPosition));
      e.preventDefault();
    } else if (e.key === 'Home') {
      applyPosition(5);
      e.preventDefault();
    } else if (e.key === 'End') {
      applyPosition(95);
      e.preventDefault();
    }
  });

  // Double-click to reset to center
  divider.addEventListener('dblclick', () => {
    applyPosition(50);
  });

  // Click anywhere on viewport to jump the divider there
  viewport.addEventListener('click', (e) => {
    if (isDragging) return;
    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;
    applyPosition((x / rect.width) * 100);
  });

  function startDrag(e) {
    isDragging = true;
    divider.style.cursor = 'grabbing';
    e.stopPropagation();
  }

  function onDrag(e) {
    if (!isDragging) return;
    e.preventDefault();

    const rect = viewport.getBoundingClientRect();
    let clientX = e.clientX;
    if (e.touches && e.touches.length) {
      clientX = e.touches[0].clientX;
    }

    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    applyPosition(percent);
    divider.setAttribute('aria-valuenow', Math.round(currentPosition));
  }

  function stopDrag() {
    isDragging = false;
    divider.style.cursor = 'ew-resize';
  }

  function renderHotspots(hotspots, currentPct) {
    hotspotsContainer.innerHTML = '';

    hotspots.forEach((spot, idx) => {
      const pin = document.createElement('div');
      pin.className = 'hotspot-pin-wrapper';
      pin.style.position = 'absolute';
      pin.style.left = `${spot.x}%`;
      pin.style.top = `${spot.y}%`;

      pin.innerHTML = `
        <div class="hotspot-pin" tabindex="0" role="button" aria-label="${spot.title}">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <circle cx="5" cy="5" r="3" fill="white"/>
          </svg>
        </div>
        <div class="hotspot-tooltip" role="tooltip" id="hotspot-tip-${idx}">
          <div class="tooltip-title">${spot.title}</div>
          <div class="tooltip-body">${spot.body}</div>
        </div>
      `;

      // Keyboard open tooltip on Enter/Space
      const pinBtn = pin.querySelector('.hotspot-pin');
      pinBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          pin.classList.toggle('keyboard-open');
          e.preventDefault();
        }
      });

      hotspotsContainer.appendChild(pin);
    });

    updateHotspotVisibility(currentPct);
  }

  function updateHotspotVisibility(percent) {
    const pins = hotspotsContainer.querySelectorAll('.hotspot-pin-wrapper');
    pins.forEach(pin => {
      const pinX = parseFloat(pin.style.left);
      // Hotspots on the "before" side (left of divider) stay visible; after side hidden when covered
      // We show all pins always but adjust z-index based on side
      if (pinX < percent) {
        pin.style.zIndex = '30';
        pin.classList.remove('hidden');
      } else {
        pin.style.zIndex = '6';
        pin.classList.remove('hidden');
      }
    });
  }
}
