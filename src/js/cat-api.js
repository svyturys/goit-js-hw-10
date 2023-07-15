const API =
    'live_0rw8fndXVjtTF1XSl5unw68nbDYmlWS3y9AyCESUrh9RP4vMhmW5duT0GqgDRKRw';

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  const params = new URLSearchParams({
    api_key: API,
  });

  return fetch(`${BASE_URL}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}

function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
  const params = new URLSearchParams({
    api_key: API,
    breed_ids: breedId,
  });

  return fetch(`${BASE_URL}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}

export { fetchBreeds, fetchCatByBreed };
