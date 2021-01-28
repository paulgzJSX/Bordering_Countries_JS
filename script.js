const selectCountry = document.querySelector('select')
const container = document.querySelector('.container')
const countriesNumber = document.querySelector('.countries-number')

let countries = []
const countriesURL = 'https://date.nager.at/api/v2/availablecountries/'
const bordersURL = 'https://date.nager.at/api/v2/countryinfo?countryCode='


async function getCountries() {
    countries = await (await fetch(countriesURL)).json()

    console.log(countries);

    countries.sort((a, b) => a.value.localeCompare(b.value)).forEach(country => {
        let option = document.createElement('option')
        option.value = country.key
        option.innerHTML = country.value
        selectCountry.appendChild(option)
    })
}

getCountries()

selectCountry.addEventListener('change', (e) => {
    getBorderingCountries(e.target.value)
})

container.addEventListener('click', (e) => {

    if (e.target.matches('.container') || e.target.matches('.card')) return

    const selectedCountry = e.target.dataset.country

    getBorderingCountries(selectedCountry)
    selectCountry.value = selectedCountry

})


async function getBorderingCountries(country) {
    const borderingCountries = await (await fetch(`${bordersURL}${country}`)).json()
    const borders = borderingCountries.borders

    container.innerHTML = ''

    if (borders.length) {
        borders.map(border => {
                let div = document.createElement('div')
                div.classList.add('card')
                div.innerHTML = `
                    <img data-country='${border.countryCode}' class='country-image' src="/images/flags/${border.countryCode.toLowerCase()}.svg" alt="">
                    <p data-country='${border.countryCode}'>${border.commonName}</p>
                `
                container.appendChild(div) 
            })     
    } else {
        container.innerText = 'The country does not have land borders with other countries'
    }
}


