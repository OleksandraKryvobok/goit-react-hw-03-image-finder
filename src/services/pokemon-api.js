const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '32998540-3a435d540a10188c3329fbaf2';
const perPage = 12;

function fetchGallery(searchValue, page) {
    return fetch(`${BASE_URL}/?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
        .then(response => response.json())
};

export default fetchGallery;

