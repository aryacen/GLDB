import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TopSection from "../components/TopSection";
import { useParams } from "react-router-dom";
import ThumbnailList from "../components/ThumbnailList";
import { AuthContext } from "../context/AuthContext";

const BrowseGenre = () => {
    const { genreId } = useParams();
    console.log("received genreId:", genreId);
    const { dark } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const moviesPerPage = 24;

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:9000/api/movie/browse/${genreId}?page=${currentPage}&moviesPerPage=${moviesPerPage}`)
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [genreId, currentPage]);
    console.log(movie);

    const totalPages = 4;

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <>
            <TopSection />
            {loading ? (<div className="loading_container">
                <img
                    src={
                        dark
                            ? require("../assets/loading_gif_transparent.gif")
                            : require("../assets/loading_gif.gif")
                    }
                    className="loading-gif-img"
                />
            </div>) : (
                <>
                    <div className="thumbnailList">
                        <ThumbnailList movies={movie} />
                    </div>
                    <div>
                        <button
                            className="previous-button"
                            onClick={() =>
                                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                            }
                        >
                            Previous
                        </button>
                        {getPageNumbers().map((pageNumber) => (
                            <button
                                className="page-number-button"
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                style={{
                                    fontWeight: currentPage === pageNumber ? "bold" : "normal",
                                    color: currentPage === pageNumber ? dark ? "yellow" : "red" : "inherit"
                                }}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        <button
                            className="next-button"
                            onClick={() =>
                                setCurrentPage((prevPage) =>
                                    Math.min(prevPage + 1, totalPages)
                                )
                            }
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </>
    )
};

export default BrowseGenre;
