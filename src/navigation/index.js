/* eslint-disable prettier/prettier */
import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import {WheaterProvider} from '../context/WheaterProvider';
import {AdvProvider} from '../context/AdvProvider';
import Navigator from './Navigator';
import { ApiProvider } from '../context/ApiProvider';

export default function Providers() {
    return (
        <AuthUserProvider>
            <WheaterProvider>
                <ApiProvider>
                    <AdvProvider>
                        <Navigator />
                    </AdvProvider>
                </ApiProvider>
            </WheaterProvider>
        </AuthUserProvider>
    );
}
