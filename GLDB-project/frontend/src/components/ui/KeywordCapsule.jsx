import React from 'react';

const KeywordCapsule = ({ keyword, onClick }) => {
  return (
    <div className="keyword-capsule" onClick={onClick}>
      {keyword}
    </div>
  );
};

export default KeywordCapsule;