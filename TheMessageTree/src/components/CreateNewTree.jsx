import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateTree } from "../dbConnections/CreateData";
import { useStyleContext } from "../context/styleContext";

export default function CreateNewTree({setTree, setLoading}){
const {handleSubmit, register} = useForm();
const {currentStyle} = useStyleContext();
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
    if (currentStyle ===1) {
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
if (currentStyle===2) {
    return (
        <form>
            <input className="style2" type="text" {...register("note", {required: true})} />
            <button type="submit"     onClick={handleSubmit(onSubmit)}>Start</button>
        </form>
    )

}


}