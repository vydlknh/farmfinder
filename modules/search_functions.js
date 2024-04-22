export function search_by_zip(data, zipcode) {
    var results = []
    var col_idx = undefined

    // Find zipcode column
    for (let index = 0; index < data.length; index++) {
        if(data[0][index] == 'postcode') {
            col_idx = index
            break
        }
    }

    // Guard clause
    if(col_idx == undefined) { 
        console.error('No zipcode column found in file');
        return null 
    }

    // Loop through the data and find all instances with the same zipcode
    data.forEach(element => {
        if(element[col_idx] == zipcode) {
            results.push(element)
        }
    })

    if(results.length == 0) {
        alert('No results found in ' + zipcode + ', please try a new zipcode')
        return null
    }
    else {
        return results
    }
}

export function search_by_state(data, state) {
    var results = []
    var col_idx = undefined

    // Find state_code column
    for (let index = 0; index < data.length; index++) {
        if(data[0][index] == 'state_code') {
            col_idx = index
            break
        }
    }

    // Guard clause
    if(col_idx == undefined) { 
        console.error('No state_code column found in file');
        return null 
    }

    // Loop through the data and find all instances with the same state_code
    data.forEach(element => {
        if(element[col_idx] == state) {
            results.push(element)
        }
    })

    if(results.length == 0) {
        alert('No results found in ' + state + ', please try a new state')
        return null
    }
    else {
        return results
    }
}

export function search_by_county(data, county) {
    var results = []
    var col_idx = undefined

    // Find state_code column
    for (let index = 0; index < data.length; index++) {
        if(data[0][index] == 'county') {
            col_idx = index
            break
        }
    }

    // Guard clause
    if(col_idx == undefined) { 
        console.error('No county column found in file');
        return null 
    }

    // Loop through the data and find all instances with the same state_code
    data.forEach(element => {
        if(element[col_idx] == county + ' County') {
            results.push(element)
        }
    })

    if(results.length == 0) {
        alert('No results found in ' + county + ', please try a new county')
        return null
    }
    else {
        return results
    }
}