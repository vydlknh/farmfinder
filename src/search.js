import { parse } from '/modules/index.js'

let button = document.getElementById('submit');
button.addEventListener('click', search);


function search() {

    let zipcode = document.getElementById('zipcode').value;
    let product = document.getElementById('product').value;

    fetch_csv('/data/farmersmarket_2024.csv')

};

async function fetch_csv(path) {
    try {
        const response = await fetch(path);
        if(!response.ok) {
            throw new Error('Could not fetch CSV file at ${path}')
        }

        // Wait for text response then parse
        const data = await response.text()
        const parsedData = parse(data);

        console.log(parsedData); 
    }
    catch(error) {
        console.error('Error parsing CSV at ${path}');
    }
};