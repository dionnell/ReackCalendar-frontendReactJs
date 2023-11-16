
export const events = [
    {
        id: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: addHours('2022-10-21 15:00:00'),
        title: 'las estrellas de bowser',
        notes: '64 estrellas',
    },
    {
        id: '2',
        start: new Date('2022-10-21 13:00:00'),
        end: addHours('2022-10-21 15:00:00'),
        title: 'cumple de bowser',
        notes: '64 años',
    },
]

export const initailState = {
    isLoadingEvent: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvent: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvent: false,
    events: [...events],
    activeEvent: {...events[0]}
}
