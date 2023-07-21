import '@styles/globals.css'; 
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'; 
import Provider from '@components/Provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gym Online',
  description: 'Template application made in order to develop further ones for real world gyms.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
