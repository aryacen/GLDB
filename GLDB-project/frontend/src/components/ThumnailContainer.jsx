import React from 'react';
import DetailPoster from './DetailPoster';
import { Link } from 'react-router-dom'

const Thumbnail = ({ tmdb_id, title, link }) => {
  return (
    <div className="thumbnail-container">
      <Link to={link}>
        <DetailPoster tmdb_id = {tmdb_id}/>
        <h3>{title}</h3>
      </Link>
    </div>
  );
};

export default Thumbnail;