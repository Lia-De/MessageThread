
import { AddNewMessage } from './components/AddNewMessage';
import { FaLeaf } from "react-icons/fa";
import { useEffect, useState } from "react";
import CreateNewTree from "./components/CreateNewTree";
import { timeStampDisplay } from "./vars/vars";
import { FetchTree } from "./dbConnections/FetchData";
import { useStyleContext } from './context/styleContext';

function App() {
const { currentStyle } = useStyleContext();

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
          <section className={`myTree${currentStyle}`}>
              <h2 className={`style${currentStyle}`}>{createNew}</h2>
              <CreateNewTree setTree={setTree} setLoading={setLoading} />
          </section>
          );
      }
          // Print out
      return (<>
        {currentStyle===2 && <h2 className="style2"> - {tree.name}</h2>}
          <section className={`myTree${currentStyle}`}>
                {currentStyle===1 &&<h2 className="style1">{tree.name}</h2>}
              {tree.messages && tree.messages.map((msg) => (
                  <div className={`message${currentStyle}`} key={msg.messageId}>
                      {currentStyle===1 && (
                        <><FaLeaf size="2em" />
                          <p>{msg.note}</p>
                          <FaLeaf size="2em" />
                        </>
                        )}
                      
                      {currentStyle===2 && <p>[{timeStampDisplay(msg.datestamp)}] &lt;{msg.author || "anon"}&gt; {msg.note}</p> }
                      
                  </div>
              ))}
              {/* Print form to add chats */}
              <AddNewMessage setTree={setTree}/>
          </section></>
      );
    }


  return (
    <>
      <h1 className={`style${currentStyle}`}>The Message Tree</h1>
      <PrintMyTree />
    </>
  )
}

export default App
