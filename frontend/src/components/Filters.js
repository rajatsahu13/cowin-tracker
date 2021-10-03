import React from 'react'

function Filters(props) {
  return (
    <div class="columns is-centered my-3" id="filters">
      <div class="field is-flex-mobile is-justify-content-center">
        <div class="control mx-3 my-2">
          <div class="select">
            <select name="vaccine" value={props.filters.vaccine} onChange={props.updateFilters}>
              <option value="">Any Vaccine</option>
              <option value="COVAXIN">Covaxin</option>
              <option value="COVISHIELD">Covishield</option>
              <option value="SPUTNIK V">Sputnik V</option>
            </select>
          </div>
        </div>
      </div>  
      <div class="field is-flex-mobile is-justify-content-center">
        <div class="control mx-3 my-2">
          <div class="select">
            <select name="fee" value={props.filters.fee} onChange={props.updateFilters}>
              <option value="">Any Fees</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field is-flex-mobile is-justify-content-center">
        <div class="control mx-3 my-2">
          <div class="select">
            <select name="dose" value={props.filters.dose} onChange={props.updateFilters}>
              <option value="">Any Dose</option>
              <option value="dose1">Dose 1</option>
              <option value="dose2">Dose 2</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field is-flex-mobile is-justify-content-center">
        <div class="control mx-3 my-2">
          <div class="select">
            <select name="age" value={props.filters.age} onChange={props.updateFilters}>
              <option value="">Any Age</option>
              <option value="18">18+</option>
              <option value="45">45+</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters