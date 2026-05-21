import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="StartupConnect Logo" className="w-8 h-8 object-contain" />
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>StartupConnect</span>
            <span className={styles.logoSubtitle}>Ethiopia</span>
          </div>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.activeLink}>Home</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/startups" className={styles.link}>Browse Startups</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </nav>
        
        <div className={styles.actions}>
          <Link href="/login" className={styles.loginBtn}>Login</Link>
          <Link href="/register" className={styles.registerBtn}>Register</Link>
        </div>
      </div>
    </header>
  );
}
