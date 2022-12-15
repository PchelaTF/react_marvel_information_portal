import React from 'react';

const ComicsListItem = (item) => {
    console.log('RENDER ITEM');
    return (
        <li className="comics__item">
            <a href="#">
                <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                <div className="comics__item-name">{item.title}</div>
                <div className="comics__item-price">{item.price}</div>
            </a>
        </li>
    );
};

export default ComicsListItem;