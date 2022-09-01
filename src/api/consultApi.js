/* eslint-disable prettier/prettier */
export default async function getCurrentWeather(city_name) {
  const axios = require('axios');
    console.log(city_name);
  //var results = [];
  let resp, obj;

    await axios
    .get(`https://api.hgbrasil.com/weather?key=86ae65c3&city_name=${city_name}`)
    .then(function (response) {
      const data = response.data;
      // console.log('entrou api');
      // console.log(data);
      resp = data;
      obj = {
        cidade: resp.results.city,
        descricao: resp.results.description,
        umidade: resp.results.humidity,
        temperatura: resp.results.temp,
        time: resp.results.time,
        velocidade: resp.results.wind_speedy,
      };
      //return obj;
    })
    .catch(function (error) {
        console.log(error);
    });
    return obj;
}
