import { useEffect, useState } from "react"
import { EventBus } from "../services/event-bus.service.js"

export const UserMsg = () => {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const removeListener = EventBus.on('show-msg', (msg) => {
            setMsg(msg)
            const timeoutId = setTimeout(() => setMsg(null), 5000)

            return () => clearTimeout(timeoutId)
        })

        return removeListener
    }, [])

    if (!msg) return null

    return (
        <div className={`message ${msg.type}`}>
            {msg.text}
        </div>
    )

}