// Device Diagnosis Center engine module

const SYMPTOMS_DATA = {
  macbook: [
    { id: 'power', label: 'Won\'t boot / no power indicator' },
    { id: 'flicker', label: 'Screen flickering / dim display backlight' },
    { id: 'spill', label: 'Recent liquid spill or moisture exposure' },
    { id: 'battery', label: 'Battery draining fast / service warning' },
    { id: 'fan', label: 'Extreme fan noise / burning smell' },
    { id: 'storage', label: 'Question mark folder on startup' }
  ],
  laptop: [
    { id: 'power', label: 'Powers on but display is black' },
    { id: 'battery', label: 'Plugged in but not charging' },
    { id: 'blue_screen', label: 'Blue screen crashes (BSOD) or freezes' },
    { id: 'slow', label: 'Extremely slow boot times and lag' },
    { id: 'spill', label: 'Spill incident / sticky key failure' },
    { id: 'upgrade', label: 'Out of storage / low memory warning' }
  ],
  smartphone: [
    { id: 'glass', label: 'Cracked screen glass / touch unresponsive' },
    { id: 'charge', label: 'Charging port is loose / wiggles' },
    { id: 'bootloop', label: 'Stuck in reboot loop on brand logo' },
    { id: 'battery', label: 'Battery swelling / drops from 50% to zero' },
    { id: 'camera', label: 'Camera lens cracked or blur autofocus' },
    { id: 'water', label: 'Submerged in water / moisture error' }
  ],
  gamingpc: [
    { id: 'freeze', label: 'Crashes / freezes under high graphic gaming' },
    { id: 'fan', label: 'Pump bubbling noise / click fan sounds' },
    { id: 'boot', label: 'Stuck on BIOS screen / no boot drive' },
    { id: 'gpu', label: 'Visual glitches / colorful stripes on screen' },
    { id: 'power', label: 'Shuts down immediately under high processing load' }
  ],
  tablet: [
    { id: 'glass', label: 'Cracked digitizer panel / ghost touch' },
    { id: 'charge', label: 'USB port loose / slow charge' },
    { id: 'boot', label: 'Stuck on Apple or brand recovery screen' },
    { id: 'battery', label: 'Back cover expansion / battery health low' }
  ]
};

