import { useEffect, useState } from "react";
import * as SignalR from "@microsoft/signalr";

export const Notification = () => {
const [notification, setNotification] = useState(null);

    useEffect(()=> {
    const connection = new SignalR.HubConnectionBuilder()
        .withUrl("/api/notifyHub")
        .build();

        connection.start();
        connection.on("ReceiveMessage", (message) => {
            console.log(message);
            setNotification(message);
        });

    },[])

    return (
        <>
        <h2>Notify</h2>
        </>
    )
}