import React from 'react';
import logo from '../img/logo.png';

export default function Header() {
    return (
        <header className="header--block">
            <img
                src={logo}
                alt="Shiba"
                className="header--logo"
            />
            <h1 className="header--title">Meme Generator</h1>
        </header>
    )
}