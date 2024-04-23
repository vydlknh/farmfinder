import { parse } from '/modules/index.js'
import { search_by_state } from '/modules/search_functions.js'
import { render, html } from 'https://esm.run/lit-html@1'

let button = document.getElementById('submit')
button.addEventListener('click', search)

// CSV indices
var address_index
var lat_index
var lon_index


// Search the database
function search() {
    // Grab the state and organization from their corresponding elements
    let state = document.getElementById('state').value
    let organization = document.getElementById('organization-type').value

    // Get the proper .csv file depending on the organization type chosen by user
    const file = get_file_by_organization_type(organization)

    // Fetch CSV data
    fetch_csv(file)
    .then(parsedData => {
        // Search the parsed data for entries with matching zipcode
        let results = search_by_state(parsedData, state)

        console.log(results);
        // Render new cards on the DOM
        renderCard(results)
    })
    .catch(error => {
        console.error(error)
    })
}

async function fetch_csv(path) {
    try {
        const response = await fetch(path)
        if(!response.ok) {
            throw new Error('Could not fetch CSV file at ${path}')
        }

        // Wait for text response then parse
        const data = await response.text()
        const parsedData = parse(data)

        return parsedData
    }
    catch(error) {
        console.error('Error parsing CSV at ${path}')
        return null
    }
}

function get_file_by_organization_type(type) {
    switch (type) {
        case 'csa':
            address_index = 249
            lon_index = 7
            lat_index = 6
            return '/data/geocoded/csa_2024_geocoded.csv'
        case 'farmersmarket':
            address_index = 47
            lon_index = 5
            lat_index = 4
            return '/data/geocoded/farmersmarket_2024_geocoded.csv'
        case 'foodhub':
            address_index = 206
            lon_index = 7
            lat_index = 6
            return '/data/geocoded/foodhub_2024_geocoded.csv'
    }
}

function renderCard(listing) {
    var list = document.getElementById("displayListing")
    
    while (list.firstChild) {
        list.removeChild(list.lastChild);
      }

    const renderResult = (result) => `
    <div class="card m-4">
        <div class="card-image">
        <figure class="image is-4by3">
            <img
            src="/images/card-farmers-market.jpg"
            alt="farmers market"
            />
        </figure>
        </div>
        <div class="card-content">
        <div class="media">
            <p class="title is-4">${result[2]}</p>
        </div>
    
        <div class="content">
            ${result[address_index]}
        </div>
        <button class="button is-link is-fullwidth" onclick="show_on_map(${result[lon_index]}, ${result[lat_index]})">Show On Map</button> 
        </div>
    </div>
    `

    for (let index = 0; index < listing.length; index++) {
        const element = listing[index];
        
        var elem = new DOMParser().parseFromString(renderResult(element), 'text/html')
        list.appendChild(elem.firstChild)  
    }

    
}