document.addEventListener("DOMContentLoaded", function() {
  // Patikrinkite, ar vartotojas yra prisijungęs
  if (localStorage.getItem('isLoggedIn') === 'true') {
      document.getElementById('logoutLink').addEventListener('click', function() {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('username');
          window.location = 'index.html';
      });
  } else {
      document.getElementById('logoutLink').style.display = 'none';
  }

  // Prisijungimo forma
  if (document.getElementById('loginForm')) {
      document.getElementById('loginForm').addEventListener('submit', function(e) {
          e.preventDefault();
          const username = e.target.username.value;
          const password = e.target.password.value;
          
          // Placeholder vartotojo patikrinimas, realiame projekte naudokite serverio patikrą.
          if (username === 'admin' && password === 'admin') {
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('username', username);
              window.location = 'index.html';
          } else {
              alert('Neteisingas vartotojo vardas arba slaptažodis');
          }
      });
  }

  // Registracijos forma
  if (document.getElementById('registerForm')) {
      document.getElementById('registerForm').addEventListener('submit', function(e) {
          e.preventDefault();
          const username = e.target.username.value;
          const password = e.target.password.value;
          const email = e.target.email.value;

          // Čia galite įrašyti vartotojo informaciją į serverį ar localStorage.
          alert('Sėkmingai užsiregistravote, dabar galite prisijungti.');
          window.location = 'login.html';
      });
  }

  // Skelbimo įkėlimo forma
  if (document.getElementById('uploadForm')) {
      document.getElementById('uploadForm').addEventListener('submit', function(e) {
          e.preventDefault();

          const title = e.target.title.value;
          const description = e.target.description.value;
          const images = e.target.image.files;

          let ads = JSON.parse(localStorage.getItem('ads')) || [];
          let newAd = {
              title: title,
              description: description,
              images: []
          };

          for (let i = 0; i < images.length; i++) {
              let reader = new FileReader();
              reader.onload = function(event) {
                  newAd.images.push(event.target.result);
                  if (newAd.images.length === images.length) {
                      ads.push(newAd);
                      localStorage.setItem('ads', JSON.stringify(ads));
                      alert('Skelbimas sėkmingai įkeltas!');
                      window.location = 'index.html';
                  }
              };
              reader.readAsDataURL(images[i]);
          }
      });
  }

  // Rodyti skelbimus pagrindiniame puslapyje
  function displayAds(filter = "") {
      let ads = JSON.parse(localStorage.getItem('ads')) || [];
      const adsContainer = document.getElementById('adsContainer');
      adsContainer.innerHTML = '';

      ads.forEach(ad => {
          if (ad.title.toLowerCase().includes(filter.toLowerCase())) {
              let adElement = document.createElement('div');
              adElement.classList.add('card', 'mb-3', 'col-md-4');
              adElement.innerHTML = `
                  <div class="card-body">
                      <h3 class="card-title">${ad.title}</h3>
                      <p class="card-text">${ad.description}</p>
                  </div>
              `;
              ad.images.forEach(image => {
                  let imgElement = document.createElement('img');
                  imgElement.src = image;
                  imgElement.alt = ad.title;
                  imgElement.classList.add('card-img-top');
                  adElement.insertBefore(imgElement, adElement.firstChild);
              });
              adsContainer.appendChild(adElement);
          }
      });
  }

  // Pritraukite paieškos įvesties lauką
  if (document.getElementById('searchInput')) {
      document.getElementById('searchInput').addEventListener('input', function() {
          displayAds(this.value);
      });
  }

  // Pradžioje rodyti visus skelbimus
  displayAds();
});
