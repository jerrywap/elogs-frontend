import React, {useEffect, useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import "../Styles/NewReport.css"
import {usePropertyContext} from "../Service/PropertyContext";
import API from "../Service/API";


const NewReport = ({activeRow}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [property, setProperty] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const { propertyId, setPropertyId } = usePropertyContext();
    const [properties, setProperties] = useState([])

    useEffect(()=>{
        if(activeRow?.id){
            setFirstName(activeRow?.raisedby?.split(' ')?.[0])
            setLastName(activeRow?.raisedby?.split(' ')?.[1])
            setSummary(activeRow?.summary);
            setDescription(activeRow?.description);
        }
    },[activeRow])




    const formatProperties = ((rawProperties)=>{
        return rawProperties?.map((onePrperty,i) =>{
            return {label: onePrperty?.name,value:onePrperty?.id,key:i}
        })

    })
    const handleSubmit = (e) => {
        e.preventDefault();

        if([firstName,lastName,property,summary,description].includes('')){
            alert('All Fields are Required');
            return;
        }

        if(activeRow?.id){
            //update
            const formdata = new FormData();
            formdata.append("summary", summary);
            formdata.append("raisedby", `${firstName} ${lastName}`);
            formdata.append("description", description);

            const requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${API.ENDPOINT}jobupdate/${activeRow?.id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result?.id){
                        alert('Job Updated Successfully')
                        window.location.reload();
                        // shouldRefresh()

                    }else{
                        alert('There was a problem Updating your report')
                    }
                })
                .catch(error => console.log('error', error));
            // Handle the form submission logic here
        }else{
            //create
            var formdata = new FormData();
            formdata.append("summary", summary);
            formdata.append("raisedby", `${firstName} ${lastName}`);
            formdata.append("description", description);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${API.ENDPOINT}jobcreate/${propertyId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result?.id){
                        alert('Job Added Successfully')
                        window.location.reload();
                        // shouldRefresh()

                    }else{
                        alert('There was a problem saving your report')
                    }
                })
                .catch(error => console.log('error', error));
            // Handle the form submission logic here
        }

    };
    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API.ENDPOINT}property`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setProperties(formatProperties(result))
            })
            .catch(error => console.log('error', error));

    },[])
    useEffect(()=>{
        setProperty(propertyId)
    },[propertyId])


    return (
        <form onSubmit={handleSubmit} className="p-fluid my-form">
            <div className="p-grid row-custom">
                <div className="col-custom">
                    <InputText disabled={Boolean(activeRow?.id)} readOnly={Boolean(activeRow?.id)} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                </div>
                <div className="col-custom">
                    <InputText disabled={Boolean(activeRow?.id)} readOnly={Boolean(activeRow?.id)}  value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                </div>
            </div>
            <div className="p-grid">
                <div className="p-col-12">
                    <Dropdown  disabled={Boolean(activeRow?.id)} readOnly={Boolean(activeRow?.id)}  value={property} options={properties} onChange={(e) => {
                        setProperty(e.value)
                        console.log(e)
                    }} placeholder="Select a Property"/>
                </div>
            </div>
            <div className="p-grid">
                <div className="p-col-12">
                    <InputTextarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={5} placeholder="Summary" />
                </div>
            </div>
            <div className="p-grid">
                <div className="p-col-12">
                    <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Description" />
                </div>
            </div>
            <div className="p-grid">
                <div className="p-col-12">
                    <Button label="Save" icon="pi pi-check" />
                </div>
            </div>
        </form>
    );
};

export default NewReport;
