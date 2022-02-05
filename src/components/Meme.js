import React from 'react';

export default function Meme() {

    const [memeStash, setMemeStash] = React.useState([])

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/30b1gx.jpg"
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

    React.useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setMemeStash(data.data.memes))
    }, [])

    return (
        <div>
            <form className="meme--form">
                <div className="meme--text-inputs">
                    <input type="text" className="meme--text-input" placeholder="Top Text" />
                    <input type="text" className="meme--text-input" placeholder="Bottom Text" />
                </div>
                <button className="meme--new-meme-btn" onClick={getNewMeme}>Get New Image 🖼</button>
            </form>
            <div className="meme--meme-block">
                <img src={meme['randomImage']} alt="Meme Template" className="meme--template" />
            </div>
        </div>
    )
}