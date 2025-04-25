import { useEffect, useRef, useState } from "react";
import * as SignalR from "@microsoft/signalr";
import { useForm } from "react-hook-form";
import { data } from "react-router";

export const Notification = () => {

const [notification, setNotification] = useState([]);
const {register, handleSubmit} = useForm();
const conn = useRef(null);

    useEffect(()=> {
        // This can not be replaced with a variable, must use full url, so must add cors
    const connection = new SignalR.HubConnectionBuilder()
        .withUrl("https://localhost:7133/notifyHub")
        .build();
        // Set the reference to connection to use elsewhere
        conn.current = connection;

        connection.on("ReceiveMessage", (user, message) => {
            setNotification(prev => [...prev, {user, message}]);
        });
        connection.start();
        return () => {
            connection.stop();
        }

    },[])

    const onSubmit = async (data) => {
        try {await conn.current?.invoke("SendMessage", data.user, data.message);}
        catch (err) {
            console.log(err);
        }
    }


    return (
        <>
        <h2>Notify</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("user")} />
            <input type="text" {...register("message")}/>
            <input type="submit" value="Send" />
        </form>
        {notification && 
            notification.map((item, index) => {
                return (
                    <div key={index}>
                        <p>{item.user}: {item.message}</p>
                    </div>
                )
            }) }        </>
    )
}