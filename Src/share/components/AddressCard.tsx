import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';


import AppText from '../components/AppText';

interface Props {
  title: string;
  address: string;
  icon: string;
  selected?: boolean;
  onPress: () => void;
}

const AddressCard = ({
  title,
  address,
  icon,
  selected = false,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        selected && styles.selectedContainer,
      ]}>
      <View
        style={[
          styles.iconContainer,
          selected && styles.selectedIcon,
        ]}>
        {/* <Ionicons
          name={icon}
          size={24}
          color={selected ? '#C13574' : '#8B8B8B'}
        /> */}
      </View>

      <View style={styles.textContainer}>
        <AppText style={styles.title}>
          {title}
        </AppText>

        <AppText style={styles.address}>
          {address}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,

    borderWidth: 1,
    borderColor: '#F3F3F3',

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  selectedContainer: {
    borderColor: '#E75D92',
    backgroundColor: '#FFF',
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  selectedIcon: {
    backgroundColor: '#FDEAF1',
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },

  address: {
    color: '#666',
    fontSize: 15,
    lineHeight: 22,
  },
});