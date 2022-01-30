import React from "react";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import NavBar from "../components/NavBar";
import Card from "../components/NavBar/Card";
import Link from "next/link";
export default function Home() {
  const [image, setImage] = React.useState();
  const [movie, setMovie] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);
  let page = 1
  const api = `https://api.themoviedb.org/3/trending/movie/week?api_key=eefa0923cec6b75871cb4213f93fdd34&language=ru&page=`;
  const getData = (url) => {
    axios.get(url).then((res) => {
      const allMovies = res.data.results;
      setMovie(oldMovies => [...oldMovies, ...allMovies]);
      setIsLoading(false);
    });
  };
  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      page = page +1 
      getData(api+page)
      console.log(page)
    }
  };
  useEffect(() => {
    setIsLoading(true);
    console.log(api + page)
    getData(api + page);
    window.addEventListener("scroll", handleScroll);
  }, [setMovie]);

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        {!isLoading ? (
         
          movie.map((obj) => (
           
            <Card 
              key={obj.id}
              id = {obj.id}
              title={obj.title}
              imageUrl={obj.poster_path}
              desc={obj.overview}
              raiting={obj.vote_average}
              release_date={obj.release_date}
            />
        
          ))
        ) : (
          <p>загрузка</p>
        )}
      </div>
    </div>
  );
}
