// BlousePoiseJet Interactive Scripts
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

  // 4. Interactive Blouse Drape & Silk Momme Tailoring Calculator
  const silkWeaveSelect = document.getElementById('silk-weave');
  const mommeRange = document.getElementById('momme-range');
  const mommeValDisplay = document.getElementById('momme-val');
  const drapeCoeffOutput = document.getElementById('calc-drape-coeff');
  const seamRecOutput = document.getElementById('calc-seam');
  const needleSizeOutput = document.getElementById('calc-needle');
  const drapeProfileOutput = document.getElementById('calc-profile');

  const weaveData = {
    'crepe-de-chine': {
      coeffMultiplier: 0.38,
      seam: '0.6 cm French Seam with 120-weight Silk Thread',
      needle: 'Microtex Sharp Size 65/9',
      profile: 'Fluid Columnar Drop with Subtle Textured Pebbled Bounce'
    },
    'georgette-chiffon': {
      coeffMultiplier: 0.22,
      seam: '0.4 cm Ultra-Narrow French Rolled Seam',
      needle: 'Microtex Sharp Size 60/8',
      profile: 'Weightless Gossamer Wave and Kinetic Anatomical Ripple'
    },
    'silk-charmeuse': {
      coeffMultiplier: 0.45,
      seam: '0.8 cm Bias French Seam with Stabilized Edge',
      needle: 'Microtex Sharp Size 70/10',
      profile: 'Lustrous Liquid Contour with High Surface Reflectance'
    },
    'silk-organza': {
      coeffMultiplier: 0.72,
      seam: '0.5 cm Enclosed Self-Stitched Flat Seam',
      needle: 'Microtex Sharp Size 65/9',
      profile: 'Crisp Architectural Sculptural Volume and Stand'
    },
    'habotai-lining': {
      coeffMultiplier: 0.30,
      seam: '0.5 cm Plain Seam with Pinked and Pressed Edges',
      needle: 'Microtex Sharp Size 65/9',
      profile: 'Featherweight Breathable Second-Skin Silken Glide'
    }
  };

  function updateCalculator() {
    if (!silkWeaveSelect || !mommeRange) return;
    const mommeWeight = parseInt(mommeRange.value, 10);
    mommeValDisplay.textContent = `${mommeWeight} mm`;

    const selectedWeave = silkWeaveSelect.value;
    const info = weaveData[selectedWeave] || weaveData['crepe-de-chine'];

    const drapeCoeff = (info.coeffMultiplier * (mommeWeight / 16)).toFixed(2);

    drapeCoeffOutput.textContent = `${drapeCoeff} Drape Modulus`;
    seamRecOutput.textContent = info.seam;
    needleSizeOutput.textContent = info.needle;
    drapeProfileOutput.textContent = info.profile;
  }

  if (silkWeaveSelect && mommeRange) {
    silkWeaveSelect.addEventListener('change', updateCalculator);
    mommeRange.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 5. Fitting Consultation Toast Feedback
  const fitForm = document.getElementById('consultation-form');
  if (fitForm) {
    fitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('form-feedback');
      if (feedback) {
        feedback.style.display = 'block';
        feedback.className = 'alert alert-success';
        feedback.innerHTML = '<strong>Consultation Request Received:</strong> Our bespoke salon concierge will contact you within two hours to confirm your private Mercer Street fitting appointment.';
        fitForm.reset();
      }
    });
  }
});
