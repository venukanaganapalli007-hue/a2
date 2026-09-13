// ScalarReadIvy Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Interactive Cognitive Reading Rate & Conceptual Density Calculator
  const textGenreSelect = document.getElementById('text-genre');
  const densityRange = document.getElementById('density-range');
  const densityValDisplay = document.getElementById('density-val');
  const wpmOutput = document.getElementById('calc-wpm');
  const fixationOutput = document.getElementById('calc-fixation');
  const regressionOutput = document.getElementById('calc-regression');
  const strategyOutput = document.getElementById('calc-strategy');

  const genreData = {
    'mathematical-proofs': {
      baseWPM: 140,
      fixation: '380 - 450 ms per symbolic cluster',
      regression: '28% - 35% saccadic backward verify',
      strategy: 'Non-linear recursive verification; diagrammatic mental scratchpad mapping'
    },
    'philosophical-treatises': {
      baseWPM: 210,
      fixation: '260 - 310 ms per proposition phrase',
      regression: '18% - 22% syllogism continuity check',
      strategy: 'Hierarchical dialectic tracking; active marginalia premise tagging'
    },
    'peer-reviewed-science': {
      baseWPM: 280,
      fixation: '220 - 260 ms per syntactic unit',
      regression: '12% - 16% quantitative cross-check',
      strategy: 'Structural triage; methodology evaluation; statistical confidence parsing'
    },
    'jurisprudence-case-law': {
      baseWPM: 240,
      fixation: '240 - 280 ms per statutory clause',
      regression: '15% - 20% precedent verification',
      strategy: 'Doctrinal issue spotting; holding extraction; multi-tier marginal analysis'
    },
    'classical-literature': {
      baseWPM: 380,
      fixation: '190 - 220 ms rhythmic gaze stride',
      regression: '5% - 8% aesthetic prosody glance',
      strategy: 'Sensory sub-vocal modulation; thematic immersion; narrative arc tracking'
    }
  };

  function updateCalculator() {
    if (!textGenreSelect || !densityRange) return;
    const densityLevel = parseInt(densityRange.value, 10);
    densityValDisplay.textContent = `Tier ${densityLevel} Index`;

    const selectedGenre = textGenreSelect.value;
    const info = genreData[selectedGenre] || genreData['peer-reviewed-science'];

    // Adjust WPM based on density tier (1-5)
    const factor = 1.0 - (densityLevel - 3) * 0.12;
    const adjustedWPM = Math.round(info.baseWPM * factor);

    wpmOutput.textContent = `${adjustedWPM} Words Per Minute`;
    fixationOutput.textContent = info.fixation;
    regressionOutput.textContent = info.regression;
    strategyOutput.textContent = info.strategy;
  }

  if (textGenreSelect && densityRange) {
    textGenreSelect.addEventListener('change', updateCalculator);
    densityRange.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 5. Seminar Registration Toast Feedback
  const semForm = document.getElementById('enrollment-form');
  if (semForm) {
    semForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('form-feedback');
      if (feedback) {
        feedback.style.display = 'block';
        feedback.className = 'alert alert-success';
        feedback.innerHTML = '<strong>Diagnostic Consultation Confirmed:</strong> Our academic director will review your reading diagnostic profile and contact you within two hours.';
        semForm.reset();
      }
    });
  }
});
