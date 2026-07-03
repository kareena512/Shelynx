import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import AppText from '../share/components/AppText';
import AppImage from '../share/components/AppImage';
import color from '../share/constants/color';
import { Icons, Logos } from '../share/constants/media';
import MainHeader from '../share/components/MainHeader';

const chatData = [
  {
    id: '1',
    name: 'Agent Elena M.',
    message: 'Your quote for #SH-7835 is ready!',
    order: 'ORDER #SH-7835',
    time: '10:45 AM',
    unread: 2,
    active: true,
    image: Icons.agent,
    highlight: true,
  },
  {
    id: '2',
    name: 'Agent Marcus J.',
    message: "I've confirmed the shipping address for your gift.",
    order: 'ORDER #SH-1204',
    time: '09:12 AM',
    unread: 0,
    active: false,
    image: Icons.agent,
    highlight: false,
  },
  {
    id: '3',
    name: 'Agent Sarah L.',
    message: 'Found those limited edition sneakers you wanted!',
    order: 'ORDER #SH-9902',
    time: 'Yesterday',
    unread: 0,
    active: false,
    image: Icons.agent,
    highlight: false,
  },
  {
    id: '4',
    name: 'Agent David K.',
    message: 'Package is currently at customs for #SH-6621.',
    order: 'ORDER #SH-6621',
    time: 'Yesterday',
    unread: 1,
    active: false,
    image: Icons.agent,
    highlight: true,
  },
  {
    id: '5',
    name: 'Agent Julia W.',
    message: 'Let me know if you want to add anything else.',
    order: 'INQUIRY #SH-0012',
    time: 'Oct 24',
    unread: 0,
    active: false,
    image: Icons.agent,
    highlight: false,
  },
];

const Inbox = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.card,
          item.highlight && styles.activeCard,
        ]}>
        {item.highlight && <View style={styles.leftBorder} />}

        <View style={styles.avatarContainer}>
          <AppImage
            source={item.image}
            width={58}
            height={58}
            borderRadius={29}
          />

          {item.active && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.content}>
          <View style={styles.topRow}>
            <AppText
              fontSize={18}
              fontWeight={600}
              color="#222">
              {item.name}
            </AppText>

            <AppText
              fontSize={13}
              fontWeight={600}
              color={
                item.unread
                  ? color.themetext
                  : '#666'
              }>
              {item.time}
            </AppText>
          </View>

          <AppText
            fontSize={15}
            color="#4D4447"
            numberOfLines={2}>
            {item.message}
          </AppText>

          <View style={styles.bottomRow}>
            <View style={styles.orderChip}>
              <AppText
                fontSize={11}
                color={
                  item.highlight
                    ? color.themetext
                    : '#666'
                }>
                {item.order}
              </AppText>
            </View>

            {item.unread > 0 && (
              <View style={styles.badge}>
                <AppText
                  fontSize={11}
                  color={color.white}>
                  {item.unread}
                </AppText>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppImage
            source={Icons.rightarrow}
            width={18}
            height={18}
          />
        </TouchableOpacity>

        <AppText
          fontSize={30}
          fontWeight={600}
          color="#6B5A60">
          Chat
        </AppText>

        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <AppImage
              source={Icons.notification}
              width={22}
              height={22}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <AppImage
              source={Icons.cart}
              width={22}
              height={22}
            />
          </TouchableOpacity>
        </View>
      </View> */}
<MainHeader

/>
      <FlatList
        data={chatData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Bottom Tab Placeholder */}

      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tab}>
          <AppImage source={Icons.home} width={22} height={22} />
          <AppText fontSize={12}>Home</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <AppImage source={Icons.orders} width={22} height={22} />
          <AppText fontSize={12}>Orders</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.activeTab}>
          <AppImage source={Icons.chat} width={22} height={22} />
          <AppText
            fontSize={12}
            color={color.themetext}>
            Inbox
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <AppImage source={Icons.profile} width={22} height={22} />
          <AppText fontSize={12}>Profile</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F8',
  },

  header: {
    height: 72,
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  listContainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 110,
  },

  card: {
    backgroundColor: color.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,

    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,

    overflow: 'hidden',
  },

  activeCard: {
    borderLeftWidth: 4,
    borderLeftColor: color.themetext,
  },

  leftBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: color.themetext,
  },

  avatarContainer: {
    position: 'relative',
  },

  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,

    width: 12,
    height: 12,
    borderRadius: 6,

    backgroundColor: '#2ECC71',

    borderWidth: 2,
    borderColor: color.white,
  },

  content: {
    flex: 1,
    marginLeft: 15,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  orderChip: {
    backgroundColor: '#FCE4EC',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },

  badge: {
    width: 26,
    height: 26,
    borderRadius: 13,

    backgroundColor: color.themetext,

    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomTab: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 15,

    backgroundColor: color.white,
    borderRadius: 18,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    height: 72,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 10,
  },

  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 4,
  },

  activeTab: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 70,
    height: 48,

    borderRadius: 14,
    backgroundColor: '#FDE3EC',
  },
});
export default Inbox;