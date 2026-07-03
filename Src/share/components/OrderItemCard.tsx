import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';



import AppText from './AppText';
import AppImage from './AppImage';
import color from '../constants/color';

interface ItemProps {
  item: {
    id: number;
    image: any;
    title: string;
    ref: string;
    weight: string;
    price: number;
    quantity: number;
  };

  onPlus: () => void;
  onMinus: () => void;
}

const OrderItemCard: React.FC<ItemProps> = ({
  item,
  onPlus,
  onMinus,
}) => {
  return (
    <View style={styles.card}>
      <View style={{flexDirection:'row'}}>
 <AppImage
        source={item.image}
        width={90}
        height={90}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <AppText
          fontSize={16}
          fontWeight={400}
          color={color.textcolor}>
          {item.title}
        </AppText>

        <AppText
          fontSize={12}
          fontWeight={600}
          color="#6B5A60">
          Ref: {item.ref}
        </AppText>
<TouchableOpacity
style={{marginTop:8}}
>
<AppText
          fontSize={14}
          color="#AB2C5D">
       View on SHEIN
        </AppText>
</TouchableOpacity>
        

       
      </View>

      </View>
     <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
      <View style={{flexDirection:'row',alignItems:'center',gap:20}}>
           <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.qtyButton}
          onPress={onMinus}>
          <AppText 
           color='#6B5A60'
          style={{includeFontPadding:false}}
          
          fontSize={16}>-</AppText>
        </TouchableOpacity>

        <AppText
          fontSize={16}
          fontWeight={600}
          color={color.textcolor}
          style={{marginHorizontal:10}}
          >
          {item.quantity}
        </AppText>

        <TouchableOpacity
          style={styles.qtyButton}
          onPress={onPlus}>
          <AppText 
          color='#6B5A60'
          style={{includeFontPadding:false}}
          fontSize={16}>+</AppText>
        </TouchableOpacity>
      </View>
       <AppText
          fontSize={12}
          color="#4D4447">
          Est. {item.weight}
        </AppText>
      </View>
   
         <AppText
          fontSize={18}
          fontWeight={700}
          color={color.textcolor}>
          ${item.price.toFixed(2)}
        </AppText>
     </View>
      
    </View>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  card: {
   // flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  image: {
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 15,
    //justifyContent: 'space-between',
  },

  quantityContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#F0EDED',
    padding:5,
    borderRadius:99,
    flexDirection:'row'
  },

  qtyButton: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: color.white,

    justifyContent: 'center',
    alignItems: 'center',
  },
});