'use client'

import {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
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
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.3, duration: 0.7, ease: "easeOut"}}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                        <span className="text-primary">Peter Kurto</span>
                    </h1>
                    <p className="text-sm sm:text-lg md:text-2xl lg:text-3xl mb-8 text-slate-300 max-w-[80%] mx-auto text-[clamp(1rem, 2.5vw, 1.5rem)] md:text-[clamp(1.5rem, 3vw, 3rem)] leading-tight">
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