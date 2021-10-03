import React from 'react'

function Footer() {
    return (
        <footer class="pt-5 is-flex is-justify-content-space-between">
            <a class="is-white has-text-dark" href="https://github.com/rajatsahu13/cowin-tracker" target="_blank" rel="noreferrer">
                <span class="icon">
                <i class="fab fa-github"></i>
                </span>
                <span>GitHub</span>
            </a>
            <div class="is-flex is-flex-direction-column is-align-items-end">
                <p class="is-size-6">Say Hi!</p>
                <a href="mailto:rajatsahu13@gmail.com">rajatsahu13@gmail.com</a>
            </div>
        </footer>
    )
}

export default Footer