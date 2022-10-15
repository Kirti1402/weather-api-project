

const apiUrl ='https://api.openweathermap.org/data/2.5/weather?q=';
//delhi&APPID=56093ce99e24e6e10b6afbc28b01d13e
const apiKey = '56093ce99e24e6e10b6afbc28b01d13e';

const inputCity = document.querySelector('#input-city');
const checkBtn = document.querySelector('#check');
const cityName = document.querySelector('#city-name');
const degree = document.querySelector("#degree");
const humiditySel = document.querySelector('#humidity')
const visibilityDis = document.querySelector('#visibility');
const inputCityError = document.querySelector('.error')
const emoji = document.querySelector('.emoji');

console.log("visible"+visibilityDis);


function constructUrl(name){
    console.log(apiUrl+name+'&APPID='+apiKey)
    return apiUrl+name+'&APPID='+apiKey;

}


function weatherApiCall(){
    var pattern  = /([a-z][A-Z]{0})/;
    console.log(pattern.test(inputCity.value) != true);
    console.log(inputCity);
    if(inputCity.value == '' || pattern.test(inputCity.value) != true){
        inputCityError.innerText = 'Please Enter City'
    } 
    else if(pattern.test(inputCity.value) == true){
        inputCityError.innerText = ''
        fetch(constructUrl(inputCity.value))
        .then((response) => response.json())
        .then((data) => {
            if(data.cod != 200){
                var errorMessage = data.message;
                inputCityError.style.color = 'red';
                inputCityError.innerText = errorMessage+'';
            } else{
                dataFetch(data)
            }
            console.log(data)   
        })
    }
}
function errorHandlor(error){
    console.log(error.data);
}

function dataFetch(data){
    //storing a city name
    var city= data.name;
    console.log(city)
    var description = data.weather[0].description
    console.log(description);
    if(description.includes('rain')){
        emoji.innerText = '⛈️'
    } else if(description.includes('cloud')){
        emoji.innerText = '☁️'
    } else if(description.includes('mist')) {
        emoji.innerText = '🌫️'
    }
    else{
        emoji.innerText = '🌞'
    } 

    //storing temprature value
    var temp = data.main.temp;
    temp = Math.ceil(temp/10);

    //storing visibility value
    var visibility = data.visibility;
    visibility = Math.ceil(visibility/1000)
    console.log(visibility);
    var humid = data.main.humidity;
    console.log(humid)
    cityName.innerText= city;
    degree.innerText = temp+'°C'
    humiditySel.innerText = 'Humidity:'+humid+'%'
    visibilityDis.innerText = 'Visibility:'+visibility+'km'

    
}






// inputCity.addEventListener('change',inputcheck)
checkBtn.addEventListener('click',weatherApiCall)