import React, { useState } from "react";
import './App.css'

import TrackByDistrict from "./components/TrackByDistrict";
import TrackByPincode from "./components/TrackByPincode";
import Status from "./components/Status";
import Card from "./components/Card";
import Message from "./components/Message";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OnboardingMessage from './components/OnboardingMessage'

function App() {

  const [stateId,setStateId] = useState('')
  const [districtId,setDistrictId] = useState('')
  const [districtName,setDistrictName] = useState('')
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [pincode, setPincode] = useState('');
  const [sessions, setSessions] = useState([]);
  const [hasChanged, setHasChanged] = useState(false)
  const [districtSearch, setDistrictSearch] = useState(false)
  const [pincodeSearch, setPincodeSearch] = useState(false)
  const [trackDistrict, setTrackDistrict] = useState(false)
  const [trackPincode, setTrackPincode] = useState(false)
  const [hasFilters, setHasFilters] = useState(false)
  const [filters, setFilters] = useState({
    vaccine: '',
    fee: '',
    dose: '',
    age: ''
  })

  const districtBtnHandler = () => {
    clearPincode()
    clearFilters()
    if(!districtSearch) clearDistrict()
    if(pincodeSearch) {
      setPincodeSearch(false)
      setDistrictSearch(true)
    } else {
      setDistrictSearch(!districtSearch)
    }
  }

  const pincodeBtnHandler = () => {
    clearDistrict()
    clearFilters()
    if(!pincodeSearch) clearPincode()
    if(districtSearch) {
      setDistrictSearch(false)
      setPincodeSearch(true)
    } else {
      setPincodeSearch(!pincodeSearch)
    }
  }

  const clearPincode = () => {
    setSessions([])
    setTrackPincode(false)
    setHasChanged(true)
    setPincode('')
  }

  const clearDistrict = () => {
    setSessions([])
    setTrackDistrict(false)
    setHasChanged(true)
    setDistrictName('')
  }

  const clearFilters = () => {
    setFilters({
      vaccine: '',
      fee: '',
      dose: '',
      age: ''
    })
  }

  const updateFilters = (event) => {
    setHasFilters(true)
    if(trackDistrict) clearDistrict()
    if(trackPincode) clearPincode()
    setFilters({
      ...filters,
      [event.target.name]: event.target.selectedOptions[0].value
    })
  }

  return (
    <div>
      <Navbar />
      <div class="is-flex is-justify-content-center">
        <div class="column is-8">
          <div class="buttons is-flex is-justify-content-center">
            <button class={`button my-3 mx-3 is-medium ${districtSearch ? 'is-link' : ''}`} onClick={districtBtnHandler}>Search By Districts</button>
            <button class={`button my-3 mx-3 is-medium ${pincodeSearch ? 'is-link' : ''}`} onClick={pincodeBtnHandler}>Search By Pincode</button>
          </div>
          <OnboardingMessage 
          districtSearch={districtSearch}
          pincodeSearch={pincodeSearch}
          />
          <TrackByDistrict 
          stateId={stateId}
          setStateId={setStateId}
          districtId={districtId}
          setDistrictId={setDistrictId}
          setDistrictName={setDistrictName}
          states={states}
          setStates={setStates}
          districts={districts}
          setDistricts={setDistricts}
          trackDistrict={trackDistrict}
          setTrackDistrict={setTrackDistrict}
          setSessions={setSessions}
          hasChanged={hasChanged}
          setHasChanged={setHasChanged}
          filters={filters}
          updateFilters={updateFilters}
          hasFilters={hasFilters}
          clearDistrict={clearDistrict}
          districtSearch={districtSearch}
          length={sessions.length}
          />
          <TrackByPincode 
          pincode={pincode}
          setPincode={setPincode}
          trackPincode={trackPincode}
          setTrackPincode={setTrackPincode}
          setSessions={setSessions}
          hasChanged={hasChanged}
          setHasChanged={setHasChanged}
          filters={filters}
          updateFilters={updateFilters}
          hasFilters={hasFilters}
          clearPincode={clearPincode}
          pincodeSearch={pincodeSearch}
          length={sessions.length}
          />
          <Status 
          pincode={pincode}
          districtName={districtName}
          filters={filters}
          districtSearch={districtSearch}
          pincodeSearch={pincodeSearch}
          trackPincode={trackPincode}
          trackDistrict={trackDistrict}
          />
          <Message
          trackDistrict={trackDistrict}
          trackPincode={trackPincode}
          districtSearch={districtSearch}
          pincodeSearch={pincodeSearch}
          />
          <Card 
          sessions={sessions}
          />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App;
