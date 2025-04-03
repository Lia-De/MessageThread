import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateTree } from "../dbConnections/CreateData";

export default function CreateNewTree({setTree, setLoading}){
const {handleSubmit, register} = useForm();

// A struct to set font in my button


    // async function to create tree upon entering a name in the form
const onSubmit = async (data) =>{
    setLoading(true);
    const newTree = await CreateTree({ branchName: data })
    if (newTree) {
        setTree(newTree);
    }
    setLoading(false);
}
    // Form to fill in a name for a new tree
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
                fontFamily:"Monoton",
                fontSize: "1em"
            }}
                color="success" 
                onClick={handleSubmit(onSubmit)}>
            Start
        </Button>
        </form>
    )


}