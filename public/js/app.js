console.log('javascript is running rigth')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const locationMessage = document.querySelector('#locationMsg')
const forecastMessage = document.querySelector('#forecastMsg')
const forecastImg = document.querySelector('.weather-img')

locationMessage.textContent = ''
forecastMessage.textContent = ''

weatherForm && weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = searchInput.value
    const weatherURL = '/weather?address=' + encodeURIComponent(location)

    fetch(weatherURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationMessage.textContent = data.error
            } else {
                locationMessage.textContent = data.location
                forecastMessage.textContent = data.forecast
                forecastImg.setAttribute('src', data.icon)
            }
        })
    })
})
