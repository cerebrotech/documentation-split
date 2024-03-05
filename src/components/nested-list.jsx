import React from 'react';

const RenderItem = ({ item, basePath }) => {
    const type = item.type ? item.type : "page";
    const title = item.title ?  item.title : item.slug;
    const path = `${basePath}/${item.slug}`;

    if (type === 'page') {
        return <li><a href={path}>{title}</a></li>;
    } else if (type === 'section') {
        return (
            <li>
                <a href={path}>{title}</a>
                <NestedList content={item.content} basePath={path} />
            </li>
        );
    }
    return null;
};

const NestedList = ({ content, basePath = '.' }) => {
    return (
        <ul>
            {content.map((item, index) => (
            <RenderItem key={index} item={item} basePath={basePath} />
            ))}
        </ul>
    );
};

export default NestedList;