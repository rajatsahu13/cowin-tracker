import React, {useEffect} from 'react'
import axios from "axios";
import date from 'date-and-time';
import {vaccineFilter, feeFilter, doseFilter, ageFilter} from '../hooks/filters'
import notificationHandler from '../hooks/notificationHandler';
import Filters from './Filters';

function TrackByDistrict(props) {

  const getStates = async () => {
    const result = await axios.get(
      "https://cdn-api.co-vin.in/api/v2/admin/location/states"
    );
    props.setStates(result.data.states);
  };

  const getDistricts = async () => {
    const result = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${props.stateId}`
    );
    props.setDistricts(result.data.districts);
  };

  useEffect(() => {
    getStates()
    if(props.stateId !== '') {
      getDistricts()
    }
  },[props.stateId])

  const stateHandler = (event) => {
    props.setStateId(event.target.selectedOptions[0].id)
  }
  
  const districtHandler = (event) => {
    props.clearDistrict()
    props.setDistrictId(event.target.selectedOptions[0].id)
    props.setDistrictName(event.target.selectedOptions[0].value)
  }

  const getByDistrict = async () => {
    notificationHandler()
    const now = new Date();
    const outDate = date.format(now, 'DD/MM/YYYY');
    const config = { params: {district_id: props.districtId, date: outDate} }
    const result = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict`,
      config
    );
    props.setTrackDistrict(true)
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
  }

  useEffect(() => {
    const interval = setInterval(() => {
     if (props.trackDistrict) {
        getByDistrict()
        props.setHasChanged(false)
        if (props.length > 0) {
          axios.get('/send-notification')
        }
      }
    }, 180000);
    if(props.hasChanged) {
      return () => clearInterval(interval)
    }
  },[props.trackDistrict,props.length]);

  return (
    <div class={`pt-3 ${props.districtSearch ? `` : 'is-hidden'}`}>
      <div class="columns is-centered mb-5" id="district-options">
        <div class="field is-flex-mobile is-justify-content-center">
          <div class="control mt-5">
            <div class="select">
              <select onChange={stateHandler}>
                <option>Select State</option>
                { 
                  props.states.map((state) => (
                    <option key={state.state_id} id={state.state_id}>{state.state_name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        <div class="field mx-3 is-flex-mobile is-justify-content-center">
          <div class="control mx-3 mt-5">
            <div class="select">
              <select onChange={districtHandler}>
                <option>Select District</option>
                {
                  props.districts.map((district) => (
                    <option key={district.district_id} id={district.district_id}>{district.district_name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        <div class="field is-grouped is-flex-mobile is-justify-content-center mt-5 btn-control">
          <div class="control">
            <button class={`button is-success ${props.trackDistrict ? 'is-hidden' : ''}`} onClick={getByDistrict}><strong>Track</strong></button>  
          </div>
          <div class="control">
          <button class={`button is-danger ${props.trackDistrict ? '' : 'is-hidden'}`} onClick={props.clearDistrict}><strong>Stop Tracking</strong></button>
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

export default TrackByDistrict