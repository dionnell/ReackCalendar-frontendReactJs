import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../api/calendarApi"
import { convertEventToDateEvents } from "../helpers"
import Swal from "sweetalert2"


export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const {
        events, activeEvent
    } = useSelector( state => state.calendar )
    const {
        user
    } = useSelector( state => state.auth )

    const setActiveEvent = (calendarEvent) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async(calendarEvent) => {

        try {
            if(calendarEvent.id){
                //actualizar
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent)
                dispatch( onUpdateEvent( {...calendarEvent, user} ) )
                return
            } 
    
            //creando
            const { data } = await calendarApi.post('/events', calendarEvent )
            dispatch( onAddNewEvent( {...calendarEvent, id: data.evento.id, user } ) )
                        
        } catch (error) {
            console.log(error)
            Swal.fire('Error al Guardar', error.response.data.msg, 'error' )
        }

    }

    const startDeleteEvent = async() =>{

        try {
            await calendarApi.put(`/events/${ activeEvent.id }`)
            dispatch( onDeleteEvent() )
            return
        } catch (error) {
            console.log(error)
            Swal.fire('Error al Eliminar', error.response.data.msg, 'error' )
        }

    }

    const startLoadingEvents = async() => {
        
        try {
            
            const {data} = await calendarApi.get('/events')
            const event = convertEventToDateEvents( data.eventos )
            dispatch( onLoadEvent(event) )

        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }


    return{
        //Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents,

    }

}