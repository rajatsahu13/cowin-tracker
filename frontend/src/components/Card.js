import React from 'react'

function Card(props) {
  return (
    <div class="columns is-centered my-5"> 
      <div class="column"> 
        <div class="columns is-flex-wrap-wrap">
          {
            props.sessions.map((session,i) => (
              <div class="column is-4 is-full-touch" key={i}>
                <article class="message is-success card-result">
                  <div class="message-header">
                    <p class="is-size-5 has-text-weight-bold">Slot Available!</p>
                  </div>
                  <div class="message-body">
                    <h6 class="is-size-6">Name: {session.name}</h6>
                    <h6 class="is-size-6">Pincode: {session.pincode}</h6>
                    <h6 class="is-size-6">Age Group: {session.min_age_limit}+</h6>
                    <h6 class="is-size-6">Fee Type: {session.fee_type}</h6>
                    <h6 class="is-size-6">Slots:</h6>
                    <div class="pl-3">
                      <h6 class="is-size-6">Date: {session.date}</h6>
                      <h6 class="is-size-6">Total Available Slots: {session.available_capacity}</h6>
                      <h6 class="is-size-6">Dose 1 Slots: {session.available_capacity_dose1}</h6>
                      <h6 class="is-size-6">Dose 2 Slots: {session.available_capacity_dose2}</h6>
                    </div>
                    <h6 class="is-size-6">Vaccine: {session.vaccine}</h6>
                  </div>
                </article>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Card