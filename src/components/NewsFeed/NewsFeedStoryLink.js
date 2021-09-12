import React from 'react';

import { formatNewsFeedDisplayDate } from '../../lib/utils';

export default function NewsFeedStoryLink({ id, datetime, url, image, headline }) {
  const { hostname } = new URL(url);
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img src={image} alt={headline} />
      <span>
        <span>{hostname}</span>
        <span>{formatNewsFeedDisplayDate(datetime)}</span>
        <p>{headline}</p>
      </span>
    </a>
  );
}
