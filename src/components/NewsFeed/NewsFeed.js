import React from 'react';

import './NewsFeed.css';

import NewsFeedStory from './NewsFeedStory';

const NUMBER_NEWS_STORIES_TO_DISPLAY = 5;

export default function NewsFeed({ data }) {
  return (
    <div>
      <div>News</div>
      <div>----------</div>
      <ul>
        {data.slice(0, NUMBER_NEWS_STORIES_TO_DISPLAY).map((story) => (
          <NewsFeedStory {...story} />
        ))}
      </ul>
    </div>
  );
};
