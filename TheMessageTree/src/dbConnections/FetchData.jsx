import axios from "axios";

export async function FetchTree({setCreateNew, setServerErr, setTree}){ 
        axios('/api/getMyTree/1')
        .then(result=> setTree(result.data) )
        .catch((err)=>{
            if (err.response.status===404)
                setCreateNew('Start a new tree')
            if (err.response.status===500)
                setServerErr("Server unreachable");
        })
    }