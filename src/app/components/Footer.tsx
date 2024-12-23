'use client'

import {Button} from "@/components/ui/button";
import {Github, Linkedin} from "lucide-react";

export function Footer() {
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