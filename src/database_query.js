/**
 * This class puts together a database query along
 * with multiple useful methods to assist in retrieval
 */

class DatabaseQuery {
    constructor(zip, radius) {
        this.zip = zip;
        this.radius = radius;

        this.csv = require('jquery-csv');
    }

    query() {
        let csv_data = File("data\\csa_2024-41815232.xlsx")
        return $.csv.toObjects(csv_data)
    }
}