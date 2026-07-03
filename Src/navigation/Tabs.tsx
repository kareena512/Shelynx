import React from 'react';
import { HideableBottomTabs } from './HideableBottomTabs';
// import { useHideableTabBar } from './useHideTabBar';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Order';

import AudioRec from '../screens/AudioRec';
import Recording from '../screens/Recording';
import Order from '../screens/Order';
import Createorder from '../screens/Order/Createorder';

import WebViewScreen from '../screens/Home/WebViewScreen';
import Inbox from '../screens/Inbox';
import ChangeAddress from '../screens/Order/ChangeAddress';
//import { useHideTabBar } from './useHideTabBar';
export const Tabs = () => {
   // const controller = useHideTabBar();

    const screens = [
        { name: 'Home', component: Home },
        { name: 'Order', component: Order
            
         },
        // { name: '.', component: AudioRec },
         { name: 'Inbox', component: Inbox },
        { name: 'Profile', component: Profile },
         { name: 'Recording', component: Recording },
           { name: 'WebViewScreen', component: WebViewScreen },
           { name: 'Createorder', component: Createorder },
           { name: 'ChangeAddress', component: ChangeAddress },
        
    ];

    return (
        <HideableBottomTabs
            screens={screens}
            //controller={controller}
        />
    );
};