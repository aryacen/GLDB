import React from "react";

import {useEffect, useState, useRef} from 'react';
import WishListBar from "./WishlistBar";
function WishListCon(wishlist){


 return (
   <div className="wishlist__Container">
      <div className="wishlist__Name">{wishlist.wishlsName}</div>
      <button className="wishlist__Remove">remove</button>
      <div>{wishlist.wishlist.map(movie => <div key={movie}>{WishListBar(movie)}</div>)}</div>
    </div>
  );
}

export default WishListCon;
