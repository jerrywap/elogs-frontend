
import React, {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';
import {usePropertyContext} from "../Service/PropertyContext";
import API from "../Service/API";

export default function BasicDemo() {
    const [selectedCity, setSelectedCity] = useState(null);
    const { propertyId, setPropertyId } = usePropertyContext();
    const [properties,setProperties] = useState([])

    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API.ENDPOINT}property`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setProperties(result)

                if(!propertyId){
                    setPropertyId(result?.[0]?.id)
                    console.log("Set first property by default")
                }
            })
            .catch(error => console.log('error', error));

    },[])

    //formatter
    const Formatter = (properties)=>{
        return properties?.map((oneProperty,i)=>{
            return {name:oneProperty?.name,code:oneProperty?.id,key:i}
        })
    }

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => {
                setSelectedCity(e.value)
                setPropertyId(e.value?.code)
            }} options={Formatter(properties)} optionLabel="name"
                      placeholder="Switch Property" className="w-full md:w-14rem" />
        </div>
    )
}
        