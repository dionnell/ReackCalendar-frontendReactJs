import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvent, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initailState } from "../../fixture/calendarState"


describe('Pruebas en calendar Slice', () => {
    
    test('Debe de Regresar el estado por defecto', () => {
        
        const state = calendarSlice.getInitialState()
        expect( state ).toEqual(initailState)

    })

    test('onSetActiveEvent debe de activar el evento', () => {
        
        const state = calendarSlice.reducer( calendarWithActiveEventState, onSetActiveEvent( events[0] ) )
        expect(state.activeEvent).toEqual( events[0] )

    })

    test('onAddNewEvent debe de agregar el evento', () => {
        
        const newEvent = {
            id: '3',
            start: new Date('2022-10-21 13:00:00'),
            end: addHours('2022-10-21 15:00:00'),
            title: 'las estrellas de bowser',
            notes: '64 estrellas',
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
        expect( state.events ).toEqual([...events, newEvent])

    })

    test('onUpdateEvent debe de actualizar el evento', () => {
        
        const updateEvent = {
            id: '1',
            start: new Date('2022-10-21 13:00:00'),
            end: addHours('2022-10-21 15:00:00'),
            title: 'las estrellas de bowser actuales',
            notes: '64 estrellas solares',
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updateEvent))
        expect( state.events ).toContain( updateEvent )

    })

    test('onDeleteEvent debe eliminar un evento ', () => {
        
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() )
        expect(state.activeEvent).tobe( null )
        expect( state.events ).not.toContain( events[0] )

    })

    test('onLoadEvent debe establecer los eventos', () => {

        const state = calendarSlice.reducer( initailState, onLoadEvent( events ) )
        expect( state.isLoadingEvent ).toBeFalsy()
        expect( state.events ).toEqual(events)

        const newState = calendarSlice.reducer( initailState, onLoadEvent( events ) )
        expect( state.events.length ).toBe(events.length)

    })

    test('onLogoutCalendar debe de limpiar el estado', () => { 
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() )
        expect(state).toEqual(initailState)

    })

})