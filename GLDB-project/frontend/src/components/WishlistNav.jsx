import WishlistNavButton from "./ui/WishlistNavButton";
import MyWishList from "./MyWishList";
const WishlistNav = () => {
  return (
    <>
      <div className="wishlist__container">
        <div className="wishlist__buttons">
          <WishlistNavButton>My WishList</WishlistNavButton>
          <WishlistNavButton>Search Wishlist</WishlistNavButton>
          <WishlistNavButton>All Wishlist</WishlistNavButton>
        </div>

        <MyWishList myUserId={"64187d8e3ff84affd87fd799"}></MyWishList>
      </div>
    </>
  );
};

export default WishlistNav;
