import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native'
import AppImage from '../share/components/AppImage';
import AppText from '../share/components/AppText';
import { Icons, Logos } from '../share/constants/media';
import color from '../share/constants/color';
import apiUrls from '../services/apiUrls';
import ApiService from "../services/api";

const SignUp = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
 const [errors, setErrors] = useState<any>({});

const validate = () => {
    let valid = true;
    let err: any = {};

    if (!fullName.trim()) {
      err.name = "Name is required";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      err.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      err.email = "Invalid email";
      valid = false;
    }
if (!phone.trim()) {
  err.phone = "Phone number is required";
  valid = false;
}

    if (!password.trim()) {
      err.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      err.password = "Min 6 characters required";
      valid = false;
    }

if (!confirmPassword.trim()) {
  err.confirmPassword = "Confirm password is required";
  valid = false;
}

    if (confirmPassword !== password) {
      err.confirmPassword = "Passwords do not match";
      valid = false;
    }
if (!acceptTerms) {
  Alert.alert("Please accept Terms & Conditions");
  return false;
}
    setErrors(err);
    return valid;
  };


  // ---------------- SIGNUP API ----------------
  const handleSignup = async () => {
    if (!validate()) return;

    try {
       setLoading(true);
      const response = await ApiService.post(apiUrls.signup, {
       name: fullName,
         phone,
         countryCode:'91',
        email,
        password,
        confirmPassword,
       agreedToTerms: acceptTerms,
       agentReferralCode: referralCode
      });

      const data = response.data;
console.log(data,response,"djjehje")
   if (response.status === 201) {
     //   Alert.alert("Success", data.message || "Account created");
     navigation.navigate('Login')
      } else {
        Alert.alert("Error", data.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
    'Sign up Failed',
    error.message || 'Something went wrong'
  );
    }
    finally {
    setLoading(false);
  }
  };






  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Logo */}

        <View style={styles.logoContainer}>
          <AppImage
            source={Logos.splashLogo}
            width={122}
            height={122}
            resizeMethod="contain"
          />

          <AppText style={styles.title}>
            Create Account
          </AppText>
        </View>

        <View style={styles.card}>
          {/* Full Name */}

          <AppText style={styles.label}>
            Full Name
          </AppText>

          <View style={styles.inputBox}>
            {/* <AppImage
              source={Icons.user}
              width={20}
              height={20}
            /> */}

            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor={"#D0C3C7"}
            
            />
          </View>

          {/* Email */}

          <AppText style={styles.label}>
            Email Address
          </AppText>

          <View style={styles.inputBox}>
            {/* <AppImage
              source={Icons.mail}
              width={20}
              height={20}
            /> */}

            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
               placeholderTextColor={"#D0C3C7"}
            />
          </View>

          {/* Phone */}

          <AppText style={styles.label}>
            Phone Number
          </AppText>

          <View style={styles.phoneRow}>
            <TouchableOpacity style={styles.countryCode}>
              <AppText>🇺🇸 +1</AppText>
            </TouchableOpacity>

            <View style={[styles.inputBox, { flex: 1, marginBottom: 0 }]}>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                 placeholderTextColor={"#D0C3C7"}
              />
            </View>
          </View>

          {/* Password */}

          <AppText style={styles.label}>
            Password
          </AppText>

          <View style={styles.inputBox}>
            {/* <AppImage
              source={Icons.lock}
              width={20}
              height={20}
            /> */}

            <TextInput
              style={styles.input}
              secureTextEntry={securePassword}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
               placeholderTextColor={"#D0C3C7"}
            />

            <TouchableOpacity
              onPress={() =>
                setSecurePassword(!securePassword)
              }
            >
              {/* <AppImage
                source={Icons.eye}
                width={18}
                height={18}
              /> */}
            </TouchableOpacity>
          </View>

          {/* Confirm */}

          <AppText style={styles.label}>
            Confirm Password
          </AppText>

          <View style={styles.inputBox}>
            {/* <AppImage
              source={Icons.lock}
              width={20}
              height={20}
            /> */}

            <TextInput
              style={styles.input}
              secureTextEntry={secureConfirm}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
               placeholderTextColor={"#D0C3C7"}
            />

            <TouchableOpacity
              onPress={() =>
                setSecureConfirm(!secureConfirm)
              }
            >
              {/* <AppImage
                source={Icons.eye}
                width={18}
                height={18}
              /> */}
            </TouchableOpacity>
          </View>

          {/* Referral */}

          <AppText style={styles.label}>
            Agent Referral Code
          </AppText>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Referral Code"
              value={referralCode}
              onChangeText={setReferralCode}
               placeholderTextColor={"#D0C3C7"}
            />
          </View>

          {/* Terms */}

          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            <View
              style={[
                styles.checkbox,
                acceptTerms && styles.checkboxActive,
              ]}
            />

            <AppText style={styles.termsText}>
              I agree to the Terms of Service &
              Privacy Policy
            </AppText>
          </TouchableOpacity>

          {/* Button */}

          <TouchableOpacity 
          onPress={handleSignup}
          style={styles.button}>
             {loading ? (
                  <ActivityIndicator size="small" color="#7A5761" />
                ) : (
                  <View style={{flexDirection:'row',alignItems:'center',gap:8}}>
<AppText style={styles.buttonText}>
              Create Account
            </AppText>
            <AppImage
            source={Logos.arrow}
            height={16}
            width={16}
            />
                  </View>
            )}
          </TouchableOpacity>

          <AppText style={styles.portal}>
            Access Agent Portal
          </AppText>

          <View style={styles.loginRow}>
            <AppText>Already have an account? </AppText>

            <TouchableOpacity>
              <AppText style={styles.login}>
                Log In
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:color.appcolor,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C2C2C',
    marginTop: 16,
  },

  card: {
    marginHorizontal: 20,
  //  backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.05,
    // shadowRadius: 20,

   // elevation: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4D4447',
    marginBottom: 8,
    marginTop: 12,
  },

  inputBox: {
    height: 54,
    borderWidth: 1,
    borderColor: '#E9D9DD',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor:color.white
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1B1C1C',
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  countryCode: {
    width: 90,
    height: 54,
    borderWidth: 1,
    borderColor: '#E9D9DD',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#FFF',
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 24,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#D4B9C1',
    marginTop: 2,
    marginRight: 12,
    backgroundColor: '#FFF',
  },

  checkboxActive: {
    backgroundColor: '#F6C8D4',
    borderColor: '#F6C8D4',
  },

  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },

  button: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#FFD6E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },

  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#6E4C55',
  },

  portal: {
    textAlign: 'center',
    color: '#7B5360',
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginBottom: 22,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  login: {
    color: '#A02D59',
    fontWeight: '700',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E6E6E6',
  },

  or: {
    marginHorizontal: 16,
    color: '#999',
    fontWeight: '600',
    fontSize: 13,
  },

  socialButton: {
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: '#FFF',
  },

  socialText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  copyright: {
    fontSize: 12,
    color: '#8C8C8C',
    marginTop: 10,
  },
});

export default SignUp;