// Diagnosis Rules database
const DIAGNOSIS_RULES = {
  macbook: [
    {
      trigger: ['spill'],
      verdict: 'Logic Board Liquid Corrosion',
      confidence: 95,
      cause: 'Liquid contact has shorted power capacitors and corroded micro traces on the main logical board layers. Requires ultrasonic chemical cleaning and trace micro-soldering.',
      service: 'Board Soldering & Spill Cleanup',
      cost: '₹5,500 - ₹12,000',
      tips: [
        'Do not plug in the charger to prevent copper trace degradation.',
        'Keep the device inverted in a V-shape to drain fluid away from board.',
        'Requires ESD microscopic diagnostics immediately.'
      ]
    },
    {
      trigger: ['power'],
      verdict: 'Logic Board PPBUS Power Rail Failure',
      confidence: 88,
      cause: 'A ceramic filter capacitor on the high voltage input rail (e.g. PPBUS_G3H) has shorted to ground, forcing the power management IC to trigger safety shutdown.',
      service: 'Logic Board Solder Svc',
      cost: '₹6,500 - ₹14,500',
      tips: [
        'Do not force power on using keyboard commands.',
        'Requires in-house chip voltage-injection diagnostics to locate the short.',
        '100% data remains secure, no drive reset needed.'
      ]
    },
    {
      trigger: ['flicker'],
      verdict: 'Flexgate / Backlight Driver Fault',
      confidence: 90,
      cause: 'Repeated opening and closing of display has worn down the display flex cables, or the screen backlight LED driver chip has blown its output fuse.',
      service: 'MacBook Screen Flex Solder',
      cost: '₹8,500 - ₹18,500',
      tips: [
        'Avoid bending display past 90 degrees.',
        'We repair display flex connectors directly under microscope loop, saving screen replacement cost.'
      ]
    },
    {
      trigger: ['battery'],
      verdict: 'Lithium Cell Chemistry Exhaustion',
      confidence: 99,
      cause: 'The lithium polymer battery packs have completed their structural lifecycle limits (typically over 800 charge cycles). Cells need professional removal and calibration.',
      service: 'Same-day Battery replacement',
      cost: '₹4,500 - ₹7,500',
      tips: [
        'Avoid using high voltage power adapters.',
        'Store in a cool environment to prevent cell swelling.'
      ]
    },
    {
      trigger: ['storage'],
      verdict: 'SSD Controller / Corrupt boot sector',
      confidence: 85,
      cause: 'The solid-state flash storage controller is unable to read system boot sectors. Requires EFI firmware check or SSD controller re-soldering.',
      service: 'Data Recovery & Restore',
      cost: '₹3,500 - ₹8,500',
      tips: [
        'Do not select erase or format options in disk utilities.',
        'We salvage data directly from board storage nodes.'
      ]
    }
  ],
  laptop: [
    {
      trigger: ['power'],
      verdict: 'BIOS Chip / Charging IC fault',
      confidence: 85,
      cause: 'A corrupted SPI BIOS chip configuration or failed input charging mosfet gate prevents system power bootstrap sequence.',
      service: 'Motherboard IC Solder',
      cost: '₹4,500 - ₹8,500',
      tips: [
        'Do not use generic adapters.',
        'Board needs bios flashing on programmer.'
      ]
    },
    {
      trigger: ['battery'],
      verdict: 'Failing Battery Charger Mosfet',
      confidence: 90,
      cause: 'Input battery charging circuit controls (Mosfet gates) are unable to bridge voltage to battery terminals.',
      service: 'Laptop Charger Circuit Fix',
      cost: '₹2,500 - ₹4,500',
      tips: [
        'Verify adapter outputs with voltmeter.',
        'Charging port pins check is needed.'
      ]
    },
    {
      trigger: ['blue_screen'],
      verdict: 'Memory (RAM) / Storage Corruption',
      confidence: 80,
      cause: 'System paging memory sectors (RAM) or hard drive blocks are experiencing hardware write failures under processing loops.',
      service: 'Hardware SSD/RAM upgrade',
      cost: '₹2,000 - ₹5,000',
      tips: [
        'Backup crucial files immediately.',
        'Avoid run benchmarks before memory scanner test.'
      ]
    }
  ],
  smartphone: [
    {
      trigger: ['glass'],
      verdict: 'Cracked Touch LCD / Digitizer Fault',
      confidence: 99,
      cause: 'High impact drop has shattered front safety glass and ruptured the touch digitizer matrix lanes underneath.',
      service: 'Original Spec Screen swap',
      cost: '₹3,500 - ₹12,500',
      tips: [
        'Do not apply pressure on broken display.',
        'Backup phone parameters immediately.'
      ]
    },
    {
      trigger: ['charge'],
      verdict: 'Charging Port Pin Damage',
      confidence: 95,
      cause: 'Repeated cord insertions have bent the inner contact pins of USB-C / Lightning port, causing loose connection.',
      service: 'Port Soldering',
      cost: '₹1,500 - ₹2,800',
      tips: [
        'Do not try cleaning port with metal needles.',
        'Requires same-day sub-board socket replacement.'
      ]
    },
    {
      trigger: ['bootloop'],
      verdict: 'Android / iOS System Cache lock',
      confidence: 85,
      cause: 'Operating system configuration files or system board CPU cores are experiencing boot logic failures. Board chip reflow might be needed.',
      service: 'Firmware Recovery / Board CPU',
      cost: '₹2,000 - ₹6,500',
      tips: [
        'Avoid using force reboot sequences multiple times.',
        'Requires logic debugger interface scanner hookup.'
      ]
    }
  ],
  gamingpc: [
    {
      trigger: ['gpu'],
      verdict: 'GPU Memory (VRAM) short circuit',
      confidence: 92,
      cause: 'VRAM chips on graphics card are experiencing solder fractures or high thermal short circuits, causing graphic artifacts.',
      service: 'GPU Solder Reballing',
      cost: '₹5,500 - ₹12,000',
      tips: [
        'Avoid stress benchmarking the PC.',
        'Requires BGA rework station reflow.'
      ]
    },
    {
      trigger: ['thermal'],
      verdict: 'Dried Thermal Compound / Pump lock',
      confidence: 90,
      cause: 'Cpu thermal grease is oxidized and dried, blocking thermal exchange to copper block. Fan settings are outdated.',
      service: 'Liquid repaste & Thermal tuning',
      cost: '₹1,500 - ₹3,500',
      tips: [
        'Check radiator fan speed indicators.',
        'Apply high quality thermal paste loop.'
      ]
    }
  ],
  tablet: [
    {
      trigger: ['glass'],
      verdict: 'Tablet Glass Panel Assembly Fracture',
      confidence: 99,
      cause: 'Physical shock has cracked front glass. iPad display layers require separating vacuum loops.',
      service: 'iPad Glass / Screen Swap',
      cost: '₹4,500 - ₹10,500',
      tips: [
        'Apply tape over cracked glass to prevent cuts.',
        'Avoid screen digitizer grid damage.'
      ]
    }
  ]
};

