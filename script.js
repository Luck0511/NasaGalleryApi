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






/*
    jsonFile.collection.items.forEach(element => {
        //console.log("i've made it here! "+element);
        element.links.forEach(link => {
            //console.log("i've made it here! "+link);
            if(link.render=="image") {
                //console.log("i've made it here! inside the link");
                const cardElement = document.createElement('div');
                cardElement.setAttribute('class', 'card');
                const cardIMG = document.createElement('img');
                const cardTXT = document.createElement('h2');

                cardIMG.src = link.href;
                cardIMG.setAttribute('alt', 'card-img');
                cardTXT.textContent = link.rel;
                console.log(cardIMG);
                console.log(cardTXT);

                cardElement.appendChild(cardIMG);
                cardElement.appendChild(cardTXT);
            }
        })
    })
*/