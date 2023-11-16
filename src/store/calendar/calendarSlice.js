import { createSlice } from '@reduxjs/toolkit';


//const tempEvents ={
//   _id: new Date().getTime(),
//    title: 'las estrellas de bowser',
//    notes: '64 estrellas',
//    start: new Date(),
//    end: addHours( new Date(), 2 ),
//    bgColor: '#fafafa',
//    user: {
//      name: 'Dio',
//      password: '1234'
//    }
//  }

export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: {
      isLoadingEvent: true,
      events: [],
      activeEvent: null
   },
   reducers: {
      onSetActiveEvent: (state, {payload} ) => {
         state.activeEvent = payload
      },
      onAddNewEvent: ( state, {payload} ) => {
         state.events.push(payload)
         state.activeEvent = null
      },
      onUpdateEvent: ( state, {payload} ) => {
         state.events = state.events.map( event => {
            if( event.id === payload.id ){
               return payload
            }

            return event
         } )
         state.activeEvent = null
      },
      onDeleteEvent: (state) => {
         if( !state.activeEvent ){
            state.events = state.events.filter( event => event.id !== state.activeEvent.id )
            state.activeEvent = null
         }
      },
      onLoadEvent: (state, {payload = []}) => {
         state.isLoadingEvent = false
         //state.events = payload

         payload.forEach(event => {
           const exists = state.events.some( dbEvent => dbEvent.id === event.id )
           if( !exists ){
               state.events.push( event )
           } 
         })
      },
      onLogoutCalendar: (state) => {
         state.isLoadingEvent = true,
         state.events = [],
         state.activeEvent = null
      }

   }
});


export const { 
    onSetActiveEvent ,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvent,
    onLogoutCalendar
} = calendarSlice.actions;