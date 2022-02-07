import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

export default function ListItem(props) {
    return (
        <li className="meme--text-item">
            <h4 className="meme--item">{props.text}</h4>
            <div className="meme--icons">
                <FontAwesomeIcon icon={faExpand} />
                <FontAwesomeIcon icon={faCompress} />
                <FontAwesomeIcon icon={faTrash} onClick={() => {
                    props.handleDelete(props.id)
                }} />
            </div>
        </li>
    )
}