import Link from "next/link";
import styles from "./Navigation.styles";

const Header = () => (
  <div css={styles} id="nav">
    <div className="nav-container">
      <div className="nav">
        <div className="logo">
          <img src="/tonic-logo.png" alt="Tonic Inc logo" />
        </div>
        <div className="nav-links">
          <Link href="/team">
            <a className="nav-link">Your Team</a>
          </Link>
          <Link href="/wheel">
            <a className="nav-link">Spin the Wheel</a>
          </Link>
          <Link href="https://hellotonic.com/">
            <a className="nav-link" target="_blank" rel="noopener noreferrer">
              Tonic
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
