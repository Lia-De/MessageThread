import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fontStyle } from "../vars/vars";
import { CreateTree } from "../dbConnections/CreateData";

export default function CreateNewTree({setTree, setLoading}){
const {handleSubmit, register} = useForm();


const currentFont = fontStyle[0];

const onSubmit = async (data) =>{
    setLoading(true);
    const newTree = await CreateTree({
        branchName: data
    })

    setLoading(false);
}

    return (
        <form>
        <TextField style={{
            marginRight: "0.4em",
            width: "100%",
            padding: "0"
            }} 
            multiline="true"
            color="success"
            label="New Tree name"
            id="note" {...register("note", {required: true})}/>

        <Button variant="outlined"
            style={{
                fontFamily:currentFont,
                fontSize: "1em"
            }}
                color="success" 
                onClick={handleSubmit(onSubmit)}>
            Start
        </Button>
        </form>
    )


}