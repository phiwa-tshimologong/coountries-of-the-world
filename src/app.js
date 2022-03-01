const APP_URL = `https://restcountries.com/v3.1/all`;

const renderCountries = document.getElementById('renderCountries');
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
    for(let i = 0; i <= data.length; i++){
        // create render elements
        const countryContainer = document.createElement('div');
        countryContainer.classList.add('country-container');
        
        const countryName = document.createElement('h2');
        
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('flag-and-coat');
        const flag = document.createElement('img');
        const coatOfArms = document.createElement('img');
        
        // populate elements 
        countryName.innerHTML = `${data[i].name.official} - ${data[i].cca2}`
        flag.src = data[i].flags.png;
        if(data[i].coatOfArms.png ===undefined){
            coatOfArms.classList.add('hide');
        }else{
            coatOfArms.src = data[i].coatOfArms.png
        }

        // append to the container div
        imageContainer.appendChild(flag);
        imageContainer.appendChild(coatOfArms);

        countryContainer.appendChild(countryName);
        countryContainer.appendChild(imageContainer)
        // _____________________
        renderCountries.appendChild(countryContainer);
    }
} 

window.onload = fetchCountries(APP_URL);