// Dynamic Estimator engine module for multi-step configuration

const BRAND_OPTIONS = {
  macbook: ['Apple'],
  laptop: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'Microsoft', 'Other'],
  smartphone: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Other'],
  gamingpc: ['Custom Build', 'ASUS ROG', 'MSI', 'Alienware', 'HP Omen', 'Other'],
  tablet: ['Apple iPad', 'Samsung Galaxy Tab', 'Lenovo Tab', 'Other']
};

const ISSUE_DATA = {
  macbook: [
    { value: 'screen', title: 'Display Screen Repair', basePrice: 12000, time: 'Same-Day' },
    { value: 'battery', title: 'Battery Replacement', basePrice: 5500, time: 'Same-Day' },
    { value: 'spill', title: 'Liquid Damage Cleanup', basePrice: 6500, time: '24-48 Hours' },
    { value: 'board', title: 'Logic Board Micro-Solder', basePrice: 9500, time: '24-48 Hours' },
    { value: 'keyboard', title: 'Keyboard & Trackpad Fix', basePrice: 5000, time: 'Same-Day' },
    { value: 'upgrade', title: 'SSD Storage Upgrade', basePrice: 4000, time: 'Same-Day' }
  ],
  laptop: [
    { value: 'screen', title: 'Broken Screen Swap', basePrice: 6500, time: 'Same-Day' },
    { value: 'battery', title: 'Battery Care Swap', basePrice: 3500, time: 'Same-Day' },
    { value: 'spill', title: 'Spill Liquid Rescue', basePrice: 4500, time: '24-48 Hours' },
    { value: 'board', title: 'Motherboard Chip Solder', basePrice: 5500, time: '24-48 Hours' },
    { value: 'keyboard', title: 'Keyboard Keypad Fix', basePrice: 2500, time: 'Same-Day' },
    { value: 'upgrade', title: 'RAM & SSD Upgrade', basePrice: 3000, time: 'Same-Day' }
  ],
  smartphone: [
    { value: 'screen', title: 'Cracked Glass / OLED Panel', basePrice: 4500, time: 'Same-Day' },
    { value: 'battery', title: 'Battery Degradation Fix', basePrice: 2500, time: 'Same-Day' },
    { value: 'spill', title: 'Liquid Contamination Check', basePrice: 3500, time: '24 Hours' },
    { value: 'board', title: 'Logic Board IC repair', basePrice: 5000, time: '24 Hours' },
    { value: 'port', title: 'Charging USB-C Port Solder', basePrice: 1800, time: 'Same-Day' },
    { value: 'camera', title: 'Camera Lens & Module Swap', basePrice: 3000, time: 'Same-Day' }
  ],
  gamingpc: [
    { value: 'screen', title: 'Monitor Panel Diagnostics', basePrice: 5000, time: 'Same-Day' },
    { value: 'spill', title: 'Coolant Spill Diagnostics', basePrice: 7500, time: '24-48 Hours' },
    { value: 'board', title: 'GPU Board Micro-Solder', basePrice: 8500, time: '24-48 Hours' },
    { value: 'thermal', title: 'Liquid Metal Thermal Repaste', basePrice: 2500, time: 'Same-Day' },
    { value: 'liquid', title: 'Custom Water-Loop Maintenance', basePrice: 6000, time: '24-48 Hours' },
    { value: 'upgrade', title: 'SSD Array / Memory Upgrade', basePrice: 3000, time: 'Same-Day' }
  ],
  tablet: [
    { value: 'screen', title: 'Touch Screen Assembly', basePrice: 5500, time: 'Same-Day' },
    { value: 'battery', title: 'Battery Cell Replacement', basePrice: 3500, time: 'Same-Day' },
    { value: 'spill', title: 'Corrosion Solder Clean', basePrice: 4000, time: '24 Hours' },
    { value: 'board', title: 'Logic Board Micro-Solder', basePrice: 5500, time: '24-48 Hours' },
    { value: 'port', title: 'Charging Socket Solder', basePrice: 2000, time: 'Same-Day' }
  ]
};

