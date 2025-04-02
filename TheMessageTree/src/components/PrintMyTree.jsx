import axios from "axios";
import { AddNewMessage } from './AddNewMessage'

import { FaLeaf } from "react-icons/fa";
import { useEffect, useState } from "react";
import CreateNewTree from "./CreateNewTree";
import { timeStampDisplay } from "../vars/vars";

      {/* messages displayed
      if no thread - option to name it? */}

export default function PrintMyTree(){
    const [tree, setTree] = useState(null);
    const [loading, setLoading] = useState(false);
    const [createNew, setCreateNew] = useState();
    const [serverErr, setServerErr] = useState(null);

    useEffect(()=> {
        setLoading(true);
        axios('/api/getMyTree/1')
        .then(result=> {
                setTree(result.data);
        })
        .catch((err)=>{
            if (err.response.status===404)
                setCreateNew('Start a new tree')
            if (err.response.status===500)
                setServerErr("Server unreachable");
        })
        .finally(()=>{
            setLoading(false);
        });
    },[])

    if (loading && serverErr!=null) {
        return (<h2>loading {serverErr}</h2>)
    }
    if (!tree || !tree.messages ) {
        return (  
        <section className="myTree">
            <h2>{createNew}</h2>
            <CreateNewTree setTree={setTree} setLoading={setLoading} />
        </section>
        );
    }
    return (
        <section className="myTree">
            <h2>{tree.name}</h2>
            {tree.messages.map((msg, index) => (
                <div className="message" key={msg.messageId}>
                    <FaLeaf size="2em" />
                    <p>{timeStampDisplay(msg.datestamp)} #- {msg.note}</p>
                    <FaLeaf size="2em" />
                </div>
            ))}

            <AddNewMessage setTree={setTree}/>
        </section>
    );
}
