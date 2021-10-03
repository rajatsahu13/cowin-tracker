import React from 'react'

function Status(props) {
    return (
        <div class={`columns is-centered my-3 ${props.districtSearch||props.pincodeSearch ? '' : 'is-hidden'}`}>
            <div class="column">
            <article class="message is-dark">
                <div class="message-header">
                    <p class="is-size-5 has-text-weight-bold">Status</p>
                </div>
                <div class="message-body">
                <h6 class="is-size-6">Tracking Pincode: {props.trackPincode ? `${props.pincode}` : ''}</h6>
                <h6 class="is-size-6">Tracking District: {props.trackDistrict ? `${props.districtName}` : ''}</h6>
                <h6 class="is-size-6">Preferred Vaccine: {props.filters.vaccine === "" ? "Any Vaccine" : `${props.filters.vaccine}` }</h6>
                <h6 class="is-size-6">Preferred Fee Type: {props.filters.fee === "" ? "Any Fee" : `${props.filters.fee}` }</h6>
                <h6 class="is-size-6">Dose: {props.filters.dose === "" ? "Any Dose" : `${(props.filters.dose).replace('dose', 'Dose ')}` }</h6>
                <h6 class="is-size-6">Age: {props.filters.age === "" ? "Any Age" : `${(props.filters.age)}+` }</h6>
                </div>
            </article>
            </div>
        </div>
    )
}

export default Status