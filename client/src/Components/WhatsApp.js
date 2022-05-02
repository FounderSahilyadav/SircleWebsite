import React from 'react';
import whatsapp from "../assets/whatsapp_icon.png";

const WhatsApp = () => {
    return (
        <div className="whatsapp">
            <a href="https://wa.me/917673076073" target="_blank" rel="noopener noreferrer">
                <img className='whatsapp-icon' src={whatsapp} alt="whatsapp" /></a>
        </div>
    )
}

export default WhatsApp;