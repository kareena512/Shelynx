import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import color from "../../share/constants/color";
import AppText from "../../share/components/AppText";
import SearchBar from "../../share/components/SearchBar";
import AppImage from "../../share/components/AppImage";
import { Icons } from "../../share/constants/media";
import { useEffect, useState } from "react";
import apiUrls from "../../services/apiUrls";
import ApiService from '../../services/api';
import { useNavigation } from '@react-navigation/native'
import AppLoader from "../../share/components/AppLoader";

interface DashboardProps {
  setVisible: (visible: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setVisible }) => {
       const navigation = useNavigation<any>();
const [loading, setLoading] = useState(false);
const [profile, setProfile] = useState<any>(null);




useEffect(()=>{
    getProfile()
},[])
const getProfile = async () => {
  try {
    setLoading(true);

    const response = await ApiService.get(apiUrls.getprofile);
console.log(response,"profile api response")
    if (response.status === 200) {
      const data = response.data.data;

      setProfile(data);
    //   setFaceId(data.faceIdEnabled);
    //   setLanguage(data.language === 'ar' ? 'Arabic' : 'English');
    }
  } catch (error: any) {
    console.log(error);
  } finally {
   setLoading(false);
  }
};
if (loading) {
  return (
    <View style={{ flex: 1, backgroundColor: color.appcolor,justifyContent:'center' }}>
 <ActivityIndicator size={"large"} color={"#AB2C5D"}/>;
    </View>)
 
}

  return (


    <View style={{ flex: 1, backgroundColor: color.appcolor }}>
 
   <ScrollView 
  stickyHeaderIndices={[1]}
   style={{
    paddingHorizontal: 15,
        paddingVertical: 10,
        paddingBottom: 120, // Leave space for the floating button
    gap:10,
   }}
   showsVerticalScrollIndicator={false}
        contentContainerStyle={{  paddingVertical: 20,gap:15 }}
   >
    <View style={styles.userview}>
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        }}>
<AppText
fontSize={24}
fontWeight={600}
color={color.textcolor}
>
    {`Hello, ${profile?.name}!`||"Hello, Jane!"}
</AppText>
<TouchableOpacity
style={{flexDirection:'row',alignItems:'center',gap:3}}
onPress={()=>{
    setVisible('guid')
}}
>
<AppText
fontSize={10}
fontWeight={600}
color={color.themetext}
>
    {"How It Works"}
</AppText>
<AppImage
source={Icons.help}
width={11}
height={11}
tintColor={color.themetext}
resizeMode="contain"
/>
</TouchableOpacity>
        </View>
        <AppText
fontSize={10}
fontWeight={600}
color={"#4D4447"}
>
    {"Beirut, Lebanon"}
</AppText>

    </View>
    

    <SearchBar/>


<View style={styles.addview}>
<AppText
fontSize={20}
color={color.white}
fontWeight={600}
>
    {"Start Your Shopping"}
</AppText>
<AppText
fontSize={20}
color={color.white}
fontWeight={600}
>
    {"Journey Now"}
</AppText>

<TouchableOpacity 
 onPress={()=>{
navigation.navigate('WebViewScreen')
        }}
style={[styles.btnview,{borderColor:color.white,marginTop:25}]}>
<AppText
fontSize={14}
color={color.white}
fontWeight={600}
>
    {"Start Shopping From Shein"}
</AppText>
</TouchableOpacity>
</View>

<View style={styles.featureview}>
    <View style={{gap:5,alignItems:'center'}}>
             <TouchableOpacity
             onPress={()=>{
    setVisible('find')
}}
             
             style={styles.innerview}>
        
<AppImage
source={Icons.agent}
width={20}
height={18}
resizeMode="contain"
/>
    </TouchableOpacity>
<AppText
fontSize={12}
color="#1B1C1C"
fontWeight={600}

>
    {"Find Agent"}
</AppText>
        </View>
   <View style={{gap:5,alignItems:'center'}}>


            <TouchableOpacity
             onPress={()=>{
    setVisible('place')
}}
             
             style={styles.innerview}>
        
<AppImage
source={Icons.placecart}
width={20}
height={18}
resizeMode="contain"
/>
    </TouchableOpacity>
<AppText
fontSize={12}
color="#1B1C1C"
fontWeight={600}
textAlign="center"
>
    {"My Cart"}
