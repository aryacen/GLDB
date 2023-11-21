import React from 'react';

const GenreCapsule = ({ genre, onClick }) => {
  return (
    <div className="genre-capsule" onClick={onClick}>
      {genre}
    </div>
  );
};

export default GenreCapsule;