import { Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import styles from '../moduleCss/addNew.module.css'
import { CreateMessage } from "../dbConnections/CreateData"

export const AddNewMessage = ({setTree}) => {
    const {register, handleSubmit, reset} = useForm();
    

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
                fontFamily:"Monoton",
                fontSize: "1em"
            }}
                color="success" 
                onClick={handleSubmit(onSubmit)}>
            Add
        </Button>
        </form>
    )
}