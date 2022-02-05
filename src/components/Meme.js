import React from 'react';

export default function Meme() {

    const [memeStash, setMemeStash] = React.useState([])

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
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
        <div>
            <form className="meme--form">
                <div className="meme--text-inputs">
                    <input
                        type="text"
                        className="meme--text-input"
                        placeholder="Top Text"
                        name="topText"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="meme--text-input"
                        placeholder="Bottom Text"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </div>
                <button className="meme--new-meme-btn" onClick={getNewMeme}>Get New Image 🖼</button>
            </form>
            <div className="meme--meme-block">
                <img src={meme['randomImage']} alt="Meme Template" className="meme--template" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </div>
    )
}