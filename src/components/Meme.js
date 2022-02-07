import React from 'react';
import ListItem from './ListItem.js';
import { nanoid } from 'nanoid';

export default function Meme() {

    const [memeStash, setMemeStash] = React.useState([])

    const [meme, setMeme] = React.useState({
        currentText: [
            { id: 0, text: "shut up" },
            { id: 1, text: "and take my money" }
        ],
        randomImage: "https://i.imgflip.com/3si4.jpg",
        textInput: ""
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

    function handleAdd(event) {
        event.preventDefault();
        const { value } = document.getElementById('addText');
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                currentText: [...prevMeme.currentText, { id: nanoid(), text: value }],
                textInput: ""
            }
        })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value,
            }
        })
    }

    const textElements = meme.currentText.map(text => {
        return (<h2 className="meme--text" draggable>{text.text}</h2>)
    })

    const listElements = meme.currentText.map(text => {
        return <ListItem key={text.id} text={text.text} />
    })

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
                            name="textInput"
                            id="addText"
                            value={meme.textInput}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="meme--options">
                        <button className="meme--btn" onClick={handleAdd}>Add Text</button>
                        <button className="meme--btn new-image" onClick={getNewMeme}>Get New Image</button>
                    </div>
                </form>
                <div className="meme--active-text">
                    <h2>Current Text:</h2>
                    <ul className="meme--text-list">
                        {listElements}
                    </ul>
                </div>
            </div>
            <div className="meme--right">
                <img src={meme['randomImage']} alt="Meme Template" className="meme--template" />
                {textElements}
            </div>
        </div>
    )
}