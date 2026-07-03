import React, { useEffect, useState } from 'react';
import {  StatusBar, StyleSheet } from 'react-native';

import MainHeader from '../share/components/MainHeader';
import Dashboard from './Home/Dashboard';
import Guidline from './Home/Guidline';
import FindAgent from './Home/FindAgent';
import PlaceOrder from './Home/PlaceOrder';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [visible, setVisible] = useState('dash');
 const navigation = useNavigation<any>();
//   useEffect(()=>{
// setVisible('dash')
//   },[navigation])

  return (
    <SafeAreaView 
      edges={['top']}
      
    style={styles.container}>
       <StatusBar
        barStyle="dark-content"
        translucent={false}
      />
      <MainHeader 
      headerName={visible}
      setVisible={setVisible}
      />

      {visible == 'dash'? (
        <Dashboard setVisible={setVisible} />
       
      ) : 
      visible == 'guid'?
      (
        <Guidline 
        setVisible={setVisible}
        />
      )
      :visible == 'find'?
       <FindAgent/>
       :visible == 'place'?
   <PlaceOrder/>
       :
       null
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF' 
  },
});

export default Home;