import type { AppProps } from 'next/app'

import Head from 'next/head'


import '@/styles/tailwind.css'
import '@/styles/global.css'
import { Layout } from '@/components/Layout'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <meta
                name="viewport"
                content="width=device-width, initial-scale=1"/>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
                            
    )
}

export default App
