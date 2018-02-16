
const ubicacion = document.getElementById('ubicacion');
const clima = document.getElementById('clima');
const divlatitud = document.getElementById('latitud');
const divlongitud = document.getElementById('longitud'); 
let uno;
let dos;

ubicacion.addEventListener('click', function() {
// Verificar si soporta la geolocalizacion
  if (navigator.geolocation) {
    alert('tu navegador soporta');
  } else {
    alert('tu navegador NO soporta');
  }

  function localizacion(posicion) {
    let latitud = posicion.coords.latitude;
    let longitud = posicion.coords.longitude; 
    divlatitud.value = latitud;
    divlongitud.value = longitud;      
  }

  function error() {
    alert('no se pudo encontrar la ubicacion');
  }

  navigator.geolocation.getCurrentPosition(localizacion, error);
});

clima.addEventListener('click', function(e) {
  uno = divlatitud.value;
  dos = divlongitud.value;
  getNew();
});

function getNew() {
  const articleRequest = new XMLHttpRequest();
  let proxy = 'https://cors-anywhere.herokuapp.com/';
  let url = `https://api.darksky.net/forecast/e11e1973bba2d051e8233d03cd4ddc9c/${uno},${dos}?lang=es`;
  articleRequest.open('GET', proxy + url);
  articleRequest.onload = addNews; 
  articleRequest.onerror = handleError; 
  articleRequest.send();
}

function handleError() {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.response);
  console.log(data);
  const information = data.daily.data;
  console.log(information);
   
  // let temperatureMaxCelcius = information.temperatureMax)
  const monday = (Math.floor(((information[0].temperatureMax) - 32) * 5) / 9);
  const tuesday = (Math.floor(((information[1].temperatureMax) - 32) * 5) / 9);
  const wednesday = (Math.floor(((information[2].temperatureMax) - 32) * 5) / 9);
  const thursday = (Math.floor(((information[3].temperatureMax) - 32) * 5) / 9);
  const friday = (Math.floor(((information[4].temperatureMax) - 32) * 5) / 9);
  const saturday = (Math.floor(((information[5].temperatureMax) - 32) * 5) / 9);


  const limonday = document.getElementById('monday');
  limonday.innerText = 'LUNES:' + '' + monday + '°C';
 
  const lituesday = document.getElementById('tuesday');
  lituesday.innerText = 'MARTES:' + '' + tuesday + ' °C';

  const liwednesday = document.getElementById('wednesday');
  liwednesday.innerText = 'MIRCOLES:' + '' + wednesday + ' °C';

  const lithursday = document.getElementById('thursday');
  lithursday.innerText = 'JUEVES:' + '' + thursday + ' °C';

  const lifriday = document.getElementById('friday');
  lifriday.innerText = 'VIERNES:' + '' + friday + ' °C';

  const lisaturday = document.getElementById('saturday');
  lisaturday.innerText = 'SABADO:' + '' + saturday + ' °C';
   

  information.forEach(function(article) {
    const temperature = article.temperatureHigh;
    const summary = article.summary;
    const humidity = article.humidity;
    const precipProbability = article.precipProbability;

    const today = document.getElementById('today');
    const temper = document.getElementById('temperature');
    const summ = document.getElementById('summary');
    const humi = document.getElementById('humidity');
    const precip = document.getElementById('precipProbability');

    temper.innerText = 'Temperatura:' + (Math.floor(((temperature) - 32) * 5) / 9) + ' °C'; 
    summ.innerText = 'SUMMARY:' + summary;
    humi.innerText = 'HUMIDITY:' + humidity;
    precip.innerText = 'precipProbability:' + precipProbability;
  });
};
