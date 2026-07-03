import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';


import AppText from '../components/AppText';

interface Props extends TextInputProps {
  label: string;
  leftText?: string;
  rightIcon?: string;
}

const CustomInput = ({
  label,
  leftText,
  rightIcon,
  style,
  ...rest
}: Props) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>
        {label}
      </AppText>

      <View style={styles.inputContainer}>
        {leftText ? (
          <View style={styles.leftContainer}>
            <AppText style={styles.leftText}>
              {leftText}
            </AppText>
          </View>
        ) : null}

        <TextInput
          {...rest}
          style={[
            styles.input,
            leftText && { paddingLeft: 12 },
            style,
          ]}
          placeholderTextColor="#9A9A9A"
        />

        {/* {rightIcon ? (
          <Ionicons
            name={rightIcon}
            size={22}
            color="#C5B8BF"
            style={styles.icon}
          />
        ) : null} */}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: '#6B6B6B',
    marginBottom: 8,
    fontWeight: '500',
  },

  inputContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E6D7DC',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },

  leftContainer: {
    width: 46,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#E6D7DC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftText: {
    fontSize: 15,
    color: '#444',
    fontWeight: '600',
  },

  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#222',
  },

  icon: {
    marginRight: 14,
  },
});