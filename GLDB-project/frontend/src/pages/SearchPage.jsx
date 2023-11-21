import React from "react";
import TopSection from "../components/TopSection";
import ThumbnailList from "../components/ThumbnailList";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SearchPage = () => {
  const location = useLocation();
  const userPrompt = location.pathname.split("/")[2];
  const prompt = userPrompt.replace(/%20/g, " ");

  const { data, loading, error } = useFetch(
      `http://localhost:9000/api/search/${prompt}`
  );
  console.log(data)
  return (
    <>
      <TopSection />
      <div className="thumbnailList">
        {loading ? (<span>Searching</span>) : (<ThumbnailList movies={data} />)}
      </div>
    </>
  );
};

export default SearchPage;
