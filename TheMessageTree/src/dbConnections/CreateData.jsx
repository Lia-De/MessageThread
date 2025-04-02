import axios from "axios";

export async function CreateTree({branchName}){
    return axios.post('/api/addTree', branchName)
    .then(result => result.data)
    .catch(e=>console.log(e))
}

export async function CreateMessage({message}) {
    if (message!=null)
    {
        return axios.post('/api/addNote/1', message)
        .then(result => result.data)
        .catch(error =>console.log(error))
    }

}