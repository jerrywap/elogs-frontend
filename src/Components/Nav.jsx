
import React, {useState} from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import PropertySelector from "./PropertySelector"
import {Dialog} from "primereact/dialog";
import NewReport from "./NewReport";
const Logo = require("../Assets/ElogsLogo.png")



export default function TemplateDemo() {
    const [visible, setVisible] = useState(false);

    const items = [
        {
            label: 'View Reports',
            icon: 'pi pi-home',
            command: ()=>{
                window.location.href="/";
            }
        },
        {
            label: 'New Job Report',
            icon: 'pi pi-star',
            command: () => {
                setVisible(true)
            }
        },
    ];

    const start = <img alt="logo" src={Logo} height="40" className="mr-2"></img>;
    const end = (
        <div>
            <div className="flex align-items-center gap-2">
                <PropertySelector/>
            </div>
        </div>

    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />

            <Dialog header="New Job Report" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <NewReport/>
            </Dialog>

        </div>
    )
}
        