import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useEffect, useState } from 'react'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'


export const CalendarPage = () => {

  const { user } = useAuthStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { openDateModal } = useUiStore()
  const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid )

    const style = {
      backgoundColor: isMyEvent ? '#347CF7' : '#465660' ,
      borderRadius: '8px',
      opcity: 0.8,
      color:'white'
    }

    return{
      style
    }

  }

  const onDoubleClick = (event) => {
    openDateModal()
  } 

  const onSelect = (event) => {
    setActiveEvent(event)
  } 

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event)
    setlastView(event)
  }

  useEffect(() => {
    startLoadingEvents()
  
  }, [])
  


  return (
    <>
      <Navbar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={ getMessagesES }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}
