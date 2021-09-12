import React from 'react';
import './CompanyProfile.css';

export default function CompanyProfile({ data }) {
  return (
    <div className="profile-card">
      <div className="header-row">
        <img src={data.logo} alt={data.name} />
        <span>{data.name}</span>
        <span>{data.ticker}</span>
      </div>

      <div className="contact-row">
        <a href={data.weburl} target="_blank" rel="noreferrer">
          {data.weburl}
        </a>
        <a href={`tel:${data.phone}`}>{data.phone}</a>
      </div>

      <div className="info-row">
        <div>
          <p>marketcap</p>
          <p>shares outstanding</p>
          <p>industry</p>
        </div>
        <div>
          <p>{data.marketCapitalization}</p>
          <p>{data.shareOutstanding}</p>
          <p>{data.finnhubIndustry}</p>
        </div>
      </div>
    </div>
  );
}
