import React from "react";
import { useEffect } from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
export default function Card({ id, title, imageUrl, desc, raiting, release_date }) {
  const imageSrc = `https://image.tmdb.org/t/p/w500/` + imageUrl;
  const [image, setImage] = React.useState(imageSrc);

  const [isLoading, setIsLoading] = React.useState(true);
    const mt = "m-50"
  useEffect(() => {
    setIsLoading(true);
  }, [setImage]);

  return (
    <div className={styles.wrapper}>
      <div  className={styles.block + " m-50"  }>
        <Image
          src={image}
          alt="Picture of the author"
          height={300}
          width={200}
        />
        <div className="ml-20">
          <Link href={`/details/${id}`}>
            <a>
              <h3>{title}</h3>
            </a>
          </Link>
          <p>{desc}</p>

          <h5>год: {release_date.substring(0,4)}</h5>
          
        </div>
      </div>
    </div>
  );
}
