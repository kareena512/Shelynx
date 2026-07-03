import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../../share/components/AppText";
import { color } from "../../share/constants/color";
import { Icons, Logos } from "../../share/constants/media";

import AppImage from "../../share/components/AppImage";
interface GuidlineProps {
    setVisible: (visible: any) => void;
}

const Guidline: React.FC<GuidlineProps> = ({ setVisible }) => {



    const data = [
        {

            icon: Icons.searchperson,
            title: "1. Find an Agent",
            description: "Browse verified agents in your \narea."
        },
        {
            icon: Icons.browse,
            title: "2. Browse SHEIN",
            description: "Explore the catalog and select\nyour favorite items."
        },
        {
            icon: Icons.share,
            title: "3. Share Your Cart",
            description: "Paste links or share your cart \nreview for agent review."
        },
        {
            icon: Icons.confirm,
            title: "4. Confirm Order",
            description: "Agent reviews and provides final\npricing with shipping."
        },
        {
            icon: Icons.track,
            title: "5. Track Progress",
            description: "Stay informed with real-time\n updates as your order moves."
        },
        {
            icon: Icons.receive,
            title: "6. Receive Delivery",
            description: "Collect from your agent or get it \ndelivered to your door."
        }
    ]



    return (
        <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
               alignItems: 'center',
  paddingHorizontal: 15,
  paddingBottom: 40,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 55 ,alignSelf:'flex-start',marginHorizontal:10}}>
                <TouchableOpacity
                    onPress={() => {
                        setVisible('dash')
                    }}
                >


                    <AppImage
                        source={Logos.rightarrow}
                        width={16}
                        height={16}
                        resizeMode='contain'
                        tintColor={"#6B5A60"}
                    />
                </TouchableOpacity>
                <AppText
                    fontSize={32}
                    fontWeight={600}
                    color={"#78555E"}
                    textAlign="center"
                >
                    {"How It Works"}
                </AppText>
            </View>
            <AppText
                fontSize={16}
                fontWeight={400}
                color={"#574146"}
                textAlign={"center"}
            >
                {"Shopping from SHEIN has never been this\neasy. Follow these simple steps to get\nyour items delivered to your door."}
            </AppText>


         


                 <FlatList
                                       data={data}
                                       showsVerticalScrollIndicator={false}
                                       nestedScrollEnabled={true}
                                       renderItem={({ item, index }) => {
                                           
                    return (
                        <View
                            key={index}
                            style={{
                                gap: 10,
                                marginTop: 20,
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: '#90144826',
                                backgroundColor: color.white,
                                padding: 20,
                                borderRadius: 10,
                                shadowColor: "#B030600F",
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 3.84,
                                elevation: 5,
                                flexDirection: 'row',

                            }}
                        >
                            <View
                                style={{
                                    height: 56,
                                    width: 56,
                                    borderRadius: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#90144826'
                                }}
                            >
                                <AppImage
                                    source={item.icon}
                                    width={22}
                                    height={22}
                                    resizeMode={"contain"}

                                />

                            </View>
                            <View

                            >
                                <AppText
                                    key={index}
                                    fontSize={16}
                                    fontWeight={600}
                                    color={"#901448"}
                                >
                                    {item.title}
                                </AppText>
                                <AppText
                                   // key={index}
                                    fontSize={16}
                                    fontWeight={400}
                                    color={"#574146"}
                                //textAlign={"center"}
                                >
                                    {item.description}
                                </AppText>
                            </View>
                        </View>
              );
}}
/>
    <TouchableOpacity
     onPress={() => {
                        setVisible('dash')
                    }}
                style={styles.btnview}
            >
                <AppText
                    fontSize={14}
                    fontWeight={400}
                    color={color.themetext}
                    textAlign={"center"}
                >
                    {"Start Exploring"}
                </AppText>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btnview, {
                    backgroundColor: color.white,
                    marginBottom: 60,

                }]}
            >
                <AppText
                    fontSize={14}
                    fontWeight={400}
                    color={color.themetext}
                    textAlign={"center"}
                >
                    {"Become an Agent"}
                </AppText>
            </TouchableOpacity>
          

        
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    btnview: {
        marginTop: 20,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#90144826',

        padding: 20,
        borderRadius: 10,
        shadowColor: "#B030600F",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: color.btncolor,
        //marginHorizontal:20
    }
})

export default Guidline;