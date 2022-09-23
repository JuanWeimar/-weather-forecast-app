/* eslint-disable prettier/prettier */
import React, {createContext, useState} from 'react';
import {create} from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext({});

export const ApiProvider = ({children}) => {
    const [api, setApi] = useState(null);

    const getApi = () => {
        if (auth().currentUser) {
            auth().currentUser.getIdToken(true)
                .then((idToken) => {
                    if (idToken) {
                        const apiLocal = create({
                            baseURL: 'https://firestore.googleapis.com/v1/projects/previsaotempo-a3c69/databases/(default)/documents/escritorio/',
                            headers: {Authorization: 'Bearer ' + idToken},
                        });
                        //console.log(apiLocal);

                        apiLocal.addResponseTransform((response) => {
                            if (!response.ok) {
                                throw response;
                            }
                        });
                        setApi(apiLocal);
                    }
                })
                .catch((e) => {
                    console.error('ApiProvider, useEffect: ' + e);
                });
        }
    };

    return (
        <ApiContext.Provider
            value={{
                api,
                getApi,
            }}>
            {children}
        </ApiContext.Provider>
    );
};
