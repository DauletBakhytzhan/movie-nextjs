import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import classes from "../../styles/Home.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import Image from "next/image";
export default function Details() {
  const router = useRouter();
  const movieId = router.query.movieId;
  const imageUrl = "https://image.tmdb.org/t/p/w500";
  const [details, setDetails] = React.useState();
  const [backdrops, setBackdrops] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const getData = (url) => {
    axios.get(url).then((res) => {
      const details = res.data;
      setDetails(details);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (!movieId) {
      return;
    }
    {
      const api =
        `https://api.themoviedb.org/3/movie/` +
        router.query.movieId +
        `?api_key=eefa0923cec6b75871cb4213f93fdd34&language=ru`;
    }
    getData(api);
  }, [movieId]);

  return (
    <div>
      {" "}
      <NavBar />
      {!isLoading ? (
        <div className={styles.container + " d-flex flex-column"}>
          <Image
            className={styles.block}
            src={"https://image.tmdb.org/t/p/original" + details.backdrop_path}
            alt="Picture of the author"
            height={600}
            width={1040}
          />
          <div className={styles.wrapper + " d-flex m-50"}>
            <div className="ml-20">
              <h3>{details.title}</h3>
              <p>{details.overview}</p>
              <h4>{details.vote_average}</h4>
              <h5>Год: {details.release_date.substring(0, 4)}</h5>
              <h5> Жанры: 
              {details.genres.map((item, index)=> (" " + item.name + ", "))}
              </h5>
              <h5> Производство: 
              {details.production_companies.map((item, index)=> (" " + item.name + ", "))}
              </h5>
              <h5>Длительность: {details.runtime} мин</h5>
            </div>
          </div>
        </div>
      ) : (
        <p>загрузка</p>
      )}
    </div>
  );
}