export function initDiagnosis() {
  const form = document.getElementById('device-diagnosis-form');
  if (!form) return;

  const symptomsList = document.getElementById('symptoms-list');
  const btnRun = document.getElementById('btn-run-diagnosis');
  const emptyState = document.getElementById('diagnosis-empty-state');
  const resultsPanel = document.getElementById('diagnosis-results-panel');

  const diagDeviceRadios = form.querySelectorAll('input[name="diag_device"]');

  // Hidden fields in booking form
  const hDevice = document.getElementById('diag-h-device');
  const hVerdict = document.getElementById('diag-h-verdict');
  const hService = document.getElementById('diag-h-service');
  const hCost = document.getElementById('diag-h-cost');

  // Trigger dynamic symptom lists initially
  renderSymptoms();

  // Watch for device change to update symptom checkboxes
  diagDeviceRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      renderSymptoms();
      // Hide results when changing device type
      if (emptyState && resultsPanel) {
        emptyState.style.display = 'flex';
        resultsPanel.style.classList?.remove('active');
        resultsPanel.style.display = 'none';
      }
    });
  });

  // Checkbox styling handler wrapper
  setupSymptomCards();

  // Action button listener
  btnRun.addEventListener('click', () => {
    const checked = form.querySelectorAll('input[name="symptoms"]:checked');
    if (checked.length === 0) {
      alert('Please check at least one symptom to analyze.');
      return;
    }

    const selectedIds = Array.from(checked).map(cb => cb.value);
    runDiagnosticLogic(selectedIds);
  });

  function renderSymptoms() {
    const dev = form.querySelector('input[name="diag_device"]:checked').value;
    const symptoms = SYMPTOMS_DATA[dev];
    
    symptomsList.innerHTML = '';
    symptoms.forEach(sym => {
      const label = document.createElement('label');
      label.className = 'symptom-card';
      label.innerHTML = `
        <input type="checkbox" name="symptoms" value="${sym.id}">
        <span style="font-family: var(--ff-body); font-size: var(--fs-200); font-weight:var(--fw-medium);">${sym.label}</span>
      `;
      symptomsList.appendChild(label);
    });

    setupSymptomCards();
  }

  function setupSymptomCards() {
    // Sync checklist state changes and highlight card styles natively
    const inputs = symptomsList.querySelectorAll('.symptom-card input');
    inputs.forEach(input => {
      const card = input.closest('.symptom-card');
      if (!card) return;

      // Sync active state initially
      card.classList.toggle('checked', input.checked);

      input.onchange = () => {
        card.classList.toggle('checked', input.checked);
      };
    });
  }

  function runDiagnosticLogic(symptomIds) {
    const dev = form.querySelector('input[name="diag_device"]:checked').value;
    const rules = DIAGNOSIS_RULES[dev] || [];
    
    let match = null;

    // 1. Try to find matched triggers based on selected symptoms
    for (const rule of rules) {
      const allTriggered = rule.trigger.every(t => symptomIds.includes(t));
      if (allTriggered) {
        match = rule;
        break; // Match first matching rule
      }
    }

    // 2. If no rule matched, fallback to first rule or create custom report
    if (!match) {
      if (rules.length > 0) {
        match = rules[0]; // Fallback to first general fault for that device
      } else {
        // Absolute fallback
        match = {
          verdict: 'Complex Hardware Fault',
          confidence: 75,
          cause: 'Multiple conflicting hardware symptoms detected. System requires component voltage testing under microscope loops in our physical laboratory.',
          service: 'Advanced Diagnostic Svc',
          cost: '₹1,500 - ₹3,500',
          tips: ['Avoid using generic power supplies.', 'Unplug battery if device is liquid contaminated.']
        };
      }
    }

    // 3. Render Results panel
    emptyState.style.display = 'none';
    resultsPanel.style.display = 'block';
    resultsPanel.classList.add('active');

    // Update fields
    document.getElementById('res-verdict').textContent = match.verdict;
    document.getElementById('res-confidence-text').textContent = `${match.confidence}% Match Confidence`;
    
    const progressFill = document.getElementById('res-confidence-fill');
    progressFill.style.width = '0%';
    setTimeout(() => {
      progressFill.style.width = `${match.confidence}%`;
    }, 100);

    document.getElementById('res-cause-desc').textContent = match.cause;
    document.getElementById('res-service-rec').textContent = match.service;
    document.getElementById('res-cost-est').textContent = match.cost;

    // Render diagnostic tips
    const tipsList = document.getElementById('res-tips');
    tipsList.innerHTML = '';
    match.tips.forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      tipsList.appendChild(li);
    });

    // Populate hidden booking parameters
    if (hDevice) hDevice.value = dev.toUpperCase();
    if (hVerdict) hVerdict.value = match.verdict;
    if (hService) hService.value = match.service;
    if (hCost) hCost.value = match.cost;

    // Smooth scroll panel to screen center on mobile
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
