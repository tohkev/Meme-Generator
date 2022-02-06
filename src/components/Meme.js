import React from 'react';

export default function Meme() {

    const [memeStash, setMemeStash] = React.useState([])

    const [meme, setMeme] = React.useState({
        topText: "",
        randomImage: "https://i.imgflip.com/3si4.jpg"
    });

    function getNewMeme(event) {
        event.preventDefault();
        let memeIndex = Math.floor(Math.random() * 100);

        setMeme(prevMeme => {
            return {
                ...prevMeme,
                randomImage: memeStash[memeIndex].url
            }
        })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    React.useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setMemeStash(data.data.memes))
    }, [])

    return (
        <div className="meme--main">
            <div className="meme--left">
                <form className="meme--form">
                    <div className="meme--text-inputs">
                        <input
                            type="text"
                            className="meme--text-input"
                            placeholder="Add Text"
                            name="topText"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="meme--options">
                        <button className="meme--btn" onClick="#">Add Text</button>
                        <button className="meme--btn new-image" onClick={getNewMeme}>Get New Image</button>
                    </div>
                </form>
                <div className="meme--active-text">
                    <h2>Current Texts:</h2>
                    <ul className="meme--text-list">
                        <li className="meme--text-item">What</li>
                        <li className="meme--text-item">Huh</li>
                    </ul>
                </div>
            </div>
            <div className="meme--right">
                <img src={meme['randomImage']} alt="Meme Template" className="meme--template" />
                <h2 className="meme--text top" draggable>{meme.topText}</h2>
            </div>
        </div>
    )
}