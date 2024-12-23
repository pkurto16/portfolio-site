'use client'

import {motion} from "framer-motion";
import {Mail} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export function Contact() {
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