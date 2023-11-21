import WishlistMovieTitle from "./WishlistMovieTitle";
const Wishlist_item = ({ getWishListName }) => {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <div className="wishlist__item">
        <div className="wishlist__name">{getWishListName()}</div>

        <div className="wishlist__name--list">
          <WishlistMovieTitle>Avengers</WishlistMovieTitle>
          <WishlistMovieTitle>Green Lantern</WishlistMovieTitle>
        </div>
      </div>
    </>
  );
};

export default Wishlist_item;
