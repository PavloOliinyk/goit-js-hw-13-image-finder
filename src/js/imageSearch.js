import fetchImage from './apiService';

let page = null;

console.log(fetchImage('astra', 2).then(data => console.log(data.hits)));
