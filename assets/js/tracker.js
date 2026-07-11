// Interactive Repair Tracker dynamic dashboard engine

const MOCK_TRACK_DATA = {
  'ROB-BOARD-88': {
    device: 'MacBook Pro M2',
    activeStep: 3,
    techName: 'Amit Trivedi (Level 3 Solder Expert)',
    techNotes: 'Liquid corrosion cleared from PPBUS capacitor line. Reconstructed pad traces under 40x zoom loop. Replaced shorted C7020 capacitor.',
    logs: [
      'Device inventory check-in complete. Unit placed in electrostatic shielding zone.',
      'Completed physical inspection of MacBook chassis. Solid battery integrity scan.',
      'Initial board diagnostics: Isolated PPBUS_G3H voltage rail drop to 1.2V.',
      'Thermal micro-scanning: Highlighted massive thermal leak near display charging logic.',
      'Workbench microscopes engaged. Disassembled motherboard logic block.',
      'Identified liquid corrosion on capacitor C7020. Removed capacitor, cleared pad corrosion.',
      'Successfully soldered original spec ceramic capacitor C7020 to board rails.',
      'Power rail diagnostic scan: PPBUS_G3H restored to stable 12.6V.',
      'Reassembling motherboard. Initiating system boot diagnostics.'
    ],
    viewportImg: 'https://images.unsplash.com/photo-1642229407420-a659dac2f029?q=80&w=600&auto=format&fit=crop',
    viewportTitle: 'Microscope Viewport [Live Solder]',
    warrantySerial: 'ROB-W-BOARD-88-M2',
    benchmarks: {
      type: 'live_voltage',
      verdict: 'Running Diagnostics (Testing Rails)'
    }
  },
  'ROB-SCREEN-45': {
    device: 'iPhone 15 Pro Max',
    activeStep: 5,
    techName: 'Siddharth Sen (Screen Assembly Lead)',
    techNotes: 'Screen panel separation and OLED replacement completed. Screen touch coordinate parameters auto-calibrated successfully. Dispatched.',
    logs: [
      'Logged unit into Smartphone Diagnostics Bay. Screen glass fractures noted.',
      'Thermal plate set to 80°C. Loosened screen outer adhesive seal.',
      'Engaged vacuum mechanical press to separate cracked display panel cleanly.',
      'Cleared frame residue. Prepared bezel borders for display integration.',
      'Integrated original-specification OLED touch panel assembly.',
      'Calibrated digitizer coordinates. Completed pixel scan: 100% pass.',
      'Bench testing: Temperature loops complete. Stress benchmark passed.',
      'Physical frame sanitation. Safe packaging transition complete.',
      'Dispatched package with tech rider ID: #402. Assigned route courier.'
    ],
    viewportImg: 'https://images.unsplash.com/photo-1597872200319-380d92503d27?w=600&auto=format&fit=crop&q=60',
    viewportTitle: 'Cleanroom Assembly Bench [Final Inspection]',
    warrantySerial: 'ROB-W-SCREEN-45-IP15',
    benchmarks: {
      type: 'completed_flat',
      verdict: 'Passed Stress Loops (100% Functional)'
    }
  }
};

