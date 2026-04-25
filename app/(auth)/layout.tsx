import React from 'react'
import '../globals.css'
import AuthProvider from '@/app/context/AuthProvider'
import UnderConstructionBanner from '@/app/components/moleculs/UnderConstructionBanner'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
        <body className='pt-8'>
            <AuthProvider>
              <UnderConstructionBanner />
              {children}
            </AuthProvider>
        </body>
    </html>
  )
}
