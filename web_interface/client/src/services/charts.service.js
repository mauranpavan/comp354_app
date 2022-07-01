// Services expose methods that make calls to the backend API. One method per backend endpoint.

// Example: This file will have methods to call the endpoints exposed in charts.controller.js. 

// NOTE - WE MAY NOT USE THIS PATTERN IF IT ENDS UP MAKING THINGS MORE COMPLICATED.

export class ChartsService {

    // GET /charts/
    getAllChartsData() {
        fetch("/charts");
    }
}