import React from 'react';
import './CompanyProfile.css';

const MAX_PEERS_TO_DISPLAY = 5;

export default function CompanyProfile({
  peersData,
  profileData,
  handleClickPeer,
  currentQuery,
}) {
  return (
    <div className="profile-card">
      <div className="header-row">
        <div className="logo-container">
          <img
            src={
              profileData.logo ||
              'https://i.picsum.photos/id/1066/200/300.jpg?grayscale&hmac=pSSGt2h1SlC4IxWLhS3E5cs8360xRF8HrOtJYITZM-I'
            }
            alt={profileData.name}
          />
        </div>
        <span>{profileData.name}</span>
        <span>{profileData.ticker}</span>
      </div>

      <div className="contact-row">
        <a href={profileData.weburl} target="_blank" rel="noreferrer">
          {profileData.weburl}
        </a>
        <a href={`tel:${profileData.phone}`}>{profileData.phone}</a>
      </div>

      <div className="info-row">
        <div>
          <div>marketcap</div>
          <div>shares outstanding</div>
          <div>industry</div>
        </div>
        <div>
          <div>{profileData.marketCapitalization || '---'}</div>
          <div>{profileData.shareOutstanding || '---'}</div>
          <div>{profileData.finnhubIndustry || '---'}</div>
        </div>
      </div>

      <div className="peers-row">
        <span>peers</span>
        <>
          {peersData
            .filter((ticker) => ticker !== currentQuery)
            .slice(1, MAX_PEERS_TO_DISPLAY)
            .map((ticker, idx) => (
              <button key={idx} onClick={handleClickPeer} value={ticker}>
                {ticker}
              </button>
            ))}
        </>
      </div>
    </div>
  );
}
