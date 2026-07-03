import { ActivityIndicator, Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color } from "../../share/constants/color";
import AppText from "../../share/components/AppText";
import AppImage from "../../share/components/AppImage";
import { BottomIcons, Icons } from "../../share/constants/media";
import SearchBar from "../../share/components/SearchBar";
import { useEffect, useState } from "react";
import apiUrls from '../../services/apiUrls';
import ApiService from '../../services/api';
import { useNavigation } from '@react-navigation/native'

export default function FindAgent() {

    const [agentdata, setAgentdata] = useState(null)
    const [agentData, setAgentData] = useState<any[]>([]);
    const [filteredAgents, setFilteredAgents] = useState<any[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadings, setLoadings] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    useEffect(() => {
        geagentdata()
        getProfile()
    }, [])





    const getProfile = async () => {
        try {
            //setLoading(true);

            const response = await ApiService.get(apiUrls.getprofile);
            console.log(response, "profile api response")
            if (response.status === 200) {
                const data = response.data.data;

                setProfile(data);
                //   setFaceId(data.faceIdEnabled);
                //   setLanguage(data.language === 'ar' ? 'Arabic' : 'English');
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            // setLoading(false);
        }
    };


    const searchAgent = (text: string) => {
        setSearchText(text);

        if (!text.trim()) {
            setFilteredAgents(agentData);
            return;
        }

        const filtered = agentData.filter((item: any) =>
            item.name?.toLowerCase().includes(text.toLowerCase()) ||
            item.location?.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredAgents(filtered);
    };


    const filtered = agentData.filter((item: any) =>
        item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.rating?.toString().includes(searchText) ||
        item.completedOrders?.toString().includes(searchText)
    );

    const geagentdata = async () => {
        console.log("geagentdata api called")
        try {
            setLoading(true);
            // dispatch(loaderstate(true));

            const response = await ApiService.get(apiUrls.getagent);

            const data = response.data;
            console.log(data, 'geagentdata API RESPONSEdddd');

            if (response.status === 200) {
                setAgentData(data.agents);
                setFilteredAgents(data.agents);
            }
        } catch (error) {
            console.log('geagentdatadata ERROR:', error);
        } finally {
            setLoading(false);
        }
    };

    const SelectAgent = async (agentId: number) => {
        try {
            setLoadings(true)
            const response = await ApiService.patch(
                apiUrls.selectAgent,
                {
                    agentId,
                }
            );

            console.log('Status:', response.status);
            console.log('Response:', response.data);

            if (response.status === 200) {
                Alert.alert('Success', response.data.message);
            }
        } catch (error: any) {
            console.log('Error:', error.response?.data || error);

            Alert.alert(
                'Error',
                error.response?.data?.message || error.message
            );
        }
        finally {
            setLoadings(false);
        }
    };





    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{ gap: 10,marginHorizontal:15 }} contentContainerStyle={{ gap: 10 }}>
                <AppText
                    fontSize={24}
                    fontWeight={600}
                    color={color.textcolor}
                    marginTop={10}
                >
                    {"Find Your Expert Agent"}
                </AppText>
                <AppText
                    fontSize={16}
                    fontWeight={400}
                    color={"#4D4447"}
                >
                    {"Your dedicated shopping agent for a\nseamless experience."}
                </AppText>

                <View style={styles.currentagentview}>
                    <View style={styles.topview}>
                        <View style={{
                            alignItems: 'center', justifyContent: 'center', padding: 5, backgroundColor: color.white,
                            borderRadius: 50
                        }}>
                            <AppText
                                fontSize={12}
                                fontWeight={600}
                                color={color.btntextcolor}>
                                {"CURRENT AGENT"}
                            </AppText>

                        </View>
                        <AppImage
                            source={Icons.confirm}
                            width={22}
                            height={21}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.profileview}>
                        <View style={styles.innerview}>
                            <AppImage
                                source={profile?.agent?.avatarUrl||Icons.agent}
                                width={40}
                                height={40}
                                resizeMode="contain"
                                borderRadius={30}
                            />
                        </View>

                        <View>
                            <AppText
                                fontSize={16}
                                fontWeight={600}
                                color={'#1B1C1C'}
                            >
                                {profile?.agent?.name||" "}
                            </AppText>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5,
                            }}>
                                <AppImage
                                    source={Icons.star}
                                    width={14}
                                    height={12}
                                    resizeMode="contain" />

                                <AppText
                                    fontSize={12}
                                    fontWeight={400}
                                    color={color.themetext}
                                >
                                    {profile?.agent?.rating}
                                </AppText>
                                <View style={styles.dots} />
                                <AppText
                                    fontSize={12}
                                    fontWeight={400}
                                    color={"#4D4447"}
                                >
                                    {`${profile?.agent?.completedOrders} orders`}
                                </AppText>
                            </View>

                        </View>


                    </View>

                    <View style={{ flexDirection: 'row', gap: 10, width: '100%', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={[styles.btnview, { backgroundColor: "#FFD1DC", gap: 5, borderRadius: 8 }]}>
                            <AppImage
                                source={BottomIcons.library}
                                width={20}
                                height={20}
                                resizeMode="contain"
                                tintColor={"#78555E"}
                            />
                            <AppText
                                fontSize={14}
                                fontWeight={600}
                                color={"#78555E"}
                            >
                                {"Message"}
                            </AppText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnview, {
                            backgroundColor: color.white, gap: 5, borderWidth: 1,
                            borderColor: '#78555E', borderRadius: 8
                        }]}>

                            <AppText
                                fontSize={14}
                                fontWeight={600}
                                color={"#78555E"}
                            >
                                {"Manage"}
                            </AppText>
                            {/* <AppImage
                                    source={BottomIcons.library}
                                    width={20}
                                    height={20}
                                    resizeMode="contain"
                                    tintColor={"#78555E"}
                                /> */}
                        </TouchableOpacity>
                    </View>



                </View>
                <View style={{ marginHorizontal: 5, marginVertical: 10 }}>
                    <SearchBar
                        value={searchText}
                        onChangeText={searchAgent}
                        placeholder="Search agents..."
                    />
                </View>



                <AppText
                    fontSize={14}
                    fontWeight={600}
                    color={"#4D4447"}
                >
                    {"RECOMMENDED AGENTS"}
                </AppText>

                {loading ? (
                    <View
                        style={{
                            height: 300,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator size="large" color={color.themetext} />
                    </View>
                ) : (
                    <FlatList
                        data={filteredAgents}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.card}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', gap: 8 }}>

                                            <AppImage
                                                source={item?.avatarUrl || Icons.agent}
                                                width={40}
                                                height={40}
                                                resizeMode="contain"
                                                borderRadius={30}
                                            />
                                            <View>
                                                <AppText
                                                    fontSize={16}
                                                    fontWeight={600}
                                                    color={'#1B1C1C'}
                                                >
                                                    {item.name}
                                                </AppText>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: 5,
                                                }}>
                                                    <AppImage
                                                        source={Icons.track}
                                                        width={14}
                                                        height={12}
                                                        resizeMode="contain"
                                                        tintColor={"#4D4447"}
                                                    />

                                                    <AppText
                                                        fontSize={12}
                                                        fontWeight={400}
                                                        color={"#4D4447"}
                                                    >
                                                        {item?.location || ''}
                                                    </AppText>

                                                </View>

                                            </View>

                                        </View>

                                        <View style={{ flexDirection: 'row', gap: 5, backgroundColor: '#F0EDED', borderRadius: 8, alignSelf: 'flex-start', padding: 5 }}>
                                            <AppImage
                                                source={Icons.star}
                                                height={13}
                                                width={14}
                                                resizeMode="contain"
                                            />
                                            <AppText
                                                fontSize={12}
                                                fontWeight={700}
                                                color={"#1B1C1C"}
                                            >
                                                {item.rating}
                                            </AppText>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 5, backgroundColor: "#FCE4EC", borderRadius: 8, alignSelf: 'flex-start', padding: 5 }}>
                                        <AppText fontSize={10} color="#76646B">
                                            {"BULK SPECIALIST"}
                                        </AppText>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <AppText
                                            fontSize={16}
                                            fontWeight={400}
                                            color={"#4D4447"}
                                        >
                                            {`${item.completedOrders} orders completed`}
                                        </AppText>
                                        <TouchableOpacity
                                            onPress={() => {
                                                SelectAgent(item.id)
                                            }}
                                            style={{
                                                borderWidth: 1,
                                                height: 38,
                                                borderRadius: 8,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                paddingHorizontal: 10
                                            }}>
                                            {loadings ? (
                                                <ActivityIndicator size="small" color="#78555E" />
                                            ) : (
                                                <AppText
                                                    fontSize={16}
                                                    fontWeight={400}
                                                    color={"#78555E"}
                                                >
                                                    {"Select Agent"}
                                                </AppText>)}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}

                        ListEmptyComponent={
                            <AppText
                                fontSize={16}
                                color="#4D4447"
                                style={{ textAlign: 'center', marginTop: 30 }}
                            >
                                [ No agents found ]
                            </AppText>
                        }
                    />)}

                <View style={styles.addview}>
                    <AppText
                        fontSize={20}
                        color={color.white}
                        fontWeight={600}
                    >
                        {"Join the Network"}
                    </AppText>
                    <AppText
                        fontSize={16}
                        color={"#D7C1C8"}
                        fontWeight={400}
                    >
                        {"Earn commissions by helping others\nshop and ship."}
                    </AppText>
                    <AppText
                        fontSize={16}
                        color={"#FFD9E1"}
                        fontWeight={400}
                        marginTop={15}
                    >
                        {"Become a SheLynx Agent"}
                    </AppText>
                </View>
                <View style={{
                    height: 100
                }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.appcolor,
        //paddingHorizontal: 15,
    },
    currentagentview: {
        backgroundColor: "#FCE4EC",
        borderRadius: 12,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 5,
        marginHorizontal: 5,
        marginTop: 10

    },
    topview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    profileview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    innerview: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderwidth: 1,
        borderColor: color.white,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',

    },
    dots: {
        width: 4,
        height: 4,
        borderRadius: 4,
        backgroundColor: '#D0C3C7',
        marginHorizontal: 2,
    },
    btnview: {
        marginTop: 20,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 46,
        //padding: 20,
        borderRadius: 8,
    },
    card: {
        padding: 20,
        backgroundColor: color.white,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 5,
        marginVertical: 10,
        gap: 10,
        marginHorizontal: 5,

    },
    addview: {
        backgroundColor: color.themetext,
        padding: 20,
        borderRadius: 12,
        marginTop: 10,
        justifyContent: 'center',
        // alignItems:'center',
        paddingVertical: 20
    }
})