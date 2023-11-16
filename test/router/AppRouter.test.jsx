import { render, screen } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks"
import { AppRouter } from "../../src/router/AppRouter"
import { MemoryRouter } from "react-router-dom"
import { CalendarPage } from "../../src/calendar"

jest.mock('../../src/hooks/useAuthStore')
jest.mock('../../src/calendar', () => {
    CalendarPage: () => <h1>CalendarPage</h1>
} )

describe('Pruebas en AppRouter', () => {

    const mockCheckAuthToken =  jest.fn()
    beforeEach( () => jest.clearAllMocks() )
    
    test('debe de Mostrar la pantalla de carga y llamar checkAuthToken', () => {
    
        useAuthStore.mockReturnValue({
            status: 'checking'  ,
            checkAuthToken: mockCheckAuthToken
        })

        render( <AppRouter/> )
        //screen.debug()
        expect( screen.getByAltText('Cargando ...') ).toBeTruthy()
        expect( mockCheckAuthToken ).toHaveBeenCalled()

    })

    test('Debe Mostrar el login en caso de no estar autenticado', () => {
        
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        })

        const { constainer } = render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter> 
        )
        //screen.debug()

        expect( screen.getByText('Ingreso') ).toBeTruthy()
        expect( constainer ).toMatchSnapshot()

    })

    test('Debe Mostrar el calendario en caso de estar autenticado', () => {
        
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        })

        render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter> 
        )
        //screen.debug()

        expect( screen.getByText('CalendarPage') ).toBeTruthy()

    })

})