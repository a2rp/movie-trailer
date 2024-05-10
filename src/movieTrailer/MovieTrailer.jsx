import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import movieTrailer from 'movie-trailer';
import ReactPlayer from "react-player";

const MovieTrailer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [trailerName, setTrailerName] = useState("");
    const [trailerURL, setTrailerURL] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            setTrailerURL("");
            const response = await movieTrailer(trailerName);
            console.log(response, "response");
            if (response == null) {
                toast.warn("Trailer not found");
            } else {
                setTrailerURL(response);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.heading}>Movie Trailer</div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <TextField
                        value={trailerName}
                        onChange={event => setTrailerName(event.target.value)}
                        label="Search trailer"
                        placeholder="trailer name"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        className={styles.submitButton}
                    >{isLoading
                        ? <CircularProgress sx={{ padding: "10px" }} />
                        : "Search trailer"}</Button>
                </form>

                <div className={styles.trailerContainer}>
                    <ReactPlayer url={trailerURL} controls={true} />
                </div>
            </div>
        </div>
    )
}

export default MovieTrailer

