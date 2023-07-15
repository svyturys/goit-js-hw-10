import SlimSelect from 'slim-select';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('#selectElement');
const catInfoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

select.addEventListener('change', onSelect);
getCatBreeds();

// заносимо в Select форму дані про породи котів
function getCatBreeds() {
  loader.style.display = 'block';

  fetchBreeds()
    .then(breeds => {
      select.classList.remove('invisible');
      populateBreedsSelect(breeds);
    })
    .catch(() => {
      select.classList.add('invisible');
      Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

// при виборі породи кота зявляється інфо про кота
function onSelect() {
  const breedId = select.value;

  clearCatInfoContainer();
  loader.style.display = 'block';

  fetchCatByBreed(breedId)
    .then(data => {
      catInfoContainer.insertAdjacentHTML(
        'beforeend',
        renderCatBreed(data[0].breeds, data[0].url)
      );
    })
    .catch(() => {
      Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

// розмітка для Select форми з породами котів
function populateBreedsSelect(breeds) {
  const options = breeds.map(breed => ({
    value: breed.id,
    text: breed.name,
  }));

  new SlimSelect({
    select: '#selectElement',
    data: options,
  });
}

// розмітка на сторінці з інфо про породу кота
function renderCatBreed(breedCat, url) {
  return breedCat
    .map(
      ({ name, description, temperament }) =>
        `<img src='${url}' alt='${name}' width='400'/><div class='box-cat-desc'><h2>${name}</h2><p>${description}</p><div class='cat-temperament'><h3>Temperament:</h3><p>${temperament}</p></div></div>`
    )
    .join('');
}

function clearCatInfoContainer() {
  catInfoContainer.innerHTML = '';
}