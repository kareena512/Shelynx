import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import apiUrls from "../../services/apiUrls";
import ApiService from '../../services/api';


import AppText from '../../share/components/AppText';
import AppImage from '../../share/components/AppImage';
import color from '../../share/constants/color';
import { Banners, BottomIcons, Icons, Logos } from '../../share/constants/media';
import OrderItemCard from '../../share/components/OrderItemCard';
import CartSummary from '../../share/components/CartSummary';

const PlaceOrder = () => {
  const navigation = useNavigation<any>();
const [loading, setLoading] = useState(false);
const [profile, setProfile] = useState<any>(null);


  const [items, setItems] = useState([
    {
      id: 1,
      image: Banners.costume,
      title: 'Ruched Silk Summer Dress',
      ref: 'SH-90210-BL',
      weight: '0.4kg',
      price: 34.99,
      quantity: 1,
    },
    {
      id: 2,
      image: Banners.costume,
      title: 'Abstract Gold Hoop Earrings',
      ref: 'SH-44582-GD',
      weight: '0.1kg',
      price: 12.5,
      quantity: 2,
    },
    {
      id: 3,
      image: Banners.costume,
      title: 'Minimalist Oversized Tote',
      ref: 'SH-11209-BG',
      weight: '0.8kg',
      price: 28,
      quantity: 1,
    },
  ]);

  const increase = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decrease = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item,
      ),
    );
  };

  const itemTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = 18.5;
  const serviceFee = 4.4;

  const grandTotal =
    itemTotal + shipping + serviceFee;




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






  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={color.white}
      />

      {/* Header */}


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 35,
        }}>
        {/* Verify */}

        <View style={styles.section}>
          <AppText
          color={color.textcolor}
            fontSize={20}
            fontWeight={700}>
            Verify Your Items
          </AppText>

          <AppText
          fontWeight={400}
            fontSize={16}
            color="#4D4447"
            marginTop={5}>
            Review your SHEIN cart items before
            submitting them to your SheLynx agent.
          </AppText>
        </View>

        {/* Product List */}

        {items.map(item => (
          <OrderItemCard
            key={item.id}
            item={item}
            onPlus={() => increase(item.id)}
            onMinus={() => decrease(item.id)}
          />
        ))}

        {/* Add Item */}

        <TouchableOpacity style={[styles.addButton,{flexDirection:'row',gap:8}]}>
          <AppText
            fontSize={13}
            color="#7A5761"
            fontWeight={700}
            style={{lineHeight:16}}
            >
            Add Item
          </AppText>
          <AppImage
          source={Logos.arrow}
          height={16}
          width={16}
          />
        </TouchableOpacity>

        {/* Address */}

        <View style={styles.section}>
          <AppText
            fontSize={20}
            fontWeight={700}
            color={color.textcolor}
            >
            Delivery Address
          </AppText>
        </View>

        <TouchableOpacity style={styles.addressCard}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.homeIcon}>
              <AppImage
                source={BottomIcons.home}
                width={20}
                height={20}
              />
            </View>

            <View style={{ marginLeft: 12 }}>
              <AppText
                fontSize={14}
                fontWeight={500}
                color={color.textcolor}
                >
                Home
              </AppText>

              <AppText
                fontSize={12}
                color="#777"
                fontWeight={600}
                >
                {profile?.addresses[0]?.addressLine},{profile?.addresses[0]?.city}
              </AppText>
            </View>
          </View>

          <TouchableOpacity
          onPress={()=>{
            navigation.navigate("ChangeAddress")
          }}
          >
            <AppText
              fontSize={15}
              color="#C73765"
              fontWeight={700}>
              Change
            </AppText>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Summary */}

        <CartSummary
          itemCount={items.reduce(
            (a, b) => a + b.quantity,
            0,
          )}
          itemTotal={itemTotal}
          shipping={shipping}
          serviceFee={serviceFee}
          grandTotal={grandTotal}
        />
      </ScrollView>

      <View style={styles.bottomcontainer}>
 <AppText
              fontSize={12}
              color={color.textcolor}
              fontWeight={600}>
             Estimated Price Quote
            </AppText>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
 <AppText
              fontSize={24}
              color={color.textcolor}
              fontWeight={700}>
           $110.89 
            </AppText>
            <TouchableOpacity>
 <AppText
              fontSize={14}
              color={"#AB2C5D"}
              fontWeight={600}>
           View Details
            </AppText>
            </TouchableOpacity>
            
            </View>
             <AppText
              fontSize={12}
              color={'#4D4447'}
              fontWeight={600}
              marginTop={10}
              >
          Taxes & Shipping included in estimate
            </AppText>
              <TouchableOpacity style={styles.button}>
        <AppText
          fontSize={13}
          color={"#7A5761"}
          fontWeight={700}>
          Confirm & Send to Agent
        </AppText>
         <AppImage
          source={Logos.arrow}
          height={16}
          width={16}
          />
      </TouchableOpacity> 
            
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F5',
  },

  header: {
    height: 60,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rightIcons: {
    flexDirection: 'row',
    gap: 16,
  },

  section: {
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 12,
  },

  addButton: {
    height: 48,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#FFD5DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  addressCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#FFF',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  homeIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFE4EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomcontainer: {
     backgroundColor: '#FFFFFF',
    padding: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
    marginBottom:75,
    borderTopLeftRadius:24,
    borderTopRightRadius:24
  },
    button: {
    marginTop: 20,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#FFD1DC',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    gap:8
  },
});
export default PlaceOrder;