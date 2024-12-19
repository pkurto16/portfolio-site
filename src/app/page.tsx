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
import { Code, Briefcase, Calendar, Mail, Github, Linkedin, Twitter,
    Menu, X, Monitor, Cpu, Sparkle, Loader2, Layers, Aperture, Coffee,
    Rocket, Palette, ShieldAlert, User, Settings, Bell, ChartBar, Clipboard,
    Cloud, DollarSign, FileText, Folder, Heart, Key, Lock, MapPin, Search,
    ShoppingCart, Star, Tag, ThumbsUp, Trash, Users } from 'lucide-react'

const projects = [
    {
        id: 1,
        title: 'Fibonacci Heap',
        description:
            'Implemented a Fibonacci Heap data structure in Java, showcasing efficient priority queue operations, amortized complexities, and a deep understanding of advanced data structures. This structure supports mergeable heaps efficiently, and can significantly reduce the complexity of certain graph and optimization algorithms.',
        images: [
            '/fib-heap/fib-heap1.png',
            '/fib-heap/fib-heap2.png'
        ],
        tags: ['Java', 'Data Structures', 'Algorithms', 'Optimization'],
        github: 'https://github.com/pkurto16/FibHeap',
        devpost: ''
    },
    {
        id: 2,
        title: 'SwipeSwap',
        description:
            'Contributed to backend architecture and supported frontend integration for this innovative mobile application enabling frictionless exchanges of meal swipes. Built during a collegiate hackathon, I integrated Firebase for real-time data, and collaborated on Cloud Functions development. Engineered comprehensive features including dining hall listings, dynamic pricing systems, and seamless Google Maps integration.',
        images: [
            '/swipe-swap/swipe-swap1.jpg',
            '/swipe-swap/swipe-swap2.jpg'
        ],
        tags: [
            'Dart', 'Firebase', 'Firestore', 'Flutter', 'Google Cloud', 'Google Maps', 'JavaScript', 'Node.js'
        ],
        github: 'https://github.com/Swipe-Swap',
        devpost: 'https://devpost.com/software/swipeswap'
    },
    {
        id: 3,
        title: 'Purdue Schedulings',
        description:
            'Served as frontend lead while contributing significantly to backend development. Architected and implemented a sophisticated web application leveraging advanced AI techniques, including Retrieval Augmented Generation (RAG) and vector databases, to revolutionize course scheduling at Purdue. Spearheaded the integration of React, Flask, Gemini AI, ChromaDB, and Firebase, delivering dynamic widgets and intelligent recommendations based on comprehensive university data.',
        images: [
            '/boiler-schedulings/boiler-schedulings1.jpg',
            '/boiler-schedulings/boiler-schedulings2.jpg'
        ],
        tags: [
            'React', 'Flask', 'Gemini', 'RAG', 'ChromaDB', 'Firebase', 'Node.js', 'Python', 'HuggingFace', 'Auth'
        ],
        github: 'https://github.com/Boiler-Schedulings',
        devpost: 'https://devpost.com/software/purdue-schedulings'
    },
    {
        id: 4,
        title: 'DartFrog',
        description:
            'Led frontend development and contributed to backend architecture for this AI-driven data analysis platform. Engineered an intuitive interface using React while collaborating on Flask backend integration. Implemented sophisticated data visualization systems using Chart.js and developed conversational querying features with Gemini AI, creating a powerful tool that democratizes data analysis for non-technical users.',
        images: [
            '/dartfrog/dartfrog1.jpg',
            '/dartfrog/dartfrog2.jpg',
            '/dartfrog/dartfrog3.jpg',
            '/dartfrog/dartfrog4.jpg'
        ],
        tags: ['React', 'Firebase', 'Flask', 'Gemini', 'Python', 'RAG', 'Chart.js'],
        github: 'https://github.com/DartFrogHackillinois',
        devpost: 'https://devpost.com/software/dartfrog'
    },
    {
        id: 5,
        title: 'Tale',
        description:
            'Awarded 2nd place at Catapult Hacks AI startup hackathon. As frontend lead and backend contributor, engineered a sophisticated language learning platform leveraging OpenAI\'s API, Flask, and Firebase. Architected the core conversation system, implemented real-time audio analysis using Whisper, and developed comprehensive feedback mechanisms for tone, pace, and sentiment analysis. Designed and implemented an immersive user interface that facilitates natural language acquisition through dynamic conversation flows.',
        images: [
            '/tale/tale1.png',
            '/tale/tale2.png'
        ],
        tags: ['React', 'Firebase', 'Flask', 'OpenAI API', 'Whisper', 'Hark', 'AI', 'Audio'],
        github: 'https://github.com/taletech',
        devpost: 'https://devpost.com/software/lingua-learner'
    },
    {
        id: 6,
        title: 'X Parks the Spot',
        description:
            'As team lead, orchestrated the development of this comprehensive parking marketplace platform. Directed the architectural decisions and implementation of a React-based PWA with Next.js for SSR, Redux for state management, and MSW for request mocking. Led the integration of Shadcn UI components while overseeing the development of a robust Flask + PostgreSQL backend. Implemented advanced features including Redis authentication, S3 object storage, and Stripe payment processing, creating a seamless C2C marketplace for parking spots.',
        images: [
            '/xpark/xpark1.png',
            '/xpark/xpark2.png'
        ],
        tags: [
            'React', 'PWA', 'Next.js', 'Redux', 'MSW', 'Shadcn', 'Flask', 'PostgreSQL', 'Redis', 'S3', 'Stripe'
        ],
        github: '',
        devpost: ''
    }
]

