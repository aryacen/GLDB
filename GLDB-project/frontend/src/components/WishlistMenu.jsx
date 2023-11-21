import React from "react";

function WishListMenu(movie){


 return (
   <div>
      <button className = "wishlist_nav">MyWishlist</button>
      <button className = "wishlist_nav">AllWishLists</button>
      <button className = "wishlist_nav">SearchWishlist</button>
    </div>
  );
}

export default WishListMenu;
