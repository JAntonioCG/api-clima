document.addEventListener('DOMContentLoaded', () => {
  const btnBuscar = document.getElementById('btnBuscar');
  const inputCity = document.getElementById('city'); 

  btnBuscar.addEventListener('click', () => {
    const city = inputCity.value;
    if (city.trim().length > 0) {
      buscarClima(city);
    } else {
      console.error('Por favor ingresa una ciudad válida.');
    }
  });

  const buscarClima = async (city) => {
    const url = `https://rapidweather.p.rapidapi.com/data/2.5/forecast?q=${city}&units=metric`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '67d0813419mshb9742e1ca9e61bfp18229cjsnc20ca06863b3',
        'x-rapidapi-host': 'rapidweather.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      console.log('Pronóstico =>', result);

      // Verificar que la respuesta tenga la información necesaria
      if (result && result.list && result.city) {
        const climaInfo = document.getElementById('climaInfo');
        const nextDays = result.list.slice(0, 5); // Pronóstico para los próximos 5 días (primeros 5 intervalos de 3 horas)
        
        // Actualizar el contenido de climaInfo con los detalles de la ciudad
        climaInfo.innerHTML = `
          <img src="/assets/images/cloud.png" alt="">
          ${result.city.name}, ${result.city.country}<br>
          ${nextDays[0].main.temp}ºC<br>
          ${new Date(nextDays[0].dt * 1000).toLocaleString('es-MX', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}<br>
          <img src="/assets/images/Line_1.png" alt="">
          The Next Day Forecast
        `;

        // Llenar los cuadros con la información de los próximos días
        const dayElements = ['rectangle01', 'rectangle02', 'rectangle03', 'rectangle04', 'rectangle05'];
        dayElements.forEach((id, index) => {
          const day = nextDays[index];
          const element = document.getElementById(id);
          element.innerHTML = `
            <p>${new Date(day.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            <img src="/assets/images/Rectangle_12.png" alt="Temperature Indicator">
            <p>${day.main.temp}ºC</p>
          `;
        });

        // Actualizar el contenido de title01 con la descripción del clima
        const title01 = document.getElementById('title01');
        title01.innerHTML = `${nextDays[0].weather[0].description}`; // Muestra la descripción del clima
      } else {
        console.error('Los datos del clima no están en el formato esperado.');
      }
    } catch (error) {
      console.error('Error al buscar el clima:', error);
    }
  };
});
