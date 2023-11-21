import React from "react";

function WishListBar(movie){


 return (
   <div className = "wishlist__MovieBar">
      {movie}
      <button className="wishlist__RemoveMovie">X</button>
    </div>
  );
}

export default WishListBar;
