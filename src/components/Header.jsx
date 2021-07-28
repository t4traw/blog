import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className='header'>
        <Link href='/'>
          <a><h1 className="text-xl pt-8 pb-4">t4traw.net</h1></a>
        </Link>
        <nav className='pb-6'>
          <Link href='/'>
            <a className=" text-l underline text-blue-500 mr-2">Home</a>
          </Link>
          <Link href='/about'>
            <a className="text-l underline text-blue-500">About</a>
          </Link>
        </nav>
      </header>
    </>
  )
}
