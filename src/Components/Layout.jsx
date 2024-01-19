import React from 'react';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import Nav from'./Nav'


const Layout = ({children}) => {
    return (
        <div style={{
            width:'80%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            margin:'auto',

        }}>
            <Panel >
                <Nav/>
                <Card>
                    {children}

                </Card>
            </Panel>

        </div>
    );
};

export default Layout;