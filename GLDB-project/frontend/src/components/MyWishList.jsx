import Wishlist_item from "./ui/Wishlist_item";
import React, { useEffect } from "react";
import axios from "axios";

const MyWishList = ({ myUserId }) => {
  function getWishlists() {
    let url_string = "http://localhost:9000/api/wishlist/all/";
    console.log("hello");
    console.log(url_string);

    axios
      .get(url_string)
      .then((response) => {
        console.log("list read");
      })
      .catch((error) => {
        console.error("Error retrieving list:", error);
      });
  }

  useEffect(() => {
    getWishlists();
  }, []);

  function getWishListName() {
    return "James's Wishlist";
  }
  return (
    <>
      <div className="wishlist__item--container">
        <Wishlist_item getWishListName={getWishListName} />
      </div>
    </>
  );
};

export default MyWishList;
