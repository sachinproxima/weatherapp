const tempr=document.querySelector(".tempr")
const currLocation=document.querySelector(".cityName")
const nameofday=document.querySelector(".detailsofdays")
const weathertype=document.querySelector(".cloud")
const cityName=document.querySelector(".cityName")
const currentdate=document.querySelector(".detailsofdays")
const clouds=document.querySelector(".cloud")
const humidity=document.querySelector("#humidity")
const pressure=document.querySelector("#pressure")
const winds=document.querySelector("#wind")
const maxtempr=document.querySelector("#maxtempr")
const mintempr=document.querySelector("#mintempr")
const search=document.querySelector(".search_icon")
const searchvalue=document.querySelector(".search_box")

// to get the actual country name
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
  };



  let city = "kathmandu";
  search.addEventListener("click",function(e){

   


const cityName=searchvalue.value



weatherData()
city=cityName

  

  })
  searchvalue.addEventListener("keydown",function(e){

   
if(e.key=="Enter"){

    const cityName=searchvalue.value
    
   
   
    weatherData()
    city=cityName
    
}
    
      })










const weatherData = async () => {

const weatherApi=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=85055e7fae321992f6e421bd11c63806`;

try{

    const res = await fetch(weatherApi);
    const data = await res.json();
    console.log(data);


   const { main, name, weather, wind, sys, dt } = data;



    let kelvinValue = `${main.temp.toFixed()}`; 
    let celsiusValue = (kelvinValue - 273.15).toFixed();



tempr.innerHTML=`${celsiusValue}&#176c`
    


cityName.innerHTML=`${name}, ${getCountryName(sys.country)}`



const timestampInMilliseconds = dt * 1000;
// Create a new Date object using the timestamp
const date = new Date(timestampInMilliseconds);

// Get the current time
const currentTime = date.toLocaleTimeString();

// Get the day of the week (0 for Sunday, 1 for Monday, etc.)
const dayOfWeek = date.getDay();


// Array to map the day of the week to its name
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get the name of the day
const dayName = daysOfWeek[dayOfWeek];

currentdate.innerHTML=`${dayName},${currentTime}`;

clouds.innerHTML=weather[0].main



humidity.textContent=`Humidity:${main.humidity}`

pressure.textContent=`Pressure:${main.pressure}`


winds.textContent=`WindSpeed:${wind.speed}`

maxtempr.textContent=`MinTempr:${main.temp_min}`
mintempr.textContent=`MaxTempr:${main.temp_max}`

}

catch(error){

console.log(error)
}

}

document.body.addEventListener("load", weatherData());
