import React from 'react';
import image from '../img/logo.png'

export default function Meme() {
    return (
        <div>
            <form className="meme--form">
                <div className="meme--text-inputs">
                    <input type="text" className="meme--text-input" placeholder="Top Text" />
                    <input type="text" className="meme--text-input" placeholder="Bottom Text" />
                </div>
                <button className="meme--new-meme-btn">Get New Image 🖼</button>
            </form>
            <div className="meme--meme-block">
                <img src={image} alt="Meme Template" className="meme--template" />
            </div>
        </div>
    )
}