</AppText>
        </View>
        <View style={{gap:5,alignItems:'center'}}>
             <View style={styles.innerview}>
        
<AppImage
source={Icons.truck}
width={20}
height={18}
resizeMode="contain"
/>
    </View>
<AppText
fontSize={12}
color="#1B1C1C"
fontWeight={600}
textAlign="center"
>
    {"Track Orders"}
</AppText>
        </View>
</View>




<AppText
fontSize={20}
color="#1B1C1C"
fontWeight={600}
marginTop={5}
>
    {"Your Current Agent"}
</AppText>


<View style={styles.card}>
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10}}>
    <View style={{alignItems:'center',
        justifyContent:'center',
        height:48,
        width:48,
        borderRadius:40,
        borderWidth:2,
        borderColor:"#AB2C5D",
        overflow:'hidden',
        }}>

    <AppImage
    source={profile?.agent?.avatarUrl||Icons.agent}
    width={50}
    height={50}
    resizeMode="contain"
    />
    </View>
    <View style={{marginLeft:10,flex:1}}>   
<AppText
fontSize={14}
color="#1B1C1C"
fontWeight={600}
>
    {profile?.agent?.name||"John Doe"}
</AppText>
<AppText
fontSize={10}
color="#AB2C5D"
fontWeight={600}
>
    {"PRO AGENT"}
</AppText>
</View>
<AppImage
source={Icons.fillchat}
width={20}
height={20}
/>
</View>

</View>


<TouchableOpacity
 onPress={()=>{
    setVisible('find')
}}
style={[styles.btnview,{borderColor:color.themetext}]}>
<AppText
fontSize={14}
color={color.themetext}
fontWeight={600}
>
    {"Find Different Agent"}
</AppText>
</TouchableOpacity>




<View style={styles.card}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',marginVertical:10}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:8}}>
  <AppImage
    source={Icons.confirm}
    height={21}
    width={22}
    tintColor={"#FFD1DC"}
    />
<AppText fontSize={20} color="#1B1C1C" fontWeight={600}>
    {"Trust Score"}
</AppText>

          </View>

<AppText fontSize={24} color="#7A5761" fontWeight={600}>
    {"84%"}
</AppText>
    </View>

    <View style={{width:'100%',backgroundColor:'#F0EDED',height:12,borderRadius:99,overflow:'hidden',marginTop:10}}>
<View style={{width:'80%',backgroundColor:'#AB2C5D',height:12,alignItems:'center'}}/>
    </View>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',marginVertical:10}}>
 
<AppText fontSize={12} color="#1B1C1C" fontWeight={600}>
    {"Excellent reliability"}
</AppText>
<AppText fontSize={12} color="#7A5761" fontWeight={600}>
    {"Boost Score →"}
</AppText>
    </View>
  
</View>


<View>


<AppText
fontSize={20}
color="#1B1C1C"
fontWeight={600}
marginTop={10}
>
    {"Available in Lebanon"}
</AppText>
<AppText
fontSize={12}
color="#4D4447"
fontWeight={600}

>
    {"Ready for immediate local delivery"}
</AppText>
</View>



<View style={{height:100}}/>
   </ScrollView>
  <View style={styles.pinkShadow}>
  <TouchableOpacity style={styles.fixedView}>
    <AppImage
      source={Icons.plus}
      width={24}
      height={24}
    />
  </TouchableOpacity>
</View>
 </View>
  
  )
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
  paddingHorizontal:15
  },
  userview:{

  },
  featureview:{
flexDirection:'row',
justifyContent:'space-between',
marginHorizontal:10
  },
  innerview:{
   height:56,
   width:56,
   borderRadius:40,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:color.lightpink
  },
card: {
  width: '100%',
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  backgroundColor: color.white,

  
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.04, 
  shadowRadius: 12,

  // Android Shadow
  elevation: 6,
},
btnview:{
    flexDirection:'row',
   alignItems:'center',
   justifyContent:'center', 
    marginTop:10,
    borderRadius:12,
    borderWidth:2,
    height:48,
    width:'100%',},
    addview:{
        backgroundColor:color.themetext,
        padding:20,
        borderRadius:12,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20
    },
      pinkShadow: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    borderRadius: 26,

    shadowColor: '#FFD1DC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    zIndex: 999,
  },
fixedView: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#AB2C5D',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25, // #00000040
    shadowRadius: 4,
    elevation: 10,
  },


})
export default Dashboard;