import React, { useState, useEffect } from 'react';
import { Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import styles from '../moduleCss/addNew.module.css'
import { CreateMessage } from "../dbConnections/CreateData"
import { useStyleContext } from "../context/styleContext"
import { fontStyle, timeStampDisplay } from "../vars/vars"

export const AddNewMessage = ({setTree}) => {
    const {register, handleSubmit, reset} = useForm();
    const {currentStyle} = useStyleContext();
    const buttonFont = fontStyle[currentStyle-1];
const onSubmit = async (data) => { 
    const newMsg = await CreateMessage({message: data});
    reset();
    // Only proceed if newMsg exists and has data
    if (newMsg) {
        setTree(prev => ({
            ...prev, 
            messages: ([...prev.messages, newMsg])}))
      } else {
        console.log("No data returned from CreateMessage");
      }
}

    if (currentStyle ===1){
    return (
        <form>
        <TextField style={{
                marginRight: "0.4em",
                width: "100%",
            }} 
            multiline="true"
            color="success"
            label="Add new message"
            id="note" {...register("note", {required: true})}/>

        <Button variant="outlined"
            style={{
                fontFamily: buttonFont,
                fontSize: "1em"
            }}
                color="success" 
                onClick={handleSubmit(onSubmit)}>
            Add
        </Button>
        </form>
    )}
    const [currentTime, setCurrentTime] = useState(Date.now() / 1000);
  
    // Function to display formatted time
    const timeShown = () => {
      return timeStampDisplay(currentTime);
    };
    
    // Set up an interval to update the time every second
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(Date.now() / 1000);
      }, 1000);
      
      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs once on mount
    

    if ( currentStyle === 2 ){
         return (<form>
            <input className="style2time" type="text" disabled value={timeShown()} />
            <input className="style2author" type="text" {...register("author")}/>
            <input className="style2" type="text" {...register("note", {required: true})}/>
            <button type="submit" onClick={handleSubmit(onSubmit)}>Send</button>
         </form>)
    }
}