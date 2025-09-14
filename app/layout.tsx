import { Inter } from 'next/font/google'
import { Providers } from './providers'
import "./globals.css";
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AdvogaFácil - Plataforma Jurídica',
  description: 'Plataforma jurídica com IA e automação para advogados',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
