import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';






import AppText from '../../share/components/AppText';
import color from '../../share/constants/color';
import AddressCard from '../../share/components/AddressCard';
import CustomInput from '../../share/components/CustomInput';
import AppImage from '../../share/components/AppImage';
import { Icons, Logos } from '../../share/constants/media';

const ChangeAddress = () => {
  const [selected, setSelected] = useState('home');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          {/* <Ionicons
            name="arrow-back"
            size={24}
            color={color.textcolor}
          /> */}
          <AppImage
          source={Logos.rightarrow}
          width={16}
          height={16}
          resizeMode='contain'
          />
        </TouchableOpacity>

        <AppText style={styles.logo}>
          SheLynx
        </AppText>

        <View style={styles.headerRight}>
          <TouchableOpacity style={{ marginRight: 16 }}>
           
              <AppImage
          source={Icons.bell}
          width={16}
          height={20}
          resizeMode='contain'
          />
          </TouchableOpacity>

          <TouchableOpacity>
             <AppImage
          source={Icons.cart}
          width={20}
          height={20}
          resizeMode='contain'
          />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>
            Change Address
          </AppText>

          <AppText style={styles.subtitle}>
            Choose a saved location or add a new
            delivery point.
          </AppText>
        </View>

        {/* Saved Address */}
        <AppText style={styles.sectionTitle}>
          SAVED ADDRESSES
        </AppText>

        <AddressCard
          selected={selected === 'home'}
          icon="home-outline"
          title="Home"
          address="248 Maple Street, Apt 4B
San Francisco, CA 94105"
          onPress={() => setSelected('home')}
        />

        <AddressCard
          selected={selected === 'work'}
          icon="briefcase-outline"
          title="Work"
          address="Innovation Hub, Level 12
101 Market St, San Francisco, CA"
          onPress={() => setSelected('work')}
        />

        {/* Add Address */}
        <TouchableOpacity style={styles.addRow}>
         
           <AppImage
          source={Icons.location}
          width={16}
          height={20}
          resizeMode='contain'
          tintColor={"#AB2C5D"}
          />

          <AppText style={styles.addText}>
            ADD NEW ADDRESS
          </AppText>
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.form}>
          <CustomInput
            label="Full Name"
            placeholder="e.g. Jane Doe"
          />

          <CustomInput
            label="Phone Number"
            placeholder="(555) 000-0000"
            leftText="+1"
          />

          <CustomInput
            label="Street Address"
            placeholder="Enter street address"
            rightIcon="locate-outline"
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <CustomInput
                label="Building / Floor"
                placeholder="Apt, Suite, etc"
              />
            </View>

            <View style={{ flex: 1 }}>
              <CustomInput
                label="City"
                placeholder="City"
              />
            </View>
          </View>

          {/* Map */}
          <View style={styles.map}>
            <AppText style={{ color: '#888' }}>
              Map Preview
            </AppText>

            <View style={styles.cityBadge}>
              {/* <Ionicons
                name="location"
                color="#B12A63"
                size={15}
              /> */}

              <AppText style={styles.cityText}>
                Auto-detected city
              </AppText>
            </View>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <AppText style={styles.buttonText}>
            Confirm New Address
          </AppText>

          {/* <Ionicons
            name="arrow-forward"
            size={20}
            color="#7A5761"
          /> */}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChangeAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F7',
  },

  header: {
    height: 72,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },

  headerRight: {
    flexDirection: 'row',
  },

  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#B12A63',
  },

  titleContainer: {
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    marginTop: 6,
    color: '#666',
    lineHeight: 22,
  },

  sectionTitle: {
    marginHorizontal: 20,
    marginBottom: 12,
    fontSize: 13,
    color: '#666',
    letterSpacing: 1,
  },

  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 18,
  },

  addText: {
    marginLeft: 8,
    color: '#B12A63',
    fontWeight: '600',
  },

  form: {
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
  },

  map: {
    marginTop: 20,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cityBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },

  cityText: {
    marginLeft: 5,
    fontSize: 12,
  },

  button: {
    marginHorizontal: 20,
    marginTop: 28,
    backgroundColor: '#F9C6D3',
    borderRadius: 14,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7A5761',
    marginRight: 10,
  },
});