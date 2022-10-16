import axios from 'axios';

export function fetchUrl(searchQuery, page, perPage) {
const API_KEY = '29563200-0a1ddf81e988f89f2d7965560';
const URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
return axios.get(URL)
    .then(resp => {
        return resp.data
    })
}