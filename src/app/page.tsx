'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Code, Briefcase, Calendar, Mail, Github, Linkedin, Twitter, Menu, X, Monitor, Cpu, ShieldAlert, Sparkle, Loader2, Layers, Aperture, Coffee, Rocket, Palette } from 'lucide-react'

const projects = [
    {
        id: 1,
        title: 'Fibonacci Heap (Java)',
        description:
            'Implemented an advanced Fibonacci Heap data structure in Java, demonstrating efficient priority queue operations, amortized complexities, and a solid understanding of recursive tree linking.',
        image: '/placeholder.svg?height=300&width=400',
        tags: ['Java', 'Data Structures', 'Algorithms']
    },
    {
        id: 2,
        title: 'SwipeSwap (Firebase + Flutter)',
        description:
            'A mobile application that facilitates the easy exchange of goods and services. Built during a collegiate hackathon, it leverages Flutter for a seamless UI and Firebase for real-time database interactions.',
        image: '/placeholder.svg?height=300&width=400',
        tags: ['Flutter', 'Firebase', 'UX Design']
    },
    {
        id: 3,
        title: 'Boiler Schedulings (React + Flask + Gemini API + Vector DB)',
        description:
            'A web application designed to automate and optimize course scheduling at Purdue University. Integrates React for the frontend, Flask for the backend, Gemini APIs, and vector databases for intelligent course recommendations.',
        image: '/placeholder.svg?height=300&width=400',
        tags: ['React', 'Flask', 'Gemini API', 'Vector DB']
    },
    {
        id: 4,
        title: 'DartFrog (React + Firebase + Flask + Gemini API)',
        description:
            'Hackathon project combining a React front-end with a Flask backend, Firebase storage, and Gemini APIs. Offers dynamic content retrieval and real-time data updates for an enhanced user experience.',
        image: '/placeholder.svg?height=300&width=400',
        tags: ['React', 'Firebase', 'Flask', 'Gemini API']
    },
    {
        id: 5,
        title: 'Tale (React + Firebase + Flask + OpenAI API)',
        description:
            'An AI-powered language learning assistant that won 2nd place at a major AI startup hackathon. Utilizes OpenAI’s API for personalized lessons, real-time translation, and a seamless user experience.',
        image: '/placeholder.svg?height=300&width=400',
        tags: ['React', 'Firebase', 'OpenAI API', 'AI']
    },
    {
        id: 6,
        title: 'X Parks the Spot (Next.js + Redux + MSW + Shadcn + Flask + PostgreSQL)',
        description:
            'A Fall 2024 project focusing on location-based solutions for optimal parking experiences. Combines Next.js for SSR, Redux for state management, Shadcn UI for modern styling, and a Flask + PostgreSQL backend.',
        image: '/placeholder.svg?height=300&width=400',
        tags: ['Next.js', 'Redux', 'Flask', 'PostgreSQL']
    },
]

const timelineEvents = [
    {
        id: 1,
        date: 'Pre-2020',
        title: 'Foundations in Computing',
        description:
            'Explored Scratch coding, participated in FLL robotics, and learned JavaScript via Khan Academy. Won 1st place at the state level for the “Game On” event in Science Olympiad (2019).',
        icon: Code
    },
    {
        id: 2,
        date: '2020 – 2021',
        title: 'Building with Java',
        description:
            'Transitioned to Java, mastering OOP principles, recursion, and creating projects like an evolution simulator, solidifying core programming skills.',
        icon: Code
    },
    {
        id: 3,
        date: '2022',
        title: 'Hands-On Engineering',
        description:
            'Interned at FirstBuild, blending hardware and software solutions. Gained practical experience with sensors, APIs, and 3D-printed devices.',
        icon: Briefcase
    },
    {
        id: 4,
        date: '2022 – 2023',
        title: 'Advanced Data Structures & Algorithms',
        description:
            'Took a rigorous high school DSA course. Implemented AVL Trees, Tries, and a Fibonacci Heap. Strengthened fundamental CS problem-solving techniques.',
        icon: Code
    },
    {
        id: 5,
        date: 'Summer 2023',
        title: 'SmartHome AI at GE Appliances',
        description:
            'Developed a recipe scraping REST API, contributed to ChatGPT@GEA features, and enhanced backend infrastructure. Recognized by the CTO for significant impact.',
        icon: Briefcase
    },
    {
        id: 6,
        date: 'Fall 2023',
        title: 'Purdue CS & Hackathons',
        description:
            'Started CS at Purdue with advanced standing. Built hackathon projects like “SwipeSwap” (Hello World Hackathon) and “Boiler Schedulings” (BoilerMake), while joining Purdue ARC.',
        icon: Code
    },
    {
        id: 7,
        date: '2024',
        title: 'Scaling Up and Innovating',
        description:
            'Participated in Hack Illinois (DartFrog) and Catapult AI Startup (Tale), earning 2nd place. Interned at GE Appliances Core IoT, then developed “X Parks the Spot” in Fall 2024.',
        icon: Rocket
    },
]


