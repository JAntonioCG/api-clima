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
    const url = `https://rapidweather.p.rapidapi.com/data/2.5/weather?q=${city}`;
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
    } catch (error) {
      console.error('Error al buscar el clima:', error);
    }
  };
});
