import React, { useState } from "react";
import { FiFilm, FiPlay, FiSearch } from "react-icons/fi";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

const MovieTrailer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [trailerName, setTrailerName] = useState("");
    const [trailerURL, setTrailerURL] = useState("");
    const publicUrl = process.env.PUBLIC_URL || "";

    const handleSubmit = async (event) => {
        event.preventDefault();
        const cleanName = trailerName.trim();
        if (cleanName.length < 2) {
            toast.warn("Enter a movie title first.");
            return;
        }
        setIsLoading(true);
        setTrailerURL("");
        try {
            const response = await movieTrailer(cleanName);
            if (response) {
                setTrailerURL(response);
            } else {
                toast.warn("Trailer not found. Try another title.");
            }
        } catch {
            toast.error("Unable to find a trailer right now.");
        } finally {
            setIsLoading(false);
        }
    };

    return <section className={styles.container}>
        <div className={styles.main}>
            <div className={styles.hero} style={{ backgroundImage: `url(${publicUrl}/trailer-backdrop.jpg)` }}><div className={styles.overlay}></div><div className={styles.heroContent}><span className={styles.eyebrow}>TRAILER DISCOVERY</span><h1>Press play on your next favourite.</h1><p>Search a movie title and let the trailer finder bring the video into a focused, responsive player.</p><div className={styles.heroNote}><FiFilm /> YouTube trailer lookup</div></div></div>
            <div className={styles.searchPanel}><div className={styles.panelHeading}><FiSearch /><div><h2>Find a trailer</h2><p>Use a movie title, then explore the result below.</p></div></div><form onSubmit={handleSubmit} className={styles.form}><label className={styles.searchField} htmlFor="trailerName"><FiSearch /><input id="trailerName" value={trailerName} onChange={(event) => setTrailerName(event.target.value)} placeholder="Search movie title" required /></label><button type="submit" disabled={isLoading} className={styles.submitButton}>{isLoading ? <span className={styles.spinner} aria-label="Searching" /> : <><FiPlay /> Search trailer</>}</button></form></div>
            <div id="player" className={styles.playerSection}><div className={styles.sectionHeading}><span className={styles.eyebrow}>PLAYER</span><h2>{trailerURL ? `Now showing: ${trailerName}` : "Your trailer will appear here"}</h2><p>{trailerURL ? "Use the player controls to watch the result." : "Search for a title to load its trailer."}</p></div><div className={styles.playerFrame}>{trailerURL ? <ReactPlayer url={trailerURL} controls width="100%" height="100%" /> : <div className={styles.emptyPlayer}><FiPlay /><span>Nothing playing yet</span></div>}</div></div>
        </div>
    </section>;
};

export default MovieTrailer;