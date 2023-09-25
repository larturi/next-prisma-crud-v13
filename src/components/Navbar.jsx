import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-slate-900">
      <div className="container mx-auto flex justify-between items-center py-7 px-4">
        <Link href="/" className="font-bold hover:text-slate-300">
          <h3>Next Prisma CRUD</h3>
        </Link>
      
        <ul className="flex gap-x-3">
          <li>
            <Link href="/" className="font-bold hover:text-slate-300">
              Tasks
            </Link>
          </li>
          <li>
            <Link href="/task/new" className="font-bold hover:text-slate-300">
              New
            </Link>
          </li>
          <li>
            <Link href="/about" className="font-bold hover:text-slate-300">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar