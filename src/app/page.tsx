'use client'

import {useState, useEffect, ComponentProps} from 'react'
import { motion, AnimatePresence} from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
    Calendar, Mail,
    Menu, X, Monitor, Cpu, Loader2, Aperture, LucideIcon
} from 'lucide-react'
import {BackgroundDecorations} from "./components/BackgroundDecorations";
import {Contact} from "@/app/components/Contact";
import {Hero} from "./components/Hero"
import {Footer} from "@/app/components/Footer";
import {Projects} from "@/app/components/Projects";
import {Timeline} from "@/app/components/Timeline";


export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="relative min-h-screen bg-slate-900 text-slate-50 overflow-hidden">
            <BackgroundDecorations />

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="loader"
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        >
                            <Loader2 className="w-14 h-14 text-primary" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.header
                className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800"
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="#home" className="text-2xl font-bold text-primary flex items-center space-x-2 hover:opacity-90">
                        <Monitor className="w-6 h-6" /> <span>PK</span>
                    </Link>
                    <div className="hidden md:flex space-x-8">
                        <NavLink href="#home" icon={Aperture}>Home</NavLink>
                        <NavLink href="#projects" icon={Cpu}>Projects</NavLink>
                        <NavLink href="#timeline" icon={Calendar}>Timeline</NavLink>
                        <NavLink href="#contact" icon={Mail}>Contact</NavLink>
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </Button>
                </nav>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden bg-slate-900/90 backdrop-blur-sm border-t border-slate-800 px-6 py-4 space-y-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <NavLink href="#home" icon={Aperture} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                            <NavLink href="#projects" icon={Cpu} onClick={() => setIsMenuOpen(false)}>Projects</NavLink>
                            <NavLink href="#timeline" icon={Calendar} onClick={() => setIsMenuOpen(false)}>Timeline</NavLink>
                            <NavLink href="#contact" icon={Mail} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            <AnimatePresence mode="wait">
                {!isLoading && (
                    <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <Hero />
                        <Projects />
                        <Timeline />
                        <Contact />
                    </motion.main>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    )
}

interface NavLinkProps extends Omit<ComponentProps<typeof Link>, 'icon'> {
    href: string;
    icon: LucideIcon;
    children: React.ReactNode;
}

function NavLink({ href, icon: Icon, children, ...props }: NavLinkProps) {
    return (
        <Link
            href={href}
            {...props}
            className="text-slate-300 hover:text-primary transition-colors block flex items-center space-x-2"
        >
            <Icon className="w-5 h-5" />
            <span>{children}</span>
        </Link>
    )
}