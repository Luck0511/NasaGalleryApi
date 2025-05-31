//build query string based on search parameter put
function buildRequest(parameter) {
    let basStr = "https://images-api.nasa.gov/search?q="
    return basStr.concat(parameter);
}

//get form parameter for search purpose
const inForm = document.getElementById('parameterForm');

const secElement = document.getElementById('imageSec');

inForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(document.getElementById('parameterForm'));

    //debug
    console.log(document.getElementById('parameterForm'));
    console.log(formData);

    let formParameter = formData.get('parameter');
    if (formParameter==="") {
        formParameter = formData.get('parametersList');
    }

    //debug
    console.log(formParameter);
    console.log(buildRequest(formParameter));
    //build the API call
    const request = buildRequest(formParameter)
    const APIResult = fetch(request);
    console.log(APIResult);
    //execute search and display
    APIResult
        .then((response) => {
            response.json()
                .then(jsonFile =>
                    jsonFile.collection.items.forEach(element => {
                        const cardElement = document.createElement('div');
                        cardElement.setAttribute('class', 'card');
                    element.links.forEach(link => {
                        if(link.render==="image" && link.rel==="preview") {
                            const cardIMG = document.createElement('img');
                            cardIMG.src = link.href;
                            cardIMG.setAttribute('alt', 'card-img');

                            secElement.appendChild(cardElement);
                            cardElement.appendChild(cardIMG);
                        }
                    })
                    element.data.forEach(element => {
                        const cardTXT = document.createElement('p');
                        cardTXT.textContent = element.title;
                        cardElement.appendChild(cardTXT);
                    })
                })
            )
        }).catch((error) => {
        console.log(error);
    });
});