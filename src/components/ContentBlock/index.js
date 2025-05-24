import React from 'react';
import { Link } from 'react-router-dom';
import './content-block.css';

const ContentBlock = ({ title, items, linkTo, renderItem }) => {
    return (
        <section className="content-block">
            <div className="content-header">
                <h2 className="content-title">{title}</h2>
            </div>
            <div className="content-grid">
                {items.map((item) => renderItem(item))}
            </div>
            <div className="content-footer">
                <Link to={linkTo} className="btn-ver-mais">
                    Ver mais
                </Link>
            </div>
        </section>
    );
};

export default ContentBlock; 