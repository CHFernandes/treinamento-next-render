import Head from 'next/head'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../services/prismic'

import styles from './post.module.scss'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Post {
  slug: string
  title: string
  content: string
  updatedAt: string
}

export default function Post() {
  const [post, setPost] = useState({} as Post)

  const router = useRouter()
  const { slug } = router.query
  const parsedSlug = slug as string

  useEffect(() => {
    async function getPublications() {
      if (!parsedSlug) {
        return
      }

      const prismic = getPrismicClient()
      const response = await prismic.getByUID(
        'publication',
        String(parsedSlug),
        {}
      )

      if (!response) {
        return
      }

      const fetchedPost = {
        slug: parsedSlug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString(
          'pt-BR',
          {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }
        ),
      }
      setPost(fetchedPost)
    }

    getPublications()
  }, [parsedSlug])

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  )
}
