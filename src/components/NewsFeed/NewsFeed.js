import React from 'react';

import './NewsFeed.css';

import NewsFeedStoryLink from './NewsFeedStoryLink';

const MAX_NEWS_STORIES_TO_DISPLAY = 5;

export default function NewsFeed({ data }) {
  if (Object.keys(data).length) {
    return (
      <div className="news-feed">
        <div>News</div>
        <div>----------</div>
        <ul>
          {data.slice(0, MAX_NEWS_STORIES_TO_DISPLAY).map((story) => (
            <li key={story.id}>
              <NewsFeedStoryLink {...story} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}
