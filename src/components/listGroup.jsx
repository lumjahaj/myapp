import React from 'react';

const ListGroup = props => {
    const { items, textProperty, valueProperty, onItemSelect } = props;

    return <ul class="list-group">
        {items.map(item =>
            <li
                onClick={() => onItemSelect(item)}
                key={item[valueProperty]}
                class="list-group-item"
            >
                {item[textProperty]}
            </li>)}
    </ul>;
}

export default ListGroup;