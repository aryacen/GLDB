import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Search = () => {
  const [searchData, setSearchData] = useState({});
  const navigate = useNavigate();
  let link = "";
  const handleChange = (event) => {
    setSearchData({
      ...searchData,
      [event.target.name]: [event.target.value],
    });
  };
  if (searchData.search_query == null) {
    link = `/`;
  } else {
    link = `/search/${searchData.search_query}`;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(link);
  };

  return (
    <>
      <div className="search__container">
        <form className="search__bar--wrapper" action="" onSubmit={handleSubmit}>
          {" "}
          <input
            className="search__bar"
            type="text"
            name="search_query"
            onChange={handleChange}
          ></input>
          <Link to={link}>
            <img src={require("../assets/search_icon.png")}
              alt="search icon"
              className="search_icon"></img>
          </Link>
        </form>
      </div>
      <div className="browse-by_container">
        <Link to='/browse'>
          <img src={require("../assets/browse_icon_dark.png")}
            alt="browse icon"
            className="browse_icon" />
            <p>Browse by genre</p>
        </Link>
      </div>
    </>
  );
};

export default Search;
