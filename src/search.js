import { parse } from '/modules/index.js'
import { search_by_county, search_by_state, search_by_zip } from '/modules/search_functions.js'
import {html, render} from 'https://esm.run/lit-html@1';

let button = document.getElementById('submit')
button.addEventListener('click', search)


function search() {

    let zipcode = document.getElementById('zipcode').value
    let state = document.getElementById('state').value
    
    fetch_csv('/data/geocoded/csa_2024_geocoded.csv')
    .then(parsedData => {
        // Search the parsed data for entries with matching zipcode
        let results = search_by_zip(parsedData, zipcode)
        //let results = search_by_state(parsedData, 'TX')
        // let results = search_by_county(parsedData, 'Putnam')
        console.log(results)
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

function renderCard(listing) {
    let element = listing[0]
    const renderResult = (result) => html`
        <div class="card">
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
                ${result[3]}
            </div>
            </div>
        </div>
    `;

    render(renderResult(element), document.getElementById("displayListing"));

    const renderMap = (result) => html`
        <gmp-map style="height: 95vh;" center="${result[7]},${result[6]}" zoom="14" map-id="DEMO_MAP_ID">
            <gmp-advanced-marker position="${result[7]},${result[6]}" title="Listing Location"></gmp-advanced-marker>
        </gmp-map>
    `

    render(renderMap(element), document.getElementById("displayMap"));
}