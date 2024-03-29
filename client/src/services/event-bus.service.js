function createEventBus() {
    const listeners = {}
    return {
        on(event, listener) {
            listeners[event] = listeners[event] || []
            listeners[event].push(listener)
            return () => {
                listeners[event] = listeners[event].filter(func => func !== listener)
            }
        },
        emit(event, data) {
            if (listeners[event]) {
                listeners[event].forEach(fn => fn(data))
            }
        }
    }
}

export const EventBus = createEventBus()

export function showSuccessMsg(txt) {
    EventBus.emit('show-msg', { text: txt, type: 'success' })
}

export function showErrorMsg(txt) {
    EventBus.emit('show-msg', { text: txt, type: 'error' })
}

