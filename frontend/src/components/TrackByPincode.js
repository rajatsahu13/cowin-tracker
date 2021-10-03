import React, {useState, useEffect} from 'react'
import axios from "axios";
import date from 'date-and-time';
import {vaccineFilter, feeFilter, doseFilter, ageFilter} from '../hooks/filters'
import notificationHandler from '../hooks/notificationHandler';
import Filters from './Filters';

function TrackByPincode(props) {

    const [message,setMessage] = useState(false)

    const removeMessage = () => {
        setMessage(false)
    }

    const pincodeHandler = (event) => {
        props.clearPincode()
        props.setPincode(event.target.value)
        
    }

    const getByPin = async () => {
        notificationHandler()
        if(props.pincode !== '' && props.pincode.length === 6) {
            setMessage(false)
            const now = new Date();
            const outDate = date.format(now, 'DD/MM/YYYY');
            const config = { params: {pincode: props.pincode, date: outDate} }
            const result = await axios.get(
                `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin`,
                config
            );
            props.setTrackPincode(true)
            props.setHasChanged(true)
            let obj = result.data.sessions
            obj = obj.filter(obj => obj.available_capacity > 0)
            if(props.hasFilters) {
                if(props.filters.vaccine !== '') {
                    obj = vaccineFilter(obj,props.filters)
                }
                if(props.filters.fee !== '') {
                    obj = feeFilter(obj,props.filters)
                }
                if(props.filters.dose !== '') {
                    obj = doseFilter(obj,props.filters)
                }
                if(props.filters.age !== '') {
                    obj = ageFilter(obj,props.filters)
                }
            } 
            props.setSessions(obj)
        } else if(props.pincode !== '' && ( props.pincode.length > 6 || props.pincode.length < 6)) {
            setMessage(true)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(props.trackPincode) {
                getByPin()
                props.setHasChanged(false)
                if (props.length > 0) {
                    axios.get('/send-notification')
                }
            }
        }, 180000);
        if(props.hasChanged) {
          return () => clearInterval(interval)
        }
    },[props.trackPincode,props.length]);

    return (
        <div class={`is-flex is-flex-direction-column is-justify-content-center pt-3 ${props.pincodeSearch ? '' : 'is-hidden'}`}>
            <div class="columns is-centered">
                <div class="field is-flex-mobile is-justify-content-center">
                    <div class="control mt-5">
                        <input id="pincode-input" class="input" type="input" placeholder="Enter Pincode" value={props.pincode} onChange={pincodeHandler} ></input>
                        <article class={`message is-danger mt-3 ${message ? '' : 'is-hidden'}`}>
                            <div class="message-header">
                                <p>Incorrect pincode!</p>
                                <button class="delete" aria-label="delete" onClick={removeMessage}></button>
                            </div>
                            <div class="message-body">
                                Pincode should be 6 digits long.
                            </div>
                        </article>
                    </div>
                </div>
                <div class="field is-grouped is-flex-mobile is-justify-content-center mt-5 btn-control">
                    <div class="control">
                        <button class={`button is-success ${props.trackPincode ? 'is-hidden' : ''}`} onClick={getByPin}><strong>Track</strong></button>  
                    </div>
                    <div class="control">
                        <button class={`button is-danger ${props.trackPincode ? '' : 'is-hidden'}`} onClick={props.clearPincode}><strong>Stop Tracking</strong></button>
                    </div>
                </div>
            </div>
            <Filters
            filters={props.filters}
            updateFilters={props.updateFilters}
            />
        </div>   
    )
}

export default TrackByPincode