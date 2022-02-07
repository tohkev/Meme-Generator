import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faExpand, faCompress, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';

export default function ListItem(props) {
    return (
        <li className="meme--text-item">
            <h4 className="meme--item">{props.text}</h4>
            <div className="meme--icons">
                <FontAwesomeIcon icon={faLevelUpAlt} title="Add Whitespace" />
                <FontAwesomeIcon icon={props.isLarge ? faCompress : faExpand} title={`${props.isLarge ? "Compress" : "Expand"} Text`} onClick={() => {
                    props.handleResize(props.id)
                }} />
                <FontAwesomeIcon icon={faTrash} title="Delete Text" onClick={() => {
                    props.handleDelete(props.id)
                }} />
            </div>
        </li>
    )
}