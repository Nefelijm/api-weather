
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
  const informacion = data.daily.data;
  console.log(informacion);

  informacion.forEach(function(article) {
    const temperatura = article.temperatureHigh;
    const summary = article.summary;
    const humidity = article.humidity;
    // const precipProbability = article.precipProbability;
    console.log(temperatura);

    // Llena los valores en el html

    let lunes = document.createElement('li');
    lunes.className = 'lunesStyle';
   

    let sum = document.createElement('p');
    let hum = document.createElement('p');
    let container = document.getElementById('container');
    container.className = 'containerStyle';
    // let divHoy = document.getElementById('div');
    let ul = document.getElementById('dias');
    
  
    // divHoy.innerText = temperatura;
   
    
    lunes.innerText = temperatura ;
    sum.innerText = summary;
    hum.innerText = humidity;
     

    // ul.appendChild(divHoy);
    ul.appendChild(lunes);
    ul.appendChild(sum);
    ul.appendChild(hum);
    
    
    container.appendChild(ul);
  });
};
