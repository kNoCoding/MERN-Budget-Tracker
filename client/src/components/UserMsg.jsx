import { useEffect, useState } from "react"
import { EventBus } from "../services/event-bus.service.js"

export const UserMsg = () => {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const removeListener = EventBus.on('show-msg', (msg) => {
            setMsg(msg)
            setTimeout(() => setMsg(null), 3000)
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