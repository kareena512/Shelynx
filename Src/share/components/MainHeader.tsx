import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native'

import AppText from '../components/AppText'
import color, {  } from '../constants/color'
import { Icons,  Logos } from '../constants/media';

import AppImage from './AppImage';

import { GlobalImage } from '../utils/GlobalImage';
interface MainHeaderProps {
  user?:any
  headerName?: string
  profileImage?: string
  onNotificationPress?: () => void
  onProfilePress?: () => void
  setVisible: (visible: any) => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  headerName,
  onNotificationPress,
  onProfilePress,
  setVisible,
}) => {
 
  return (
  
    <View style={[styles.header,]}>
     {
     headerName == 'find'?
     <View style={{flexDirection:'row',alignItems:'center',gap:15}}>
      <TouchableOpacity
      onPress={()=>{
    setVisible('dash')
}}
      >

     
<AppImage
source={Logos.rightarrow}
width={16}
height={16}
resizeMode='contain'
tintColor={"#6B5A60"}
/>
 </TouchableOpacity>
      <AppText fontSize={24} color='#6B5A60' fontWeight={700}>
        {"Find Agent"}
      </AppText>
      </View>


      :


  headerName == 'place'?
     <View style={{flexDirection:'row',alignItems:'center',gap:15}}>
      <TouchableOpacity
      onPress={()=>{
    setVisible('dash')
}}
      >

     
<AppImage
source={Logos.rightarrow}
width={16}
height={16}
resizeMode='contain'
tintColor={"#6B5A60"}
/>
 </TouchableOpacity>
      <AppText fontSize={24} color='#6B5A60' fontWeight={700}>
        {"Place Order"}
      </AppText>
      </View>

      
      :


      <AppImage
      source={Logos.splashLogo}
      height={48}
      width={48}
      resizeMethod='contain'
      />

      }
      <View style={{flexDirection:'row',gap:15}}>
        <TouchableOpacity>
<AppImage
      source={Icons.bell}
      height={20}
      width={16}
      resizeMethod='contain'
      />
        </TouchableOpacity>
         <TouchableOpacity>
 <AppImage
      source={Icons.cart}
      height={20}
      width={20}
      resizeMethod='contain'
      />
         </TouchableOpacity>
      
      </View>
    </View>
  )
}

export default MainHeader

const styles = StyleSheet.create({
  header: {
    width:'100%',
   height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: color.white,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04, // #0000000A = ~4% opacity
    shadowRadius: 12, // 24px blur ≈ 12

    // Android
    elevation: 6,
  },

})