// INI SCRIPT REVISI PERTAMA
(function () {
  'use strict';
  
  const forms = document.querySelectorAll('.requires-validation');
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxUHCt5aQvqNIvGeQWq4LTTw2Hw18w9YvHTaJ7JpdsxMWnz5iIrQXE9m-RpSeoEbw04/exec';
  const googleMapsReviewURL = 'https://search.google.com/local/writereview?placeid=ChIJPWV3-4VXei4R90A1EfXDmiY&source=g.page.m.nr._&laa=nmx-review-solicitation-recommendation-card';
  
  Array.from(forms).forEach(function (form) {
    const teleponContainer = form.querySelector('#teleponContainer');
    const pilihanSelect = form.querySelector('[name="pilihan"]');
    const teleponInput = form.querySelector('[name="telepon"]');
  
    function toggleTelepon() { 
      const pilihanValue = pilihanSelect.value;
      teleponContainer.style.display = pilihanValue === 'ya' ? 'block' : 'none';
      
      // Update required attribute of teleponInput
      if (pilihanValue === 'ya') {
        teleponInput.setAttribute('required', '');
      } else {
        teleponInput.removeAttribute('required');
      }
    }
  
    // Initial toggle based on default value
    toggleTelepon();
  
    // Add onchange event to call toggleTelepon when the select value changes
    pilihanSelect.addEventListener('change', toggleTelepon);
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
  
      if (form.checkValidity()) {
        // Form is valid, submit to Google Sheet
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => console.log('Success!', response))
          .catch(error => console.error('Error!', error.message));
  
        // Redirect to Google Maps review page
        window.location.href = googleMapsReviewURL;
      }
  
      form.classList.add('was-validated');
    }, false);
  });
})();