export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)
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
                        {/* Loader with Lucide icons and rotating animations */}
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

function BackgroundDecorations() {
    // Just some random floating Lucide icons as background decorations
    const icons = [ShieldAlert, Sparkle, Layers, Coffee, Rocket, Palette]
    // For simplicity, map a few random icons as absolutely positioned floating icons
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            {icons.map((Icon, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        top: `${Math.random() * 90 + 5}%`,
                        left: `${Math.random() * 90 + 5}%`,
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                >
                    <Icon className="text-slate-700 w-16 h-16" />
                </motion.div>
            ))}
        </div>
    )
}

function NavLink({ href, icon: Icon, children, ...props }) {
    return (
        <Link href={href} {...props} className="text-slate-300 hover:text-primary transition-colors block flex items-center space-x-2">
            <Icon className="w-5 h-5" />
            <span>{children}</span>
        </Link>
    )
}

function Hero() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
            <motion.div ref={ref} style={{ scale }} className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Avatar className="w-40 h-40 mx-auto mb-8 border-4 border-primary shadow-lg">
                        <AvatarImage src="/placeholder.svg?height=160&width=160" alt="Peter Kurto" />
                        <AvatarFallback>PK</AvatarFallback>
                    </Avatar>
                </motion.div>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                        <span className="text-primary">Peter Kurto</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-2xl mx-auto">
                        Software Developer | Problem Solver | Tech Enthusiast
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button asChild>
                            <Link href="#contact">Get in Touch</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="#projects">View Projects</Link>
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

function Projects() {
    return (
        <section id="projects" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                            <Sparkle className="inline-block w-8 h-8 text-primary mb-1" /> My Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    )
}

function ProjectCard({ project, index }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card className="overflow-hidden border border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="p-0 relative">
                    <div className="absolute top-2 left-2 flex space-x-2">
                        <Badge variant="outline" className="bg-black/50 text-white">NEW</Badge>
                        <Badge variant="outline" className="bg-black/50 text-white">🔥</Badge>
                    </div>
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                    />
                </CardHeader>
                <CardContent className="p-6">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="mt-2">{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 p-6 pt-0">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </CardFooter>
            </Card>
        </motion.div>
    )
}

function Timeline() {
    return (
        <section id="timeline" className="py-20 bg-slate-900 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        <Calendar className="inline-block w-8 h-8 text-primary mb-1" /> My Journey
                    </h2>
                    <div className="relative">
                        {timelineEvents.map((event, index) => (
                            <TimelineEvent key={event.id} event={event} index={index} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

function TimelineEvent({ event, index }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
        >
            <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-slate-300">{event.description}</p>
            </div>
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10 border border-white shadow-glow mx-4">
                <event.icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                <span className="text-lg font-semibold text-primary">{event.date}</span>
            </div>
        </motion.div>
    )
}

function Contact() {
    return (
        <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        <Mail className="inline-block w-8 h-8 text-primary mb-1" /> Get in Touch
                    </h2>
                    <Card className="max-w-md mx-auto border border-slate-700 shadow-xl">
                        <CardHeader>
                            <CardTitle>Contact Me</CardTitle>
                            <CardDescription>
                                Fill out the form below and I&apos;ll get back to you shortly.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Your name" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Your email" />
                                </div>
                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Your message" />
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </CardFooter>
                    </Card>
                </div>
            </motion.div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="bg-slate-900 py-8 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-300 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Peter Kurto. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github className="w-5 h-5" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}