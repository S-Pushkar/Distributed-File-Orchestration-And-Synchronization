import { IoMdClose } from "react-icons/io";
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useContext, useState } from "react";
import { WebSocketContext } from "@/app/(loggedIn)/user/layout";
import { useParams } from "next/navigation";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

export default function Rename({
    setShowRename, oldName
}: {
    setShowRename: React.Dispatch<React.SetStateAction<boolean>>;
    oldName: string;
}) {
    const [name, setName] = useState("");
    const { id, path } = useParams();

    const ws = useContext(WebSocketContext);

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="w-full absolute top-0 left-0 h-screen bg-black z-10 bg-opacity-60
            flex items-center content-center justify-center">
                <div className="flex flex-col content-center items-center justify-center bg-black w-1/3 
                shadow-md shadow-white rounded-2xl p-10 gap-4">
                    <div className="w-full flex justify-between">
                        <p className="text-xl font-semibold">Rename {oldName.replace('/', '')}</p>
                        <button className="text-2xl font-bold hover:text-gray-500" onClick={()=>{
                            setShowRename(false);
                        }}>
                            <IoMdClose />
                        </button>
                    </div>
                    <TextField label="New Name" variant="outlined" 
                    className="w-full" autoFocus 
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                    <button className="font-bold text-xl border-2 border-white rounded-full 
                    px-4 p-1 transition-all duration-150 flex items-center gap-2 disabled:opacity-50 
                    cursor-pointer hover:bg-white hover:text-black"
                    onClick={(e)=>{
                        e.preventDefault()
                        ws.send(JSON.stringify({
                            Operation:"renameFileOrFolder",
                            Filepath: `${id}/${path && (path as string[]).length>0?
                            (path as string[]).join("/")+"/":""}`+oldName,
                            Dirname: "",
                            Newpath:`${id}/${path && (path as string[]).length>0?
                            (path as string[]).join("/")+"/":""}`+name,
                            Data:""
                        }))
                        setShowRename(false);
                        e.stopPropagation();
                    }}>
                        Rename
                    </button>
                </div>
            </div>
        </ThemeProvider>
    )
}