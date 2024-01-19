import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import {Sample as CustomerService}  from '../Service/Sample';
import { Button } from 'primereact/button';
import NewReport from "./NewReport";
import {Dialog} from "primereact/dialog";
import "../Styles/NewReport.css";
import API from "../Service/API";


export default function BasicFilterDemo() {
    const [visible, setVisible] = useState(false)
    const [jobs, setJobs] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [activeRow, setActiveRow] = useState({})

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API.ENDPOINT}job/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setJobs(result)
                setLoading(false)
            })
            .catch(error => console.log('error', error))
            .finally(setLoading(false));
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();
    const onViewDetails = (rowData)=>{
        window.location.href=`/job-details/${rowData?.id}`
    }
    const onEditInfo = (jobInfo)=>{
        console.log(jobInfo)
        setActiveRow(jobInfo)
        setVisible(true)
        // setJobInfo(jobInfo)
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div style={{
                    display:'flex',
                    flexDirection:'row'
                }}>
                    <Button label="Details" className="p-button p-button-sm" onClick={() => onViewDetails(rowData)} />
                    <Button label="Edit" className="p-button p-button-sm p-button-warning" onClick={() => onEditInfo(rowData)} />
                </div>

            </React.Fragment>
        );
    };


    return (
        <div className="card">
            <Dialog header="Edit Job Report" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <NewReport activeRow={activeRow}/>
            </Dialog>
            <DataTable value={jobs} paginator rows={10} dataKey="id"  loading={loading}
                       globalFilterFields={['summary','status','property','raisedby']} header={header} emptyMessage="No Jobs Created Yet.">
                <Column field="id" header="id" filter filterPlaceholder="Search by Id"
                        // style={{ minWidth: '12rem' }}
                />
                <Column
                    field="summary" header="Summary" filter filterPlaceholder="Search by Summary"
                        // style={{ minWidth: '12rem' }}
                />
                <Column field="status" header="Status" filter filterPlaceholder="Search by Status"
                        // style={{ minWidth: '12rem' }}
                />
                <Column field="property" header="Property" filter filterPlaceholder="Search by Property Name"
                        // style={{ minWidth: '12rem' }}
                />
                <Column field="raisedby" header="Raised By" filter filterPlaceholder="Search by Person"
                        // style={{ minWidth: '12rem' }}
                />
                <Column field="action" header="Actions" body={actionBodyTemplate} style={{ minWidth: '12rem' }} />

            </DataTable>
        </div>
    );
}
