import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import API from "../Service/API";

export default function Details() {
    const configMenu = useRef(null);
    const { id } = useParams();

    const items = [
        {
            label: 'Refresh',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];

    const headerTemplate = (options) => {
        const className = `${options.className} justify-content-space-between`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="large" shape="circle" />
                    <span className="font-bold">{jobInfo?.raisedby}</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    <button className="p-panel-header-icon p-link mr-2" onClick={(e) => configMenu?.current?.toggle(e)}>
                        <span className="pi pi-cog"></span>
                    </button>
                    {options.togglerElement}
                </div>
            </div>
        );
    };

    const footerTemplate = (options) => {
        const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;

        return (
            <div className={className}>
                <span className="p-text-secondary">Date Created: {jobInfo?.createdon}</span>
                <div className="flex align-items-center gap-2">
                    <Button onClick={()=>window.location.href="/"}>Back</Button>
                </div>
            </div>
        );
    };
    const [jobInfo, setJobInfo] = useState({})
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API.ENDPOINT}job/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                result?.length > 0 && setJobInfo(result[0])
            })
            .catch(error => console.log('error', error))
    }, []);


    return (
        <Panel headerTemplate={headerTemplate} footerTemplate={footerTemplate} toggleable>
            <p className="m-0">
                <h3>Summary</h3>
                {jobInfo?.summary}
            </p>
            <p className="m-0">
                <h3>Description</h3>
                {jobInfo?.description}
            </p>
            <div>
                <h3>Status : {jobInfo?.status}</h3>
            </div>
        </Panel>
    )
}
        