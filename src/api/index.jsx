import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    let changeableUrl = url

    if(country){
        changeableUrl = `${url}/countries/${country}`
        console.log(changeableUrl, "changeableUrl")
    }
    try {
        // console.log("i got here")
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl)
       
        return { confirmed, recovered, deaths, lastUpdate }
    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async () =>{
    try {
        const { data } = await axios.get(`${url}/daily`)

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))
        // console.log(modifiedData, "modifiedData")
        return modifiedData;
    } catch (error) {
        return error 
    }
}

export const fetchCountries = async () => {
    try {
        const response = await axios.get(`${url}/countries`)
        console.log(response, "response")
        return response.data.countries.map((country) => country.name)
    } catch (error) {
        console.log(error, "error")
    }
}