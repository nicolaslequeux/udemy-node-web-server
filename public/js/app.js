console.log("Client side JS file is loaded!")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading..."
    messageOne.textContent = ""
    

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ""
            } else {
                console.log(data.location)
                console.log("Temperature is " + data.forecast.temperature + "°C")
                messageOne.textContent = data.location
                messageTwo.textContent = "Temperature is " + data.forecast.temperature + "°C"
            }
        })
    })

})
