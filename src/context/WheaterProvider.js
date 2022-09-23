/* eslint-disable prettier/prettier */
import React, {useState, createContext} from 'react';
import { ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const WheaterContext = createContext({});

export const WheaterProvider = ({children, navigation}) => {
  const [wheater, setWeather] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);


  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getCurrentWeather = async (city_name) => {
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
  };

  const getPrev = async () => {
    let userF = auth().currentUser;
    firestore()
        .collection('wheater')
        .doc(userF.uid)
        .collection('cities')
        .orderBy('cidade')
        .onSnapshot((querySnapshot) => {
                let d = [];
                querySnapshot.forEach((doc) => {
                    //console.log(doc.id, ' => ', doc);
                    const prevs = {
                        id: doc.id,
                        nome: doc.data().cidade,
                        descricao: doc.data().descricao,
                        umidade: doc.data().umidade,
                        temperatura: doc.data().temperatura,
                        time: doc.data().time,
                        velocidade: doc.data().velocidade,
                    };
                    d.push(prevs);
                });
                //console.log(d);
                setWeather(d);
            },
            (e) => {
            console.log('ListPrev, getPrevs: ' + e);
            }
        );
        return wheater;
  };

  const filter = async (pesquisa) => {
    console.log(pesquisa);
    if (pesquisa == '') {
      dataTemp.length = 0;
      setDataTemp(wheater);
      console.log(dataTemp);
    }
    else {
      let filteredData = wheater.filter(x => String(x.nome).includes(pesquisa));
      setDataTemp(filteredData);
    }

  };

  const savePrev = async (dataWheater) => {
    let userF = auth().currentUser;
    firestore()
    .collection('wheater')
    .doc(userF.uid)
    .collection('cities')
    .add(dataWheater)
    .then(() => {
        console.log('Previsao cadastrada!');
    })
    .catch((e) => {
        console.log('Previsao: erro em cadastrar' + e);
    });
  };

  const extinguish = async (id) => {
    let userF = auth().currentUser;
    firestore()
      .collection('wheater')
      .doc(userF.uid)
      .collection('cities')
      .doc(id)
      .delete()
      .then(() => {
          console.log('Previsao Deletada!');
          showToast('Previsão Deletada. ');
          navigation.goBack();
      })
      .catch((e) => {
          console.log('Previsao: erro em deletar' + e);
      });
  };

  const update = async (id, data) => {
    let userF = auth().currentUser;
    firestore()
      .collection('wheater')
      .doc(userF.uid)
      .collection('cities')
      .doc(id)
      .set(data)
      .then(() => {
          console.log('Previsao updated!');
          showToast('Previsão Atualizada. ');
      })
      .catch((e) => {
          console.log('Previsao: erro em atualizar' + e);
      });
  };

  return (
    <WheaterContext.Provider
      value={{
        getCurrentWeather,
        getPrev,
        savePrev,
        wheater,
        filter,
        dataTemp,
        extinguish,
        update,
      }}>
      {children}
    </WheaterContext.Provider>
  );
};
