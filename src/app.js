// Declare url
const APP_URL = `https://restcountries.com/v3.1/all`;

const fetchCountries = (APP_URL) => {
    try {
        fetch(APP_URL)
        .then(res => res.json())
        .then(data => countryInfo(data))
        .catch(e => console.log(e.message))
    } catch (error) {
        console.log(error.message)
    }
}

const countryInfo = data => {
    // loop throu countries
    for(let i = 0; i <= 10; i++){
        const countryName = document.createElement('h2');
        countryName.innerHTML = data[i].name.official

        document.body.appendChild(countryName)
    }
} 

window.onload = fetchCountries(APP_URL);