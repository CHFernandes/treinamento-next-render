import { GetStaticProps } from 'next'
import Head from 'next/head'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function getPosts() {
      const prismicClient = getPrismicClient()

      const response = await prismicClient.getAllByType('publication')

      const fetchedPosts = response.map(post => {
        return {
          slug: post.uid,
          title: RichText.asText(post.data.title),
          excerpt:
            post.data.content.find(
              (content: { type: string }) => content.type === 'paragraph'
            )?.text ?? '',
          updatedAt: new Date(post.last_publication_date).toLocaleDateString(
            'pt-BR',
            {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }
          ),
        } as Post
      })

      setPosts(fetchedPosts)
    }

    getPosts()
  }, [])

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} href={`posts/${post.slug}`}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
