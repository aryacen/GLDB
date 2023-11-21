import React from 'react';

const CastCapsule = ({ cast, onClick }) => {
  return (
    <div className="cast-container" onClick={onClick}>
      <div className="cast-character">{cast.name}<p>as</p></div>
      <div className="cast-name">{cast.character}</div>
    </div>
  );
};

export default CastCapsule;