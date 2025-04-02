import { Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import axios from "axios"
import styles from '../moduleCss/addNew.module.css'
import { useEffect, useState } from "react"


export const AddNewMessage = ({setTree}) => {
    const {register, handleSubmit, reset} = useForm();
    const [message, setMessage] = useState(null)


    useEffect(()=>{
        if (message!=null)
        {
            axios.post('/api/addNote/1', message)
            .then(result => {
                setTree(prev => ({
                    ...prev, 
                    messages: ([...prev.messages, result.data])
                }));

            }).catch(error =>{
                console.log(error)
            }).finally(
                () => reset()
            )
        }
    }, [message])

    const onSubmit = (data) => {
        setMessage(data)
    }

    return (
        <form>
        <TextField style={{
            marginRight: "0.4em",
            width: "100%"
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