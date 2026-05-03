import React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { Home, User, BookOpen, Mail, FolderKanban, Wrench } from 'lucide-react'

const MobileNav = () => {
  return (
    <div className="py-6">
        <ul className="flex flex-col gap-6">
            <li>
              <Link href="/" className="flex items-center gap-3 hover:text-primary transition-colors font-medium text-lg">
                <Home className="w-5 h-5" />
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="flex items-center gap-3 hover:text-primary transition-colors font-medium text-lg">
                <User className="w-5 h-5" />
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="flex items-center gap-3 hover:text-primary transition-colors font-medium text-lg">
                <FolderKanban className="w-5 h-5" />
                Projects
              </Link>
            </li>
            <li>
              <Link href="/services" className="flex items-center gap-3 hover:text-primary transition-colors font-medium text-lg">
                <Wrench className="w-5 h-5" />
                Services
              </Link>
            </li>
            <li>
              <Link href="/blog" className="flex items-center gap-3 hover:text-primary transition-colors font-medium text-lg">
                <BookOpen className="w-5 h-5" />
                Blog
              </Link>
            </li>
            <li>
              <Link href="/resume" className="flex items-center gap-3 hover:text-primary transition-colors font-medium text-lg">
                <BookOpen className="w-5 h-5" />
                Resume
              </Link>
            </li>
            <li>
              <Link href="/contact" className="flex items-center gap-3 hover:text-primary transition-colors font-medium text-lg">
                <Mail className="w-5 h-5" />
                Contact
              </Link>
            </li>
        </ul>
    </div>
  )
}

export default MobileNav