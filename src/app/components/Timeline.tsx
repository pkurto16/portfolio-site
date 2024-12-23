'use client'

import {motion} from "framer-motion";
import {Calendar} from "lucide-react";
import {timelineEvents} from "@/app/data/timelineEvents";
import {useInView} from "react-intersection-observer";

export function Timeline() {
    return (
        <section id="timeline" className="pt-20 pb-8 bg-slate-900 relative overflow-hidden">
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