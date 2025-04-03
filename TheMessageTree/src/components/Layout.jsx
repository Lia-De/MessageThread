import { Outlet } from "react-router"
import { useStyleContext } from "../context/styleContext"
import { fontStyle } from "../vars/vars";

export default function Layout(){
    const { styleOptions, currentStyle, setCurrentStyle } = useStyleContext();
        
    const styleSelector = () => {
        return (
        <div className="style-selector">
            {styleOptions.map(style => (
                <button
                    key={style}
                    onClick={() => setCurrentStyle(style)}
                    style={{fontFamily: fontStyle[(style-1)]}}
                    className={currentStyle === style ? 'active' : ''}
                >
                    Style {style}
                </button>
            ))}
        </div>)}
    
        switch(currentStyle) {
          case 1:
            return (
                <div id={`site-container${currentStyle}`}>
                   {styleSelector()}
                    <Outlet />
                </div> 
                );
          case 2:
            return (
                <div id={`site-container${currentStyle}`}>
                    {styleSelector()}
                    <div id="windowsBox">
                        <span className="del">X</span>
                        <Outlet />
                    </div>
                </div>
                );
          default:
            return (
                <> default
                {styleSelector()}
                <Outlet />
                </>
                );
        }

}