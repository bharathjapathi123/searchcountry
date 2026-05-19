let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");
spinnerEl.classList.remove("d-none");


function createAndAppendCountry(eachObject) {
    let {
        flag,
        name,
        population
    } = eachObject
    let countryCardEl = document.createElement("div");
    countryCardEl.classList.add("m-1", "col-md-5", "col-12");
    countryCardEl.classList.add("row");
    countryCardEl.classList.add("country-card");
    resultCountriesEl.appendChild(countryCardEl);
    let imageEl = document.createElement("img");
    imageEl.classList.add("country-flag");
    imageEl.src = flag;
    countryCardEl.appendChild(imageEl);

    let countryDetailsEl = document.createElement("div");

    countryDetailsEl.classList.add("ml-4");

    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = name;
    countryNameEl.classList.add("country-name");
    countryDetailsEl.appendChild(countryNameEl);


    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = population;
    countryDetailsEl.appendChild(countryPopulationEl);

    countryCardEl.appendChild(countryDetailsEl);
}


let option = {
    method: "GET"
}

let data_objects = null;

let url = "https://apis.ccbp.in/countries-data";
fetch(url, option)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        data_objects = data
        for (let eachObject of data_objects) {

            spinnerEl.classList.add("d-none");
            createAndAppendCountry(eachObject)
            // countryCardEl.appendChild(countryPopulationEl);

        }
    })

function displayCountries(event) {

    let userInput = searchInputEl.value;
    if (typeof(userInput) === typeof("string")) {
        for (let country of data_objects) {
            let countryName = country.name;
            if (countryName.toLowerCase().includes(userInput.toLowerCase())) {
                resultCountriesEl.textContent = "";
                createAndAppendCountry(country)

            }
        }
    }
}




searchInputEl.addEventListener("keydown", displayCountries);