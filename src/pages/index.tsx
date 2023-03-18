import Head from 'next/head'
import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>NextJS</span> world.
          </h1>
          <p>
            Get Access to all the publications <br />
            <span>in the menu above</span>
          </p>
        </section>
      </main>
    </>
  )
}
