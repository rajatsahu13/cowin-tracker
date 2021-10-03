import React from 'react'

function Message(props) {
    return (
       <div class={`columns is-centered my-5 ${((props.districtSearch || props.pincodeSearch) && (props.trackDistrict || props.trackPincode)) ? '' : 'is-hidden'}`}>
            <div class="column is-12">
                <div class="columns">
                    <div class="column">
                        <article class='message is-link'>
                            <div class="message-header">
                                <p>Tracking</p>
                            </div>
                            <div class="message-body">
                                Sit back and relax. I'll notify you. Make sure to allow notifications.
                            </div>
                        </article>
                    </div>
                    <div class="column">
                        <article class="message is-warning">
                            <div class="message-header">
                                <p>Stop alerts?</p>
                            </div>
                            <div class="message-body">
                                Have you booked your slot? Click on <strong>stop tracking</strong> to stop the alerts.
                            </div>
                        </article>  
                    </div>
                </div>   
            </div>
        </div>
    )
}

export default Message