
import { AddNewMessage } from './components/AddNewMessage';
import { FaLeaf } from "react-icons/fa";
import { useEffect, useState } from "react";
import CreateNewTree from "./components/CreateNewTree";
import { timeStampDisplay } from "./vars/vars";
import { FetchTree } from "./dbConnections/FetchData";

function App() {

  function PrintMyTree(){ const [tree, setTree] = useState(null);
      const [loading, setLoading] = useState(false);
      const [createNew, setCreateNew] = useState();
      const [serverErr, setServerErr] = useState(null);
  
      // Load the tree on mount - if no tree, set that State, and if server unreachable set that State
      useEffect(()=> {
          setLoading(true);
          async function fetchData() {
              const response = await FetchTree({setCreateNew: setCreateNew,setServerErr:setServerErr , setTree:setTree})
              }
          fetchData();
          setLoading(false);
          },[])
          // While loading - tell the user
      if (loading ) {
          return (<h2>loading</h2>)
      }
          // If we finished the server call and it was unreachable tell the user
      if (!loading && serverErr!=null) {
          return (<h2> {serverErr}</h2>)
      }
          // We finished calling the server, but found no tree, print form to make new one
      if (!tree  ) {
          return (  
          <section className="myTree">
              <h2>{createNew}</h2>
              <CreateNewTree setTree={setTree} setLoading={setLoading} />
          </section>
          );
      }
          // Print out
      return (
          <section className="myTree">
              <h2>{tree.name}</h2>
              {tree.messages && tree.messages.map((msg) => (
                  <div className="message" key={msg.messageId}>
                      <FaLeaf size="2em" />
                      <p>{msg.note}</p>
                      {/* <p>{timeStampDisplay(msg.datestamp)} #- {msg.note}</p>  */}
                      <FaLeaf size="2em" />
                  </div>
              ))}
  
              <AddNewMessage setTree={setTree}/>
          </section>
      );
    }
  return (
    <>
      <h1>The Message Tree</h1>
      <PrintMyTree />
    </>
  )
}

export default App
