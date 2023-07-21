import '@styles/globals.css'; 
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'; 

// Session Provider
import Provider from '@components/Provider';

// Components on every page 
import NavBar from '@components/Nav';
import Footer from '@components/Footer';

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
            <>
              <NavBar /> 
              { children }
              <Footer /> 
            </>
        </Provider>
      </body>
    </html>
  )
}
