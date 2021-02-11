const http = require('http');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const BASE_URL = `${process.env.BASE_URL}/current?access_key=${API_KEY}`;

const { argv } = yargs(hideBin(process.argv));
const city = argv.c || argv.city;

const url = BASE_URL + `&query=${city || 'New York'}`;

http
  .get(url, (response) => {
    response.on('data', (d) => {
      const data = JSON.parse(d.toString())?.current;
      let formattedData = {};

      if (data) {
        const {
          wind_dir,
          is_day,
          feelslike,
          temperature,
          weather_descriptions,
          visibility,
          wind_speed,
        } = data;

        formattedData = {
          City: city,
          'Temperature °C': temperature,
          'Feels like °C': feelslike,
          Description: weather_descriptions.join(','),
          'Wind speed (km/h)': wind_speed,
          'Wind direction: ': wind_dir,
          'Visibility (km)': visibility,
          Day: is_day,
        };
      }

      console.info(JSON.stringify(formattedData, null, 3));
    });
  })
  .on('error', (e) => {
    console.error(e);
  });
