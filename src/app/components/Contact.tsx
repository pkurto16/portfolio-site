'use client'

import { useState } from 'react';
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendEmail } from '@/features/email/emailSlice';
import type { AppDispatch, RootState } from '@/lib/store';
import type { EmailData } from '@/types/email';
import { useToast } from "@/hooks/use-toast";

export function Contact() {
    const dispatch = useAppDispatch<AppDispatch>();
    const emailStatus = useAppSelector((state: RootState) => state.email.status);
    const { toast } = useToast();

    const [formData, setFormData] = useState<EmailData>({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(sendEmail(formData)).unwrap();
            toast({
                title: "Success!",
                description: "Your message has been sent successfully.",
            });
            // Reset form
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

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
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your email"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Your message"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={emailStatus === 'loading'}
                                >
                                    {emailStatus === 'loading' ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </section>
    );
}