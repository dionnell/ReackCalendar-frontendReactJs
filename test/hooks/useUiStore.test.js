import { act, renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux"
import { store, uiSlice } from "../../src/store"
import { configureStore } from "@reduxjs/toolkit"


const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: {...initialState}
        }
    })
}


describe('Pruebas en el useUiStore', () => {
    
    test('debe de Regresar los valores por defecto', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        expect(result.current).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function)
        })

    })

    test('openDateModal debe de colocar true en el isDateModalOpen', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        const { isDateModalOpen, openDateModal } = result.current

        act( () => {
            openDateModal()
        })

        expect( result.current.isDateModalOpen ).toBeTruthy()

    })

    test('openDateModal debe de colocar false en el isDateModalOpen', () => {
        const mockStore = getMockStore({ isDateModalOpen: true })
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        act( () => {
            result.current.closeDateModal()
        })

        expect( result.current.isDateModalOpen ).toBeFalsy()

    })

    test('toggleDateModal debe de cambiar el estado respectivamente', () => {
        const mockStore = getMockStore({ isDateModalOpen: true })
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } )

        act( () => {
            result.current.toggleDateModal()
        })
        expect( result.current.isDateModalOpen ).toBeFalsy()

        act( () => {
            result.current.toggleDateModal()
        })
        expect( result.current.isDateModalOpen ).toBeTruthy()

    })

})