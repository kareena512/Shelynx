import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    user: any | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null,
    userCountry: any | null
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    refreshToken: null,
    error: null,
    userCountry: {
        name: 'Australia',
        dial_code: '61',
        code: 'AU',
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
          setAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload
        },
        loaderstate(state, action) {
            state.loading = action.payload
           // state.error = null
        },
        loginSuccess(state, action) {
            state.loading = false
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.isAuthenticated = true
        },

        loginFailure(state, action) {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
        },

        restoreSession: (state) => {
            state.loading = true
        },

        restoreSessionComplete: (state) => {
            state.loading = false
        },
        updateUserCoyntry: (state, action) => {
            state.userCountry = action.payload
        }
    },
})

export const {
     setAuthenticated,
    loginSuccess,
    loginFailure,
    loaderstate,
    logout,
    restoreSession,
    restoreSessionComplete,

    updateUserCoyntry
} = authSlice.actions

export default authSlice.reducer