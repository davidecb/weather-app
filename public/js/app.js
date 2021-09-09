console.log('javascript is running rigth')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const locationMessage = document.querySelector('#locationMsg')
const forecastMessage = document.querySelector('#forecastMsg')

locationMessage.textContent = ''
forecastMessage.textContent = ''

weatherForm && weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = searchInput.value
    const weatherURL = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)

    console.log(weatherURL)

    fetch(weatherURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationMessage.textContent = data.error
                console.log(data.error)
            } else {
                locationMessage.textContent = data.location
                forecastMessage.textContent = data.forecast
                console.log(data)
            }
        })
    })
})
