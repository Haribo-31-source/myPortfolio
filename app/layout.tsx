import './globals.css'
import Image from 'next/image'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <header>
        <h2>İbrahim Fatih Yıldırım</h2>
        <nav>
            <ul>
                <Link href="/home"><li><p>Home</p><Image src="/home.png" alt='' width={30} height={30}></Image></li></Link>
                <Link href="/about"><li><p>About</p><Image src="/about.png" alt='' width={30} height={30}></Image></li></Link>
                <Link href={"/contact"}><li><p>Contact</p><Image src="/contact.png" alt='' width={30} height={30}></Image></li></Link>
                <Link href={"/skills"}><li><p>Skills</p><Image src="/skills.png" alt='' width={30} height={30}></Image></li></Link>
            </ul>
        </nav>
    </header>
        <main>
          {children}
        </main>
        <footer>
            <h1>Footer</h1>
        </footer>
      </body>
    </html>
  )
}