
import { Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native"

import color, { useAppColors } from "../share/constants/color";
import MainHeader from "../share/components/MainHeader";
import AppText from "../share/components/AppText";
import AppImage from "../share/components/AppImage";
import { BottomIcons, Icons, Logos } from "../share/constants/media";
import { useNavigation } from '@react-navigation/native'

const Order = () => {

  const navigation = useNavigation();







  return (
    <SafeAreaView style={styles.container}>
      <MainHeader />
      <View style={{
        flex: 1,
        paddingHorizontal: 15,
      }}>
        <TouchableOpacity
        onPress={()=>{
navigation.navigate('Createorder')
        }}
      
        style={[styles.btnview,{flexDirection:'row',gap:8}]}>
          <View
  style={{
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: color.btntextcolor,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
  <AppText
    fontSize={12}
    color={color.btntextcolor}
    style={{ lineHeight: 12 }}>
    +
  </AppText>
</View>
          <AppText
            fontSize={13}
            fontWeight={600}
            color={color.btntextcolor}
          >
            {"Create New Order"}
          </AppText>
          <AppImage
          source={Logos.arrow}
          height={16}
          width={16}
          />
        </TouchableOpacity>

        <AppText
          fontSize={24}
          fontWeight={600}
          color={"#1B1C1C"}
        >
          {"Recent Orders"}
        </AppText>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.card}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                  <View>
                    <AppText fontSize={12}
                      fontWeight={600}
                      color={"#7F7478"}>
                      {"#SH-7829"}
                    </AppText>
                    <AppText fontSize={20}
                      fontWeight={600}
                      color={"#1B1C1C"}>
                      {"4\nItems"}
                    </AppText>
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: color.btncolor,
                    borderRadius: 10,
                    padding: 5,
                    alignSelf: 'flex-start',
                    gap: 5,
                    paddingHorizontal: 10,
                  }}>
                    <AppImage
                      source={Icons.truck}
                      width={13}
                      height={9}
                      resizeMode="contain"
                    // marginTop={5}
                    />
                    <AppText fontSize={12}
                      fontWeight={600}
                      color={color.btntextcolor}>
                      {"In Transit"}
                    </AppText>
                  </View>
                </View>
                <View style={{ marginTop: 10, height: 1, backgroundColor: "#F5F3F3" }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                  <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <AppImage
                      source={Icons.agent}
                      width={40}
                      height={40}
                      resizeMode="contain"
                      borderRadius={30}
                    />

                    <View style={{ gap: 5 }}>
                      <AppText
                        fontSize={12}
                        fontWeight={600}
                        numberOfLines={1}
                      >
                        {"Agent Elena M."}
                      </AppText>
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5, backgroundColor: "#F0EDED",
                        borderRadius: 8, padding: 5,
                        justifyContent: 'center',
                        width: 55
                      }}>
                        <AppImage
                          source={Icons.star}
                          width={14}
                          height={12}
                          resizeMode="contain" />

                        <AppText fontSize={12} color={"#1B1C1C"} fontWeight={700}>
                          {"5.0"}
                        </AppText>
                      </View>
                    </View>
                  </View>

                  <AppText fontSize={20} color={color.themetext} fontWeight={700}>
                    {"$142.50"}
                  </AppText>
                </View>

                <View style={{ marginTop: 10, height: 1, backgroundColor: "#F5F3F3" }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: '100%' }}>
                  <TouchableOpacity style={[styles.btn1view, {
                    backgroundColor: "#F0EDED",

                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    gap: 10,
                    width: "75%",

                    borderWidth: 0,

                  }]}>
                    <AppImage
                      source={BottomIcons.library}
                      width={20}
                      height={20}
                      resizeMode="contain"
                    // marginTop={5}
                    />
                    <AppText fontSize={14} fontWeight={600} color={"#1B1C1C"}>
                      {"Message Agent"}
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn1view}>
                    <View style={styles.dotview}>
                      <View style={styles.dots}></View>
                      <View style={styles.dots}></View>
                      <View style={styles.dots}></View>
                    </View>
                  </TouchableOpacity>

                </View>
              </View>

            );
          }}
        />
      </View>
      <View style={{ height: 100 }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.appcolor,


  },
  btnview: {
    height: 52,
    width: "100%",
    backgroundColor: color.btncolor,
    borderRadius: 10,
    shadowColor: color.darkbackround,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20


  },
  card: {
    padding: 20,
    borderRadius: 10,
    paddingVertical: 30,
    backgroundColor: color.white,
    marginHorizontal: 5,
    //borderWidth:1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12, // Blur 24 ≈ Radius 12

    // Android
    elevation: 5,
    marginVertical: 10,
  }
  ,
  btn1view: {
    width: '20%',
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: color.white,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#D0C3C7"
  },
  dotview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#7F7478',
    marginHorizontal: 2,
  }



})
export default Order;