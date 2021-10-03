import React from 'react'

function OnboardingMessage(props) {
    return (
       <div class={`columns is-centered my-5 ${props.districtSearch||props.pincodeSearch ? 'is-hidden' : ''}`}>
            <div class="column">
                <article class='message is-link'>
                    <div class="message-header">
                        <p>How it works</p>
                    </div>
                    <div class="message-body">
                        1. Select your desired method for tracking ( district / pincode ).
                        <br></br>
                        2. Enter details and click on track.
                        <br></br>
                        3. Sit back and relax. I'll notify you. Make sure to allow notifications.
                    </div>
                </article> 
            </div>
        </div>
    )
}

export default OnboardingMessage