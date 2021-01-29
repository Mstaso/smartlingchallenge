const fetch = require("node-fetch");
const credentials = require('./resources/credentials.json');

function authentication() {
    fetch('https://api.smartling.com/auth-api/v2/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             'accepts': 'application/json',
          },
          body: JSON.stringify({
              "userIdentifier": credentials.userIdentifier,
              "userSecret": credentials.userSecret
          })
    }) 
    .then(response => response.json())
    .then(response => {
        console.log(response)
        let token = response.data
      })
}

authentication()

