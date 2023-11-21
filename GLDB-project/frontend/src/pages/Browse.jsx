import React, { useState, useEffect } from "react";
import TopSection from "../components/TopSection";
import { Link } from "react-router-dom";


const Browse = () => {
    const [backgroundImages, setBackgroundImages] = useState({});
    const genreList = [{ id: 27, name: 'Horror', }, { id: 12, name: 'Adventure', }, { id: 14, name: 'Fantasy' }, { id: 28, name: 'Action' }, { id: 80, name: 'Crime' }, { id: 53, name: 'Thriller' }, { id: 35, name: 'Comedy' }, { id: 10749, name: 'Romance' }, { id: 16, name: 'Animation' }, { id: 10751, name: 'Family' }, { id: 878, name: 'Sci-Fi' }, { id: 37, name: 'Western' }];
    useEffect(() => {
        genreList.forEach(async (genre) => {
            const imageModule = await import(`../assets/${genre.id}-browse.png`);
            setBackgroundImages((prevImages) => ({
                ...prevImages,
                [genre.id]: imageModule.default,
            }));
        });
    }, []);

    const contentDiv = (
        <div className="genre-list-wrapper">
            {genreList.map((genre) => {
                const link = `/browse/${genre.id}`;
                const backgroundImage = `url(${backgroundImages[genre.id]})`;
                return (
                    <div className="genre-list_container" key={genre.id}>
                        <Link to={link}>
                            <div className="genre-list-element" style={{ backgroundImage: backgroundImage }}>
                                <div className="genre-list-child">
                                    <h1>{genre.name}</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    )
    return (
        <>
            <TopSection />
            {contentDiv}
        </>

    )
};

export default Browse;