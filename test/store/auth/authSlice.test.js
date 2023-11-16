import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixture/authState"
import { TestUserCredentials } from "../../fixture/testUser"

describe('Pruebas en AuthSlice', () => {
    
    test('debe de regresar el estado inicial', () => {
        expect( authSlice.getInitialState() ).toEqual( initialState )

    })

    test('debe de relizar un login', () => {
        
        const state = authSlice.reducer(initialState, onLogin( TestUserCredentials ) )
        expect( state ).toEqual({
            status:'authenticated',
            user: TestUserCredentials,
            errorMessage: undefined
        })

    })

    test('debe de relizar un logout', () => {
        
        const state = authSlice.reducer(authenticatedState, onLogout() )
        expect( state ).toEqual({
            status:'not-authenticated',
            user: {},
            errorMessage: undefined
        })

    })
    
    test('debe de relizar un logout', () => {
        
        const errorMessage = 'Credenciales no Validas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage) )
        expect( state ).toEqual({
            status:'not-authenticated',
            user: {},
            errorMessage: errorMessage
        })

    })

    test('Debe de limpiar el mensaje de error', () => { 
        
        const errorMessage = 'Credenciales no Validas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage) )
        const newState = authSlice.reducer( state, clearErrorMessage() )

        expect( newState.errorMessage ).toBe( undefined )

    })

})