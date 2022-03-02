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
        const flagImg = document.createElement('img');
        const coatOfArmsImg = document.createElement('img');

        const capitalCity = document.createElement('p');
        capitalCity.classList.add('capital-city')

        const languages = document.createElement('p');
        languages.classList.add('languages');

        
        // POPULATE ELEMENTS
        
        // adding country name
        countryName.innerHTML = `${data[i].name.common} - ${data[i].cca2}`

        // adding flag and coat of arms images
        flagImg.src = data[i].flags.png;
  
        if(data[i].coatOfArms.png === undefined){
            coatOfArmsImg.classList.add('hide');
        }else{
            coatOfArmsImg.src = data[i].coatOfArms.png
        }
        

        capitalCity.innerHTML = handleCapitalCity(data[i].capital);
        
        // dding languages
        
        languages.innerHTML = handleLangs(data[i].languages);

        // append to the container div
        imageContainer.appendChild(flagImg);
        imageContainer.appendChild(coatOfArmsImg);

        // append elements to containing div
        countryContainer.appendChild(countryName);
        countryContainer.appendChild(imageContainer)
        countryContainer.appendChild(capitalCity)
        countryContainer.appendChild(languages)
        // _____________________
        renderCountries.appendChild(countryContainer);
    }
} 


const handleCapitalCity = (city) =>{
    // adding the capital city
    if(city === undefined){
        return'Not an independent country'
    }else{
        return `Capital - ${city}`
    }
}

const handleLangs = (langs) => {
    let langArr = [];
    if(langs === undefined){
        return 'No official language';
    }else{

        Object.keys(langs).forEach((key) => {
            langArr.push(...langs[key] + ' ');
        })
    }
    // console.log(langs)
    return langArr.join('');
}

window.onload = fetchCountries(APP_URL);