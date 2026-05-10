
import './globals.css'

export const metadata = {
  title: 'SHAMBU',
  description: 'Futuristic AI Assistant'
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
