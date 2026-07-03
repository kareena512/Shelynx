import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Providers from './providers'
import RootNavigator from '../navigation/RootNavigator'

import { StatusBar } from 'react-native'
const App = () => {
    return (
        <SafeAreaProvider>
    <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={true}
      />
            <Providers>
               
                      
                    <RootNavigator />
            </Providers>
        </SafeAreaProvider>
    )
}

export default App



