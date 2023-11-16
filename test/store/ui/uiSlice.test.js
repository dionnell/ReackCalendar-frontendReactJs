import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"


describe('Pruebas en UiSlice', () => {
    
    test('debe regresar el estado por defecto', () => {
        
        expect( uiSlice.getInitialState().isDateModalOpen ).toBeFalsy()
        expect( uiSlice.getInitialState() ).toEqual( {isDateModalOpen: false} )

    })

    test('debe de cambiar el isDateModalOpen correctamente', () => {
        
        let state = uiSlice.getInitialState()
        state = uiSlice.reducer( state, onOpenDateModal() )
        expect( state.isDateModalOpen ).toBeTruthy()

        state = uiSlice.reducer( state, onCloseDateModal() )
        expect( state.isDateModalOpen ).toBeFalsy()

    })

})