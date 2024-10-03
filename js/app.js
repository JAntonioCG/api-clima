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
    const url = `https://rapidweather.p.rapidapi.com/data/2.5/weather?q=${city}&units=metric`; // Agregar &units=metric para obtener la temperatura en Celsius
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
      console.log('Ciudad =>', result);

      // Verificar que la respuesta tenga la información necesaria
      if (result && result.main && result.weather && result.sys) {
        // Actualizar el contenido de climaInfo
        const climaInfo = document.getElementById('climaInfo');
        climaInfo.innerHTML = `
          <img src="/assets/images/cloud.png" alt="">
          ${result.name}, ${result.sys.country}<br>
          ${result.main.temp}ºC<br>
          ${new Date(result.dt * 1000).toLocaleString('es-MX', { weekday: 'long', hour: '2-digit', minute: '2-digit' })} PM<br>
          <img src="/assets/images/Line_1.png" alt="">
          The Next Day Forecast
        `;
        
        // Actualizar el contenido de title01 con la descripción del clima
        const title01 = document.getElementById('title01');
        title01.innerHTML = `${result.weather[0].description}`; // Muestra la descripción del clima
      } else {
        console.error('Los datos del clima no están en el formato esperado.');
      }
    } catch (error) {
      console.error('Error al buscar el clima:', error);
    }
  };
});
