import React from 'react';
import ListItem from './ListItem.js';
import { nanoid } from 'nanoid';
import Draggable from 'react-draggable';

export default function Meme() {

    const [memeStash, setMemeStash] = React.useState([])

    const [meme, setMeme] = React.useState({
        currentText: [
            { id: 0, text: "shut up", default: { x: 258, y: 37 }, textEnlarge: true },
            { id: 1, text: "and take my money", default: { x: 170, y: 329 }, textEnlarge: true }
        ],
        randomImage: "https://i.imgflip.com/3si4.jpg",
        textInput: "",
        hasWhiteSpace: false
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
        if (value) {
            setMeme(prevMeme => {
                return {
                    ...prevMeme,
                    currentText: [...prevMeme.currentText, { id: nanoid(), text: value, textEnlarge: true }],
                    textInput: "",
                }
            })
        }
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

    function handleDelete(id) {
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                currentText: prevMeme.currentText.filter(text => text.id !== id)
            }
        })
    }

    function handleResize(id) {
        setMeme(prevMeme => {
            let newState = { ...prevMeme }
            for (let i = 0; i < newState.currentText.length; i++) {
                if (newState.currentText[i].id === id) {
                    newState.currentText[i].textEnlarge = !newState.currentText[i].textEnlarge
                }
            }
            return newState;
        })
    }

    function includeWhiteSpace() {
        setMeme(prevMeme => {
            return ({
                ...prevMeme,
                hasWhiteSpace: !prevMeme.hasWhiteSpace
            })
        })
    }

    const textElements = meme.currentText.map(text => {
        let defaultX = 0;
        let defaultY = 0;

        if (text.default) {
            defaultX = text.default.x;
            defaultY = text.default.y;
        }

        return (
            <Draggable key={text.id} bounds="parent" defaultPosition={{ x: defaultX, y: defaultY }}>
                <h2 className={`meme--text ${text.textEnlarge ? "enlarge" : ""}`} key={text.id} id={text.id}>{text.text}</h2>
            </Draggable>
        )
    })

    const listElements = meme.currentText.map(text => {
        return <ListItem
            key={text.id}
            id={text.id}
            text={text.text}
            handleDelete={handleDelete}
            handleResize={handleResize}
            isLarge={text.textEnlarge}
            includeWhiteSpace={includeWhiteSpace}
        />
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
                        <button className="meme--btn" onClick={handleAdd}>Add Text</button>
                    </div>
                    <div className="meme--options">
                        <label forHTML="meme--upload" className="meme--btn">
                            <input type="file" accept="image/png, image/jpeg" id="meme--upload" className="meme--upload" />
                            Upload Image
                        </label>
                        <p className="meme--options-text">or</p>
                        <button className="meme--btn new-image" onClick={getNewMeme}>Get New Image</button>
                    </div>
                </form>
                <div className="meme--active-text">
                    <h2 className="current-text-heading">Current Text:</h2>
                    <ul className="meme--text-list">
                        {listElements}
                    </ul>
                </div>
            </div>
            <div className="meme--right">
                {meme.hasWhiteSpace && <div className="meme--whitespace"></div>}
                <img src={meme['randomImage']} alt="Meme Template" className="meme--template" />
                {textElements}
            </div>
        </div>
    )
}