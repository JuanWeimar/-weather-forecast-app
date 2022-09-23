/* eslint-disable prettier/prettier */
import React, {useState, createContext, useContext} from 'react';
import { ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ApiContext} from './ApiProvider';

export const AdvContext = createContext({});

export const AdvProvider = ({children, navigation}) => {
  const [advogados, setAdvogados] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [dataTemp, setDataTemp] = useState([]);
  const {api} = useContext(ApiContext);


  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

// //   const filter = async (pesquisa) => {
// //     console.log(pesquisa);
// //     if (pesquisa == '') {
// //       dataTemp.length = 0;
// //       setDataTemp(wheater);
// //       console.log(dataTemp);
// //     }
// //     else {
// //       let filteredData = wheater.filter(x => String(x.nome).includes(pesquisa));
// //       setDataTemp(filteredData);
// //     }

// //   };

  const getAdvogados = async () => {
    let userF = auth().currentUser.uid;
    //console.log(userF);
    try {
        const response = await api.get(`/${userF}/advogados`);
        // console.log('Dados buscados via API');
        // console.log(response.data.documents);
        let data = [];
        response.data.documents.map((d) => {
            let k = d.name.split(
                `projects/previsaotempo-a3c69/databases/(default)/documents/escritorio/${userF}/advogados/`,
            );
            data.push({
                latitude: d.fields.latitude.stringValue,
                longitude: d.fields.longitude.stringValue,
                nome: d.fields.nome.stringValue,
                oab: d.fields.oab.stringValue,
                uid: k[1],
            });
        });
        data.sort((a,b) => a.nome.localeCompare(b.nome));
        setAdvogados(data);
    } catch (response) {
        setErrorMessage(response);
        console.log('Erro ao buscar via API');
        console.log(response);
    }
  };

  const saveAdvogados = async (val) => {
    let userF = auth().currentUser.uid;
    try {
        await api.post(`/${userF}/advogados`, {
            fields: {
                latitude: {stringValue: val.latitude},
                longitude: {stringValue: val.longitude},
                nome: {stringValue: val.nome},
                oab: {stringValue: val.oab},
            },
        });
        showToast('Dados salvos.');
        getAdvogados();
    } catch (response) {
        setErrorMessage(response);
        console.log('Erro ao salvar via API');
        console.log(response);
    }
  };

  const updateAdvogados = async (val) => {
    let userF = auth().currentUser.uid;
    try {
        await api.patch(`/${userF}/advogados/` + val.uid, {
            fields: {
                latitude: {stringValue: val.latitude},
                longitude: {stringValue: val.longitude},
                nome: {stringValue: val.nome},
                oab: {stringValue: val.oab},
            },
        });
        showToast('Dados salvos.');
        getAdvogados();
    } catch (response) {
        setErrorMessage(response);
        console.log('Erro ao fazer update via API');
        console.log(response);
    }
  };

  const deleteAdvogados = async (val) => {
    let userF = auth().currentUser.uid;
    try {
        await api.delete(`/${userF}/advogados/` + val);
        showToast('Advogado excluido.');
        getAdvogados();
    } catch (response) {
        setErrorMessage(response);
        console.log('Erro ao deletar via API');
        console.log(response);
    }
  };

  return (
    <AdvContext.Provider
      value={{
        // // filter,
        // dataTemp,
        getAdvogados,
        saveAdvogados,
        updateAdvogados,
        deleteAdvogados,
        advogados,
      }}>
      {children}
    </AdvContext.Provider>
  );
};
