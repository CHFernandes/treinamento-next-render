import { ActiveLink } from '../ActiveLink'

import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <nav>
          <ActiveLink activeClassName={styles.active} href='/'>
            <span>Home</span>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href='/posts'>
            <span>Posts</span>
          </ActiveLink>
        </nav>
      </div>
    </header>
  )
}
