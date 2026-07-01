import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left: Brand */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sandeep Kothapalli</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Senior Architect & Cloud-Native Engineer</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/kothapallisandeep/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-indigo-200 dark:hover:bg-indigo-700 flex items-center justify-center transition-colors text-slate-600 dark:text-slate-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/websabre"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-indigo-200 dark:hover:bg-indigo-700 flex items-center justify-center transition-colors text-slate-600 dark:text-slate-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:Sandeep.kothapalli1@hotmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-emerald-200 dark:hover:bg-emerald-700 flex items-center justify-center transition-colors text-slate-600 dark:text-slate-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Middle: Live Products */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Live Products</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://nexused.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  NexusEd — Real-time EdTech Platform
                </a>
              </li>
              <li>
                <a
                  href="https://www.360jobready.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                >
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  360JobReady — AI Career Platform
                </a>
              </li>
              <li>
                <a
                  href="https://www.affixx.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
                >
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  Affixx — Affiliate & Creator Platform
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Services", href: "/services" },
                { label: "Blog", href: "/blog" },
                { label: "Resume", href: "/resume" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>
            &copy; 2025 Sandeep Kothapalli
          </p>
          <a
            href="mailto:Sandeep.kothapalli1@hotmail.com"
            className="hover:text-gray-700 dark:hover:text-slate-300 transition-colors"
          >
            Sandeep.kothapalli1@hotmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
