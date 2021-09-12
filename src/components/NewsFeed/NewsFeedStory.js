import React from 'react';

import { formatNewsFeedDisplayDate } from '../../lib/utils';

export default function NewsFeedStory({ id, datetime, url, image, headline }) {
  const { hostname } = new URL(url);
  return (
    <li id={id}>
      <a href={url} target="_blank" rel="noreferrer">
        <img src={image} alt={headline} />

        <span>
          <span>{hostname}</span>
          <span>{formatNewsFeedDisplayDate(datetime)}</span>
          <p>{headline}</p>
        </span>
      </a>
    </li>
  );
};
