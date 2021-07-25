
async function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value

    if (!Client.checkForName(formText)) {
        alert("Sorry, invalid URL");
    }
    else {
        await fetch('http://localhost:8080/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify(formText),
        })
        .then( res => {
            document.getElementById('resText').innerHTML = "Text: " + formText;
            document.getElementById('resScore').innerHTML = "Score: " + res.score_tag;
            document.getElementById('resSubjectivity').innerHTML = "Subjectivity: : " + res.subjectivity;
            document.getElementById('resIrony').innerHTML = "Irony: " + res.irony;
        }
        )
    }
}








export { handleSubmit }
