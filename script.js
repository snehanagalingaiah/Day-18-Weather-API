let rest_url="https://restcountries.com/v3.1/all"; // url to feth countries from rest api

var container = document.getElementById("data");
let result;
let jsonobj;
fetchData();


async function fetchData(){
     result = await fetch(rest_url);
     jsonobj = await result.json(); 
   
//cardElements is array of dom tree elements. each element(dom tree) represents a card.
var cardElements = jsonobj.map(function(country) {
        var card = document.createElement("div");
       card.className = "card";

       var cardHeader = document.createElement("h5");
       cardHeader.className = "card-header";
       cardHeader.textContent = country.name.official;       
   
       var cardBody = document.createElement("div");
       cardBody.className = "card-body";
   
       var flag = document.createElement("img");
       flag.src=`${country.flags.png}`;
   
       var content1= document.createElement("p");
       content1.className="card-text"
       content1.textContent=`Capital: ${country.capital}`;
       var content2= document.createElement("p");
       content2.className="card-text"
       content2.textContent=`Region: ${country.region}`;
       var content3= document.createElement("p");
       content3.className="card-text"
       content3.textContent= `Country Code: ${country.cioc}`;
     
       var btn = document.createElement("button");
       btn.className="btn btn-primary";
       btn.textContent="Click for Weather";
       
       btn.onclick = function() {
            console.log(country.latlng[0],country.latlng[1]);
            fetchWeatherData(country.latlng[0],country.latlng[1])
            .then((weather_data)=>
            {
             if(btn.textContent=="Click for Weather"){
               content1.textContent=`Weather: ${weather_data.weather[0].description}`
               content2.textContent=`Temperature feels like: ${weather_data.main.feels_like} K`;
               content3.textContent=`Humidity: ${weather_data.main.humidity} %`;
               btn.textContent="Click for Country details";
             }
           else{
             content1.textContent=`Capital: ${country.capital}`;
             content2.textContent=`Region: ${country.region}`;
             content3.textContent= `Country Code: ${country.cioc}`;
             btn.textContent="Click for Weather";
           }
           });
           
   
       } 
       card.appendChild(cardHeader);
   
       cardBody.appendChild(flag);
       cardBody.appendChild(content1);
       cardBody.appendChild(content2);
       cardBody.appendChild(content3);
       cardBody.appendChild(btn);
       card.appendChild(cardBody);
       return card;
});   


// dividing the row into 3 columns with 3 cards
var row = document.createElement("div");
row.className = "row";
cardElements.forEach(function(card) {
    var col = document.createElement("div");
    col.className = "col-sm-12 col-lg-4 bg-light";
    col.appendChild(card);
    row.appendChild(col);
});

container.appendChild(row);
}


async function fetchWeatherData(lat,long){
  let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cea13ba246e2c263c874f6e1b010a0fd`);
  let weatherJson = await weatherData.json();
  return weatherJson;
}