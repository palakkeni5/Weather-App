import axios from "axios";
// get api call

 export const callWeatherAPIforCurrentWeather = async (lat,long) => {
    let API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    return new Promise( (resolve, reject) =>{
        axios({
            method : "GET",
            url : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`
        }).then((res) => {
            //console.log(res)
            resolve(res)
        }).catch((error) => {
            console.log(error)
            reject(error)    
        })
    })
}

export const callWeatherAPIforWeatherForecast = async (lat,long) => {
    let API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    return new Promise( (resolve, reject) =>{
        axios({
            method : "GET",
            url : `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`
        }).then((res) => {
            //console.log(res)
            resolve(res)
        }).catch((error) => {
            console.log(error)
            reject(error)    
        })
    })
}


// get location by browser

export const getCurrentLocation = () => {
    
    let lat ;
    let long ;  

    return new Promise((resolve , reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;  
                // console.log("lat" + lat)
                // console.log("long" + long)          
                resolve({lat,long})

            } , (error)=>{
                //if error in gettting location, get New York Location 
                lat = 40.6949
                long = -73.9852
                resolve({lat,long})
            }, {timeout:10000})

    })
      
    
}
