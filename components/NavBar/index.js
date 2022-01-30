import styles from "./NavBar.module.scss";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.navbar__item}>
        <a>
          <div className={styles.navbar__text}>Home</div>
        </a>
      </Link>
    </div>
  );
};

export default NavBar;
