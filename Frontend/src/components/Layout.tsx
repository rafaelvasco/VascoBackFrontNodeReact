import siteMetadata from '@/data/siteMetadata.json'
import { useContext } from 'react'
import { Footer } from './Footer'
import { LinkEx } from './Link'
import { SectionContainer } from './SectionContainer'

export const Layout = ({ children }) => {

    return (
        <div className="flex flex-col justify-between p-5">
            <SectionContainer>
                <header className="flex items-center justify-between py-10">
                    <div>
                        <LinkEx href="/" aria-label="Vasco Hamburgueria!">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-blue-800 dark:text-blue-200 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                                    Vasco Hamburgueria
                                </h1>
                            </div>
                        </LinkEx>
                    </div>
                    <div className="px-10">
                        <LinkEx href="/admin" aria-label="Vasco Hamburgueria!">
                            <h1 className="bg-red-400 py-1 px-4 rounded-md text-md leading-9 ">
                                Admin
                            </h1>
                        </LinkEx>
                    </div>
                </header>
            </SectionContainer>

            <main className="mb-auto">{children}</main>
            <Footer />
        </div>
    )
}
