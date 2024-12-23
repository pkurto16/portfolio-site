import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StoreProvider from './StoreProvider'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Peter Kurto - Software Developer Portfolio',
    description: 'Explore the projects and journey of Peter Kurto, a passionate software developer.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
        <body className={inter.className}>
        <StoreProvider>
            {children}
            <Toaster />
        </StoreProvider>
        </body>
        </html>
    )
}