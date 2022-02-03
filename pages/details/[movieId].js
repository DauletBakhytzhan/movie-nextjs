import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import classes from "../../styles/Home.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import Image from "next/image";
import { AUTH_KEY } from "../../utils/constants/api";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
export default function Details() {
  const router = useRouter();
  const movieId = router.query.movieId;
  const imageUrl = "https://image.tmdb.org/t/p/w500";
  const [details, setDetails] = React.useState();
  const [backdrops, setBackdrops] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [similars, setSimilars] = React.useState([]);

  const getData = (url) => {
    axios.get(url).then((res) => {
      const details = res.data;
      setDetails(details);
    });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${router.query.movieId}/similar?api_key=${AUTH_KEY}&language=ru&page=1`
      )
      .then((res) => {
        const similars = res.data.results;
        setSimilars(similars.slice(0, 6));
        setIsLoading(false);
      });
  };

  //https://api.themoviedb.org/3/movie/{movie_id}/similar/?api_key=<<api_key>>&language=en-US&page=1
  useEffect(() => {
    setIsLoading(true);
    if (!movieId) {
      return;
    }
    {
      const api =
        `https://api.themoviedb.org/3/movie/` +
        router.query.movieId +
        `?api_key=${AUTH_KEY}&language=ru`;
    }
    getData(api);
  }, [movieId]);

  return (
    <div>
      {" "}
      <NavBar />
      {!isLoading ? (
        <>
          <div
            className={styles.container + " d-flex flex-column"}
            style={{
              backgroundImage:
                "url(" +
                "https://image.tmdb.org/t/p/w1920_and_h600_multi_faces" +
                details.backdrop_path +
                ")",
              backgroundRepeat: "no-repeat"
            }}
          >
            <div >
              <div className={styles.wrapper + " d-flex m-50"}>
                <div className={`ml-20`}>
                  <h3>{details.title}</h3>
                  <p>{details.overview}</p>
                  <h4>{details.vote_average}</h4>
                  <h5>Год: {details.release_date.substring(0, 4)}</h5>
                  <h5>
                    {" "}
                    Жанры:
                    {details.genres.map(
                      (item, index) => " " + item.name + ", "
                    )}
                  </h5>
                  <h5>
                    {" "}
                    Производство:
                    {details.production_companies.map(
                      (item, index) => " " + item.name + ", "
                    )}
                  </h5>
                  <h5>Длительность: {details.runtime} мин</h5>
                </div>
              </div>
            </div>
            <div
              className={styles.slider + " d-flex "}
              style={{ marginTop: 50 }}
            >
              {similars.map((obj) => (
                <div key={obj.id} className={`m-40`}>
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + obj.poster_path}
                    width={150}
                    height={225}
                  />
                  <p className={styles.legend} style={{ color: "white", width: 150 }}>
                    <Link href={`/details/${obj.id}`}>
                      <h3>{obj.title}</h3>
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>загрузка</p>
      )}
    </div>
  );
}
