import React from 'react';

import { formatNewsFeedDisplayDate } from '../../lib/utils';

export default function NewsFeedStoryLink({ id, datetime, url, image, headline }) {
  const { hostname } = new URL(url);
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img src={image || 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'} alt={headline} />
      <span>
        <span className="article-source">{hostname}</span>
        <span>{formatNewsFeedDisplayDate(datetime)}</span>
        <p>{headline}</p>
      </span>
    </a>
  );
}
