import { parse } from '/modules/index.js'
import { search_by_county, search_by_state, search_by_zip } from '/modules/search_functions.js'

let button = document.getElementById('submit')
button.addEventListener('click', search)


function search() {

    let zipcode = document.getElementById('zipcode').value

    
    fetch_csv('/data/geocoded/csa_2024_geocoded.csv')
    .then(parsedData => {
        // Search the parsed data for entries with matching zipcodes
        //let results = search_by_zip(parsedData, zipcode)
        //let results = search_by_state(parsedData, 'TX')
        let results = search_by_county(parsedData, 'Putnam')
        console.log(results)
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