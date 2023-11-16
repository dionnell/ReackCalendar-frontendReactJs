import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../src/store/auth/authSlice"
import { initialState, notAuthenticatedState } from "../fixture/authState"
import { useAuthStore, startLogin } from "../../src/hooks/useAuthStore"
import { act, renderHook, waitFor } from "@testing-library/react"
import { TestUserCredentials } from "../fixture/testUser"
import calendarApi from "../../src/api/calendarApi"



const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {...initialState}
        }
    })
}


describe('pruebas en useAuthStore', () => {

    beforeEach( () => localStorage.clear() )
    
    test('debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore({...initialState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined ,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        })
    })

    test('startLogin debe de realizar el login correctamente', async() => {
        
        localStorage.clear()
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        await act( async() => {
            await result.current.startLogin( TestUserCredentials )
        } )

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            status: 'authenticated',
            errorMessage: undefined,
            user: {
                uid: '62a10a4954e8230e568a49ab',
                name: 'testUser'
            }
        })
        expect( localStorage.getItem('token') ).toEqual( expect.any(String) )
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) )

    })

    test('startLogin debe de fallar la autenticacion', async() => {
        
        localStorage.clear()
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        await act( async() => {
            await result.current.startLogin( { email: 'prueba@gmail.com', password: '1234567' } )
        } )

        const { errorMessage, status, user } = result.current
        expect( localStorage.getItem('token') ).toBe(null)
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales Incorrectas',
            status: 'not-authenticated',
            user: {}
        })

        await waitFor( 
            () => expect( result.current.errorMessage ).toBe(undefined)
         )

    })

    test('StartRegister debe de crear un usuario', async() => {
        
        const NewUser = { email: 'prueba2@gmail.com', password: '1234567', name: 'test' }
        
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: "1435764",
                name: 'TEst2',
                token: "esto-es-un-token"
            }
        })

        await act( async() => {
            await result.current.startRegister( NewUser )
        } )

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {
                name: 'TEst2',
                uid: "1435764"
            }
        })

        spy.mockRestore()

    })

    test('startRegister debe de Fallar', async() => {
        
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        await act( async() => {
            await result.current.startRegister( TestUserCredentials )
        } )

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'El usuario ya existe',
            status: 'not-authenticated',
            user: {}
        })

    })

    test('checkAuthToken debe de Fallar si no hay token', async() => {
        
        const mockStore = getMockStore({...initialState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        await act( async() => {
            await result.current.checkAuthToken()
        } )

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        })

    })

    test('checkAuthToken debe de autenticar al usuario si hay token', async() => {
        
        const { data } = await calendarApi.post('/auth', TestUserCredentials)
        localStorage.setItem('token', data.token )

        const mockStore = getMockStore({...initialState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        await act( async() => {
            await result.current.checkAuthToken()
        } )

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'testUser', uid: '62a10a4954e8230e568a49ab'}
        })

    })

})