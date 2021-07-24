function handleSubmit(event) {
    let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key='
    let key = process.env.API_KEY + '&txt='
    let lang = '&lang=en'

    event.preventDefault()

    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    getData(baseURL, key, lang, formText)
    .then(function (data) {
        console.log(data);
        postData('/add', { 
            score_tag: data.main.score_tag,
            agreement: data.main.agreement,
            subjectivity: data.main.subjectivity,
            confidence: data.main.confidence,
            irony: data.main.irony
        });
        updateUI();
    })

    // check what text was put into the form field
    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

// Async function to get the data from the API
const getData = async (baseURL, key, lang, formText) => {
    const res = await fetch(baseURL + key + formText + lang)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

// POST data
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("Error:", error);
    }
}

const updateUI = async() =>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('results').innerHTML = allData.irony
    }
    catch(error){
        console.log("Error: ", error);
    }
}

export { handleSubmit }
