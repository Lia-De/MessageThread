import { Outlet } from "react-router"

export default function Layout(){

    
    return (
    <>
    <div>
        <button style={{height:"60px", width:"60px"}}>tree</button>
        <button style={{fontFamily: "Quantico", height:"60px", width:"60px"}}>irc</button>
    </div>
    <Outlet />
    </>
    )
}