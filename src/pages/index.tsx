/* eslint-disable @next/next/no-img-element */

import { GetServerSideProps, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏Ola, Bem vindo</span>
          <h1>Novidades sobre o universo <span>React</span></h1>
          <p>
            Obtenha acesso completo e exclusivo <br />
            <span>Por {product.amount} /mês</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1K3TYcLaqWkW1NFv4IEd8kuf')

  const product = {
    priceId: price.id,
    amount: price.unit_amount ? new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'mzn'
    }).format(price.unit_amount / 100) : null,
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 //24 horas
  }
}