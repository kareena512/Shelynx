import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';


import AppImage from '../../share/components/AppImage';
import AppText from '../../share/components/AppText';
import { Icons, Logos } from '../../share/constants/media';
import color from '../../share/constants/color';
import apiUrls from '../../services/apiUrls';
import ApiService from '../../services/api';
import { useNavigation } from '@react-navigation/native'

const Createorder = () => {
    const navigation = useNavigation<any>();
  const [productLink, setProductLink] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<string[]>([
    'shein.com/p/product-123...',
    'shein.com/p/product-456...',
  ]);

  const addLink = () => {
    if (!productLink.trim()) return;

    setLinks(prev => [...prev, productLink.trim()]);
    setProductLink('');
  };

  const removeLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

const handleSubmitOrder = async () => {
  if (links.length === 0) {
    Alert.alert("Error", "Please add at least one product link.");
    return;
  }

  try {
    setLoading(true);

    const body = {
      links: links.map(link => ({
        url: link,
        quantity,
      })),
      notes,
    };

    console.log("Request Body:", JSON.stringify(body, null, 2));

    const response = await ApiService.post(
      apiUrls.submitOrder,
      body
    );

    console.log("Response:", response.data);

    if (response.status === 200) {
      Alert.alert(
        "Success",
        response.data.message || "Order submitted successfully."
      );

      // Reset form
      setProductLink("");
      setLinks([]);
      setQuantity(1);
      setNotes("");
    }
  } catch (error: any) {
    console.log(error);

    Alert.alert(
      "Error",
      error.message || "Unable to submit order."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity
           onPress={()=>{
navigation.navigate('Order')
        }}
          >
            <AppImage
              source={Logos.rightarrow}
              width={16}
              height={12}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <AppText
            fontSize={24}
            fontWeight={700}
            color={"#78555E"}>
            Submit Order
          </AppText>

          <TouchableOpacity>
            <AppImage
              source={Icons.help}
              width={20}
              height={26}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Paste Links */}

        <View style={styles.card}>
          <View style={[styles.titleRow,{marginBottom:16}]}>
            <AppImage
              source={Icons.link}
              width={20}
              height={10}
              resizeMode="contain"
            />

            <AppText
              fontSize={20}
              fontWeight={700}
              color="#222">
              Paste SHEIN links
            </AppText>
          </View>

          <TextInput
            value={productLink}
            onChangeText={setProductLink}
            multiline
            placeholder="Paste your product URLs here (one per line)..."
            placeholderTextColor="#7F7478"
            style={styles.textArea}
          />

          <AppText
            fontSize={12}
            fontWeight={700}
            color="#4D4447"
            marginTop={18}>
            ADD QUANTITY
          </AppText>

          <View style={styles.qtyContainer}>
            <TouchableOpacity
              onPress={() =>
                quantity > 1 && setQuantity(quantity - 1)
              }>
              <AppText fontSize={26}>−</AppText>
            </TouchableOpacity>

            <AppText fontSize={16}>{quantity}</AppText>

            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}>
              <AppText fontSize={26}>+</AppText>
            </TouchableOpacity>
          </View>

          <AppText
            fontSize={12}
            color="#4D4447"
            marginTop={15}
            fontWeight={600}
            >
            {"Our agents will automatically verify these links for\n you."}
          </AppText>
        </View>

        {/* Added Links */}

        <View style={styles.card}>
          <View style={styles.linkHeader}>
            <View style={styles.titleRow}>
              <AppImage
                source={Icons.list}
                width={18}
                height={18}
                resizeMode='contain'
              />

              <AppText
                fontSize={22}
                fontWeight={700}>
                Added Links
              </AppText>
            </View>
            <TouchableOpacity onPress={addLink} style={{flexDirection:'row',alignItems:'center',gap:8}}>
<View
  style={{
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: color.themetext,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
  <AppText
    fontSize={12}
    color={color.themetext}
    style={{ lineHeight: 12 }}>
    +
  </AppText>
</View>
            <View
            
            >
              <AppText
                color={color.themetext}
                fontSize={14}
                fontWeight={600}>
                 Add Another Link
              </AppText>
            </View>
            </TouchableOpacity>

          </View>

          <FlatList
            data={links}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={{ height: 12 }} />
            )}
            renderItem={({ item, index }) => (
              <View style={styles.linkItem}>
                <AppText
                  style={{ flex: 1 }}
                  numberOfLines={1}>
                  {item}
                </AppText>

                <TouchableOpacity
                  onPress={() => removeLink(index)}>
                  <AppImage
                    source={Icons.delete}
                    width={16}
                    height={18}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Notes */}

        <View style={styles.card}>
          <View style={[styles.titleRow,{marginBottom: 16,}]}>
            <AppImage
              source={Icons.note}
              width={18}
              height={18}
              resizeMode='contain'
            />

            <AppText
              fontSize={22}
              fontWeight={700}
              color='#1B1C1C'
              >
              Notes for Agent
            </AppText>
          </View>

          <TextInput
            value={notes}
            onChangeText={setNotes}
            multiline
            placeholder="Any specific instructions for your agent? (e.g. 'Only buy if on sale')"
            placeholderTextColor="#999"
            style={styles.noteInput}
          />
        </View>

        {/* Info */}

       <View style={styles.infoBox}>
  <AppImage
    source={Icons.info}
    height={17}
    width={17}
    resizeMode="contain"
    style={{ marginTop: 2 }}
  />

  <View style={{ flex: 1, marginLeft: 10 }}>
    <AppText
      fontSize={12}
      fontWeight={700}
      color="#1B1C1C">
      Tracking & Payment: 
       <AppText
      fontSize={12}
      fontWeight={600}
      color="#4D4447"
     // marginTop={4}
    
      numberOfLines={3}
      >
      {" Most orders are COD.\n Please contact your agent directly for payment\n confirmation and shipping updates."}
    </AppText>
    </AppText>

   
  </View>
</View>

        {/* <View style={{ height: 160 }} /> */}


         <View style={styles.bottom}>
        <TouchableOpacity style={styles.button}>
          <AppText
            color={"#7A5761"}
            fontWeight={700}
            fontSize={13}>
            Confirm & Add To Cart
          </AppText>
          <AppImage
          source={Logos.arrow}
          height={16}
          width={16}
          resizeMode='contain'
          tintColor={"#78555E"}
          />
        </TouchableOpacity>
      </View>
      </ScrollView>

      {/* Bottom Button */}

     
      {/* <View style={{height:100}}/> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F8',
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  card: {
    backgroundColor: color.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
   // marginBottom: 16,
  },

  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#D0C3C7',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#222',
    textAlignVertical: 'top',
    backgroundColor: '#FBF9F8',
  },

  qtyContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#D0C3C7',
    borderRadius: 10,
    height: 48,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,
    backgroundColor:'#FBF9F8'
  },

  linkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    
  },

  linkItem: {
    borderWidth: 1,
    borderColor: '#D0C3C7',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
backgroundColor:'#FBF9F8',
    flexDirection: 'row',
    alignItems: 'center',
  },

  noteInput: {
    minHeight: 95,
    borderWidth: 1,
    borderColor: '#D0C3C7',
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#222',
    backgroundColor:'#FBF9F8',
  },

infoBox: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  backgroundColor: '#F5F3F3',
  borderRadius: 12,
  padding: 14,
  borderWidth: 1,
  borderColor: '#D0C3C7',

  
},

  bottom: {
    // position: 'absolute',
    // bottom: 70,
    // left: 0,
    // right: 0,
marginTop:30,
    backgroundColor: '#FDF6F8',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 25,

    borderTopWidth: 1,
    borderColor: '#EFE6E8',
  },

  button: {
    height: 54,
    borderRadius: 12,
gap:8,
    backgroundColor: '#F8BFD0',

    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
  },
});
export default Createorder;