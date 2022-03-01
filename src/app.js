const APP_URL = `https://restcountries.com/v3.1/all`;

const renderCountries = document.getElementById('renderCountries');
const fetchCountries = (APP_URL) => {
    try {
        fetch(APP_URL)
        .then(res => res.json())
        .then(data => {
            countryInfo(data)
            console.log(data);
        })
        .catch(e => console.log(e))
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

        const capitalCity = document.createElement('p');
        capitalCity.classList.add('capital-city')

        const languages = document.createElement('p');

        
        // POPULATE ELEMENTS
        
        // adding country name
        countryName.innerHTML = `${data[i].name.common} - ${data[i].cca2}`

        // adding flag and coat of arms images
        flag.src = data[i].flags.png;
        if(data[i].coatOfArms.png ===undefined){
            coatOfArms.classList.add('hide');
        }else{
            coatOfArms.src = data[i].coatOfArms.png
        }

        // adding the capital city
        if(data[i].capital === undefined){
            capitalCity.innerHTML = 'Not an independent country'
        }else{
            capitalCity.innerHTML = `Capital - ${data[i].capital}`
        }
        
        // dding languages
        
        languages.innerHTML = handleLangs(data[i].languages).join('')

        // append to the container div
        imageContainer.appendChild(flag);
        imageContainer.appendChild(coatOfArms);

        // append elements to containing div
        countryContainer.appendChild(countryName);
        countryContainer.appendChild(imageContainer)
        countryContainer.appendChild(capitalCity)
        countryContainer.appendChild(languages)
        // _____________________
        renderCountries.appendChild(countryContainer);
    }
} 

const handleLangs = (langs) => {
    let langArr = [];
    Object.keys(langs).forEach((key) => {
        langArr.push(...langs[key] + ' ');
    })
    // console.log(langs)
    return langArr;
}

window.onload = fetchCountries(APP_URL);