const timelineEvents = [
    {
        id: 1,
        date: 'Pre-2020',
        title: 'Early Technical Excellence',
        description:
            'Demonstrated exceptional early aptitude in computing, mastering Scratch programming, leading FLL robotics initiatives, achieving advanced proficiency in JavaScript through Khan Academy, and securing first place in the state-level "Game On" Science Olympiad competition.',
        icon: Code
    },
    {
        id: 2,
        date: '2020-2021 Academic Year',
        title: 'Advanced Java Development',
        description:
            'Excelled in complex programming challenges, establishing expertise in OOP principles and advanced recursion techniques. Led the development of sophisticated projects, including a cutting-edge evolution simulator that showcased exceptional problem-solving abilities.',
        icon: Code
    },
    {
        id: 3,
        date: 'Summer 2022',
        title: 'Innovation Leadership at FirstBuild',
        description:
            'Spearheaded multiple high-impact projects at FirstBuild, seamlessly integrating hardware and software solutions. Pioneered the development of custom 3D-printed sensor systems, architected sophisticated API implementations, and demonstrated outstanding engineering leadership.',
        icon: Briefcase
    },
    {
        id: 4,
        date: '2022-2023 Academic Year',
        title: 'DSA Excellence & Innovation',
        description:
            'Mastered advanced data structures and algorithms, implementing sophisticated solutions including AVL Trees, Tries, and Fibonacci Heaps. Consistently demonstrated exceptional problem-solving capabilities and technical innovation in complex algorithmic challenges.',
        icon: Code
    },
    {
        id: 5,
        date: 'Summer 2023',
        title: 'Technical Leadership at GE Appliances',
        description:
            'Led the development of a sophisticated recipe scraping REST API, pioneered ChatGPT integration features, and orchestrated significant backend infrastructure improvements. Received special recognition for exceptional contributions that redefined smart home capabilities.',
        icon: Briefcase
    },
    {
        id: 6,
        date: '2023-2024 Academic Year',
        title: 'Technical Excellence & Innovation Leadership',
        description:
            'Distinguished performance in Purdue\'s CS program while leading multiple award-winning hackathon teams. Secured 2nd place in a major AI startup competition, showcasing exceptional technical and leadership abilities. Assumed key technical role in Purdue ARC, driving robotics innovation and software development initiatives.',
        icon: Code
    },
    {
        id: 7,
        date: 'Summer 2024',
        title: 'IoT Architecture Leadership at GE',
        description:
            'Leading critical initiatives in GE Appliances Core IoT division, architecting large-scale over-the-air update systems, developing sophisticated predictive models, and implementing secure automation solutions impacting millions of connected devices.',
        icon: Briefcase
    },
    {
        id: 8,
        date: '2024-Present',
        title: 'Technical Innovation & Leadership',
        description:
            'Driving technological advancement through leadership roles in Purdue ARC and spearheading innovative solutions like "X Parks the Spot." Leading multiple teams in exploring cutting-edge AI applications and automation initiatives, while expanding influence in technical leadership positions.',
        icon: Rocket
    }
]


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
    const icons = [
        ShieldAlert,
        Sparkle,
        Layers,
        Coffee,
        Rocket,
        Palette,
        Briefcase,
        User,
        Settings,
        Bell,
        Calendar,
        ChartBar,
        Clipboard,
        Cloud,
        Code,
        DollarSign,
        FileText,
        Folder,
        Heart,
        Key,
        Lock,
        MapPin,
        Search,
        ShoppingCart,
        Star,
        Tag,
        ThumbsUp,
        Trash,
        Users
    ];

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
                        <AvatarImage src="/avatar.jpeg" alt="Peter Kurto" />
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
        );
    };

    const ImageOverlay = () => (
        <AnimatePresence>
            {isOverlayOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    onClick={() => setIsOverlayOpen(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20"
                        onClick={() => setIsOverlayOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
                        <Image
                            src={project.images[currentImageIndex]}
                            alt={project.title}
                            width={1200}
                            height={800}
                            className="object-contain max-h-full"
                        />

                        {project.images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/70 text-white rounded-full p-4 hover:bg-black/90 text-2xl"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/70 text-white rounded-full p-4 hover:bg-black/90 text-2xl"
                                >
                                    ›
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <Card className="flex flex-col h-full min-h-[600px] overflow-hidden border border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <CardHeader className="p-0 relative">
                        <div
                            className="relative w-full h-48 overflow-hidden flex items-center justify-center bg-black cursor-pointer"
                            onClick={() => setIsOverlayOpen(true)}
                        >
                            <Image
                                src={project.images[currentImageIndex]}
                                alt={project.title}
                                width={400}
                                height={300}
                                className="object-cover w-full h-48"
                            />
                            {project.images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white rounded-full p-2 hover:bg-black/90"
                                        aria-label="Previous Image"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white rounded-full p-2 hover:bg-black/90"
                                        aria-label="Next Image"
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-10">{project.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2 p-6 pt-0 justify-between items-center mt-auto">
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                        <div className="flex space-x-4">
                            {project.github && (
                                <Link href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub`}>
                                    <Button variant="ghost" size="icon">
                                        <Github className="w-5 h-5" />
                                    </Button>
                                </Link>
                            )}
                            {project.devpost && (
                                <Link href={project.devpost} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} Devpost`}>
                                    <Button variant="ghost" size="icon">
                                        <Aperture className="w-5 h-5" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
            <ImageOverlay />
        </>
    );
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
            className={`flex flex-col md:flex-row items-center mb-8 md:mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
        >
            <div
                className={`w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0 ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                }`}
            >
                <h3 className="text-lg md:text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-slate-300 text-sm md:text-base">{event.description}</p>
            </div>

            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center z-10 border border-white shadow-glow mx-4 my-2 md:my-0">
                <event.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
            </div>

            <div className={`w-full md:w-1/2 text-center md:text-left ${
                index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'
            }`}>
                <span className="text-base md:text-lg font-semibold text-primary">{event.date}</span>
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
                            <a href="https://github.com/pkurto16" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github className="w-5 h-5" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://www.linkedin.com/in/peter-kurto-870660250/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}