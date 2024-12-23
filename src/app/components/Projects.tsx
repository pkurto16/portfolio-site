'use client'

import {AnimatePresence, motion} from "framer-motion";
import {Github, MessageSquareCode, Sparkle, X} from "lucide-react";
import {useState} from "react";
import {useInView} from "react-intersection-observer";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {projects} from "@/app/data/projects";

export function Projects() {
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
                            {projects.toReversed().map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const handleNext = (e: any) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const handlePrev = (e: any) => {
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
                            {project.tags.map((tag: any) => (
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
                                        <MessageSquareCode className="w-5 h-5" />
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