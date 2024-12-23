'use client'

import {
    Bell,
    Briefcase,
    Calendar, ChartBar, Clipboard, Cloud, Code,
    Coffee, DollarSign, FileText, Folder, Heart, Key,
    Layers, Lock, MapPin,
    Palette,
    Rocket, Search,
    Settings,
    ShieldAlert, ShoppingCart,
    Sparkle, Star, Tag, ThumbsUp, Trash,
    User, Users
} from "lucide-react";
import {motion} from "framer-motion";

export function BackgroundDecorations() {
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