export function initEstimator() {
  const form = document.getElementById('smart-estimator-form');
  if (!form) return;

  let currentStep = 1;
  const totalSteps = 5;

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const brandSelect = document.getElementById('est-brand');
  const fulfillmentSelect = document.getElementById('est-fulfillment');
  const addressGroup = document.getElementById('est-address-group');
  const addressInput = document.getElementById('est-address');

  // Trigger dynamic fields setup initially
  updateDynamicBrands();
  updateDynamicIssues();
  recalculatePrice();

  // Custom radio cards styling toggle listeners
  setupRadioCardSelection();

  // Listen to step navigation buttons
  btnNext.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
      } else {
        // Trigger semantic submission
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  // Track changes on inputs for price triggers
  form.addEventListener('change', (e) => {
    if (e.target.name === 'device_type') {
      updateDynamicBrands();
      updateDynamicIssues();
    }
    recalculatePrice();
  });

  // Handle fulfillment field toggle
  fulfillmentSelect.addEventListener('change', () => {
    if (fulfillmentSelect.value === 'drop') {
      addressGroup.style.display = 'none';
      addressInput.removeAttribute('required');
      addressInput.value = '';
    } else {
      addressGroup.style.display = 'block';
      addressInput.setAttribute('required', 'true');
    }
  });

  // Handle direct navigation via tracker nodes
  document.querySelectorAll('.progress-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.getAttribute('data-step'), 10);
      if (targetStep < currentStep) {
        // Can always step backward
        goToStep(targetStep);
      } else if (targetStep > currentStep) {
        // Check validation for steps in between
        let stepCheck = currentStep;
        let pass = true;
        while (stepCheck < targetStep) {
          if (!validateStep(stepCheck)) {
            pass = false;
            break;
          }
          stepCheck++;
        }
        if (pass) {
          goToStep(targetStep);
        }
      }
    });
  });

  function goToStep(step) {
    // Hide all step panels
    document.querySelectorAll('[data-step-panel]').forEach(p => p.classList.remove('active'));
    
    // Show current panel
    const currentPanel = document.querySelector(`[data-step-panel="${step}"]`);
    if (currentPanel) {
      currentPanel.classList.add('active');
    }

    currentStep = step;

    // Update progress steps styling
    document.querySelectorAll('.progress-step').forEach(node => {
      const nodeStep = parseInt(node.getAttribute('data-step'), 10);
      node.classList.remove('active', 'completed');
      if (nodeStep === currentStep) {
        node.classList.add('active');
      } else if (nodeStep < currentStep) {
        node.classList.add('completed');
      }
    });

    // Update progress bar width
    const fillWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
    const progressFill = document.getElementById('progress-bar-fill');
    if (progressFill) progressFill.style.width = `${fillWidth}%`;

    // Button text updates
    if (currentStep === 1) {
      btnPrev.style.visibility = 'hidden';
    } else {
      btnPrev.style.visibility = 'visible';
    }

    if (currentStep === totalSteps) {
      btnNext.textContent = 'Book Repair Now';
    } else {
      btnNext.textContent = 'Next Step';
    }

    // Scroll to top of form panel smoothly
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function validateStep(step) {
    // Clear custom warnings
    const panel = document.querySelector(`[data-step-panel="${step}"]`);
    const alerts = panel.querySelectorAll('.form-step-alert');
    alerts.forEach(a => a.remove());

    if (step === 2) {
      const modelName = document.getElementById('est-model');
      if (!modelName.value.trim()) {
        showStepAlert(panel, 'Please specify your device model name.');
        modelName.focus();
        return false;
      }
    }

    if (step === 4) {
      const checkedIssues = panel.querySelectorAll('input[type="checkbox"]:checked');
      if (checkedIssues.length === 0) {
        showStepAlert(panel, 'Please select at least one repair issue or symptom.');
        return false;
      }
    }

    return true;
  }

  function showStepAlert(panel, msg) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'form-step-alert';
    alertDiv.style.color = 'var(--clr-green-neon)';
    alertDiv.style.fontSize = 'var(--fs-200)';
    alertDiv.style.marginTop = 'var(--space-3)';
    alertDiv.style.fontWeight = 'var(--fw-semibold)';
    alertDiv.textContent = `⚠ ${msg}`;
    panel.appendChild(alertDiv);
  }

  function updateDynamicBrands() {
    const dev = form.device_type.value;
    const brands = BRAND_OPTIONS[dev];
    
    brandSelect.innerHTML = '';
    brands.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b.toLowerCase().replace(/\s+/g, '');
      opt.textContent = b;
      brandSelect.appendChild(opt);
    });
  }

  function updateDynamicIssues() {
    const dev = form.device_type.value;
    const issues = ISSUE_DATA[dev];
    const grid = document.getElementById('issues-list');
    
    grid.innerHTML = '';
    issues.forEach(issue => {
      const label = document.createElement('label');
      label.className = 'selection-card';
      label.innerHTML = `
        <input type="checkbox" name="issues" value="${issue.value}" data-base-price="${issue.basePrice}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span class="selection-card-title">${issue.title}</span>
      `;
      grid.appendChild(label);
    });

    setupRadioCardSelection();
  }

  function setupRadioCardSelection() {
    // Rely on native input change events to toggle card styles and recalculate pricing
    const inputs = document.querySelectorAll('.selection-card input');
    inputs.forEach(input => {
      const card = input.closest('.selection-card');
      if (!card) return;

      // Sync visual state on load
      card.classList.toggle('checked', input.checked);

      input.onchange = () => {
        if (input.type === 'radio') {
          const siblings = input.closest('.selection-grid').querySelectorAll('.selection-card');
          siblings.forEach(sib => sib.classList.remove('checked'));
        }
        card.classList.toggle('checked', input.checked);
        recalculatePrice();
      };
    });
  }

  function recalculatePrice() {
    const dev = form.device_type.value;
    const condition = form.condition.value;
    const priority = form.priority.value;
    
    // Accumulate base prices from issues selection
    let baseSum = 0;
    const selectedIssuesList = [];
    
    document.querySelectorAll('#issues-list input[type="checkbox"]:checked').forEach(cb => {
      baseSum += parseInt(cb.getAttribute('data-base-price'), 10) || 0;
      // Get title
      const cardTitle = cb.closest('.selection-card').querySelector('.selection-card-title').textContent;
      selectedIssuesList.push(cardTitle);
    });

    // Condition multiplier
    let conditionMult = 1.0;
    if (condition === 'damaged') conditionMult = 1.1;
    if (condition === 'dead') conditionMult = 1.25;

    // Priority charge
    let priorityCost = 0;
    let duration = '2-3 Business Days';
    if (priority === 'express') {
      priorityCost = 1499;
      duration = 'Same-Day Tech Express';
    } else if (priority === 'rescue') {
      priorityCost = 2999;
      duration = '24-hour Board Rescue';
    } else {
      // Find typical timeframe from selected issues
      const activeIssues = ISSUE_DATA[dev].filter(i => {
        const input = document.querySelector(`#issues-list input[value="${i.value}"]`);
        return input && input.checked;
      });
      if (activeIssues.length > 0) {
        // Use max time
        const containsBoardOrSpill = activeIssues.some(i => i.value === 'board' || i.value === 'spill');
        duration = containsBoardOrSpill ? '24-48 Hours' : 'Same-Day Service';
      }
    }

    const calculatedBase = baseSum * conditionMult;
    const minVal = Math.round(calculatedBase * 0.95 + priorityCost);
    const maxVal = Math.round(calculatedBase * 1.05 + priorityCost);

    // Format display
    const priceDisplay = document.getElementById('sum-price-range');
    const timeDisplay = document.getElementById('sum-timeframe');
    
    if (baseSum === 0) {
      priceDisplay.textContent = '₹0';
      timeDisplay.textContent = 'No Issues Selected';
    } else {
      priceDisplay.textContent = `₹${minVal.toLocaleString()} - ₹${maxVal.toLocaleString()}`;
      timeDisplay.textContent = duration;
    }

    // Sync sidebar summaries
    const sumDevice = document.getElementById('sum-device-type');
    const sumBrand = document.getElementById('sum-brand');
    const sumCondition = document.getElementById('sum-condition');
    const sumIssues = document.getElementById('sum-issues');

    if (sumDevice) sumDevice.textContent = form.device_type.value.toUpperCase();
    if (sumBrand) {
      const activeOpt = brandSelect.options[brandSelect.selectedIndex];
      sumBrand.textContent = activeOpt ? activeOpt.text : '';
    }
    if (sumCondition) sumCondition.textContent = condition.charAt(0).toUpperCase() + condition.slice(1);
    if (sumIssues) {
      sumIssues.textContent = selectedIssuesList.length > 0 ? selectedIssuesList.join(', ') : 'None Selected';
    }
  }
}