export function initTracker() {
  const inputRef = document.getElementById('order-ref-input');
  const btnSubmit = document.getElementById('btn-track-submit');
  const panel = document.getElementById('tracker-dashboard-panel');
  
  if (!btnSubmit || !panel) return;

  let animFrameId = null;

  btnSubmit.addEventListener('click', () => {
    const code = inputRef.value.trim().toUpperCase();
    if (!code) {
      alert('Please enter a valid tracking reference code.');
      return;
    }

    const data = MOCK_TRACK_DATA[code];
    if (!data) {
      alert('Order code not found. Try testing with "ROB-BOARD-88" or "ROB-SCREEN-45".');
      return;
    }

    // Cancel any ongoing animation loops
    if (animFrameId) cancelAnimationFrame(animFrameId);

    // Bootstrap dashboard layout
    renderTrackerDashboard(data);
  });

  // Support pressing enter key in search field
  inputRef.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      btnSubmit.click();
    }
  });

  function renderTrackerDashboard(data) {
    // Reveal dashboard
    panel.style.display = 'grid';
    setTimeout(() => {
      panel.classList.add('active');
    }, 50);

    // 1. Render vertical timeline checkpoints status
    const steps = document.querySelectorAll('#timeline-steps-list .timeline-step');
    steps.forEach(node => {
      const stepId = parseInt(node.getAttribute('data-step-id'), 10);
      node.classList.remove('active', 'completed', 'inactive');
      
      if (stepId === data.activeStep) {
        node.classList.add('active');
      } else if (stepId < data.activeStep) {
        node.classList.add('completed');
      } else {
        node.classList.add('inactive');
      }
    });

    // 2. Render Technician assigned profiles
    document.getElementById('tech-name').textContent = data.techName;
    document.getElementById('tech-notes').textContent = `"${data.techNotes}"`;

    // 3. Render Viewport Frame
    document.getElementById('res-viewport-title').textContent = data.viewportTitle;
    const vpImg = document.getElementById('console-viewport-img');
    vpImg.src = data.viewportImg;

    // 4. Render Digi-Warranty details
    document.getElementById('warranty-serial-code').textContent = data.warrantySerial;
    const downloadBtn = document.getElementById('btn-download-cert');
    downloadBtn.onclick = (e) => {
      e.preventDefault();
      alert(`Digi-Warranty Certificate download initialized for serial: ${data.warrantySerial}`);
    };

    // 5. Render logs feeds with delayed simulated console printing
    const logsList = document.getElementById('console-logs-list');
    logsList.innerHTML = '';
    
    let logIndex = 0;
    function printNextLog() {
      if (logIndex < data.logs.length) {
        const item = document.createElement('li');
        item.className = 'log-item';
        item.style.marginBottom = 'var(--space-2)';
        item.style.opacity = '0';
        item.style.transform = 'translateY(5px)';
        item.style.transition = 'all 0.3s ease';
        
        // Output clean timestamped log message
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        item.innerHTML = `<span style="color:#888;">[${timeStr}]</span> ${data.logs[logIndex]}`;
        
        logsList.appendChild(item);
        logsList.scrollTop = logsList.scrollHeight;

        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 50);

        logIndex++;
        setTimeout(printNextLog, 1200); // 1.2s delay per log print
      }
    }
    printNextLog();

    // 6. Draw dynamic Canvas benchmarking graph (deferred to next frame so layout is painted)
    document.getElementById('diag-bench-verdict').textContent = data.benchmarks.verdict;
    requestAnimationFrame(() => drawBenchmarkingGraph(data.benchmarks.type));
  }

  function drawBenchmarkingGraph(type) {
    const canvas = document.getElementById('benchmark-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Scale for device pixel density
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Guard: retry on next frame if canvas has not been laid out yet
    if (rect.width === 0 || rect.height === 0) {
      requestAnimationFrame(() => drawBenchmarkingGraph(type));
      return;
    }

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Data points container
    const points = [];
    const maxPoints = 30;
    for (let i = 0; i < maxPoints; i++) {
      points.push(40); // Initial baseline temperatures (40C)
    }

    let time = 0;

    function renderChartFrame() {
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = '#222222';
      ctx.lineWidth = 1;
      
      // Horizontal grid
      for (let y = 20; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Add a new mock data point based on telemetry type
      time += 0.15;
      let newTemp = 40;
      if (type === 'live_voltage') {
        // High fluctuation stress loop (45°C - 75°C)
        newTemp = 50 + Math.sin(time) * 15 + Math.cos(time * 2) * 5;
      } else {
        // Flat, stable temperature (32°C - 35°C)
        newTemp = 33 + Math.sin(time) * 1;
      }

      points.shift();
      points.push(newTemp);

      // Draw line path
      ctx.strokeStyle = '#00FF66';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const stepX = width / (maxPoints - 1);
      
      points.forEach((val, idx) => {
        // Map temp values (30C to 80C) to height limits
        const mappedY = height - ((val - 30) / 50) * height;
        const mappedX = idx * stepX;
        
        if (idx === 0) {
          ctx.moveTo(mappedX, mappedY);
        } else {
          ctx.lineTo(mappedX, mappedY);
        }
      });
      ctx.stroke();

      // Create glowing gradient under line path
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, 'rgba(0, 255, 102, 0.25)');
      grad.addColorStop(1, 'rgba(0, 255, 102, 0.0)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Highlight active pulse dot on latest data point
      const lastVal = points[points.length - 1];
      const dotY = height - ((lastVal - 30) / 50) * height;
      
      ctx.fillStyle = '#00FF66';
      ctx.beginPath();
      ctx.arc(width - 5, dotY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Live tag text value
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '11px sans-serif';
      ctx.fillText(`${Math.round(lastVal)}°C`, width - 40, dotY - 8);

      animFrameId = requestAnimationFrame(renderChartFrame);
    }

    renderChartFrame();
  }
}
