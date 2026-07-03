import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../share/hooks/useAppSelector';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import AppLoader from '../share/components/AppLoader';



const RootNavigator: React.FC = () => {
    const { isAuthenticated } = useAppSelector(
        (state: any) => state.auth
    );



    return (
        <>
      
            {isAuthenticated? (
                <MainTabNavigator />
            ) : (
                <AuthNavigator />
            )}
         
            <AppLoader/>
        </>
    );
};

export default RootNavigator;