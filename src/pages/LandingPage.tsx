import { motion } from 'framer-motion';
import { ArrowRight, Code2, Zap, Shield, Users, GitBranch, Terminal, Sparkles, Download, Copy, FolderSync, History, Lock, Network, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function LandingPage() {
    const trustedCompanies = [
        'Vercel', 'GitHub', 'Stripe', 'Netlify', 'Railway', 'Supabase'
    ];

    const features = [
        {
            icon: FolderSync,
            title: 'Multi-Format Support',
            description: 'Support for .env, YAML, JSON, TOML, INI, and 50+ config formats. Import and export with ease.',
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'AES-256 encryption, role-based access control, and audit logs for compliance.',
        },
        {
            icon: GitBranch,
            title: 'Version Control',
            description: 'Track every change with Git-like versioning. Diff, rollback, and branch your configs.',
        },
        {
            icon: Users,
            title: 'Team Workspaces',
            description: 'Organize configs by teams, projects, or environments with granular permissions.',
        },
        {
            icon: Terminal,
            title: 'Powerful CLI',
            description: 'Full-featured command-line tool. Sync, pull, push, and manage configs from your terminal.',
        },
        {
            icon: Network,
            title: 'Real-time Sync',
            description: 'Changes propagate instantly across all devices. No manual file copying required.',
        },
    ];

    const useCases = [
        {
            title: 'Config File Storage',
            description: 'Store and organize your configuration files in one secure, accessible place',
            icon: FileJson,
        },
        {
            title: 'AI Prompts Library',
            description: 'Save your favorite AI prompts and copy them with one click when you need them',
            icon: Sparkles,
        },
        {
            title: 'Code Snippets',
            description: 'Build a personal library of reusable code snippets across any language',
            icon: Code2,
        },
        {
            title: 'Folder Organization',
            description: 'Organize everything into folders by project, tool, or however you prefer',
            icon: FolderSync,
        },
    ];

    const cliCommands = [
        '# Install ConfigHub CLI',
        'npm install -g confighub',
        '',
        '# Login to your account',
        'confighub login',
        '',
        '# Pull your configs',
        'confighub pull .env',
        '',
        '# Push local changes',
        'confighub push .zshrc',
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Purple-Blue Gradient Background with Noise */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
                <div className="absolute inset-0 w-full h-full noise-bg" />
            </div>

            {/* Header */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center gap-2">
                            <motion.div
                                className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.05 }}
                            >
                                ConfigHub
                            </motion.div>
                        </Link>

                        <nav className="hidden md:flex items-center gap-10">
                            <a href="#features" className="text-sm text-white/70 hover:text-white transition-colors">Features</a>
                            <a href="#usecases" className="text-sm text-white/70 hover:text-white transition-colors">Use Cases</a>
                            <a href="#cli" className="text-sm text-white/70 hover:text-white transition-colors">CLI</a>
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                                    Sign in
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="sm" className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                                        Get Started
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs sm:text-sm"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <span className="font-medium">Version 1.0 · Open Source</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light leading-tight tracking-tight px-4 sm:px-0"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            Unlimited Configs,
                            <br />
                            <span className="font-serif italic">Zero Complexity</span>
                        </motion.h1>

                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                        >
                            A modern platform to store, sync, and share configuration files across teams and environments.
                            Support for 50+ formats including .env, YAML, JSON, TOML, and more.
                        </motion.p>

                        <div
                            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto px-4 sm:px-0"
                        >
                            <Link to="/signup" className="w-full sm:w-auto">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 sm:px-10 h-12 sm:h-14 text-base sm:text-lg shadow-2xl shadow-blue-500/50"
                                    >
                                        Get Started
                                    </Button>
                                </motion.div>
                            </Link>
                            <motion.a
                                href="#cli"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 rounded-full px-8 sm:px-10 h-12 sm:h-14 text-base sm:text-lg"
                                >
                                    <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Install CLI
                                </Button>
                            </motion.a>
                        </div>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="flex items-center gap-2 text-sm text-white/50">
                                <Lock className="w-4 h-4" />
                                <span>AES-256 Encrypted</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
                            <div className="flex items-center gap-2 text-sm text-white/50">
                                <GitBranch className="w-4 h-4" />
                                <span>Version Controlled</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
                            <div className="flex items-center gap-2 text-sm text-white/50">
                                <Terminal className="w-4 h-4" />
                                <span>CLI First</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Trusted By */}
                    <motion.div
                        className="mt-24 text-center space-y-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <p className="text-sm text-white/40 uppercase tracking-wider">
                            Trusted By Developers At
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                            {trustedCompanies.map((company, i) => (
                                <motion.div
                                    key={company}
                                    className="text-lg sm:text-xl font-semibold text-white/30 hover:text-white/60 transition-colors"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 + i * 0.1 }}
                                >
                                    {company}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* Features Section */}
            < section id="features" className="py-32 px-4 sm:px-6 lg:px-8" >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light mb-6">
                            Everything you need
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Professional configuration management for modern development teams
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {features.map((feature, i) => {
                            // Simplified animations to prevent flicker
                            const animationVariants = [
                                { y: 40, opacity: 0 },
                                { x: -40, opacity: 0 },
                                { x: 40, opacity: 0 },
                                { y: 40, opacity: 0 },
                                { y: 40, opacity: 0 },
                                { y: 40, opacity: 0 },
                            ];

                            const initial = animationVariants[i % animationVariants.length];

                            return (
                                <motion.div
                                    key={i}
                                    className="group p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer will-change-transform"
                                    initial={initial}
                                    whileInView={{
                                        x: 0,
                                        y: 0,
                                        opacity: 1,
                                    }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.1,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.2, ease: "easeOut" }
                                    }}
                                    style={{ willChange: 'transform, opacity' }}
                                >
                                    <motion.div
                                        className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5"
                                        whileHover={{
                                            rotate: 360,
                                            scale: 1.1,
                                            transition: { duration: 0.5, ease: "easeInOut" }
                                        }}
                                    >
                                        <feature.icon className="w-6 h-6 text-blue-400" />
                                    </motion.div>
                                    <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section >

            {/* Use Cases Section */}
            < section id="usecases" className="py-32 px-4 sm:px-6 lg:px-8 bg-white/5" >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light mb-6">
                            Built for your workflow
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            ConfigHub adapts to your development needs
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {useCases.map((useCase, i) => (
                            <motion.div
                                key={i}
                                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <useCase.icon className="w-10 h-10 text-blue-400 mb-4" />
                                <h3 className="text-2xl font-semibold mb-3">{useCase.title}</h3>
                                <p className="text-white/60 leading-relaxed">{useCase.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CLI Section */}
            < section id="cli" className="py-32 px-4 sm:px-6 lg:px-8" >
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl sm:text-5xl font-serif font-light leading-tight">
                                Powerful CLI for developers
                            </h2>
                            <p className="text-xl text-white/60 leading-relaxed">
                                Integrate ConfigHub seamlessly into your development workflow with our full-featured command-line tool.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-blue-500 hover:bg-blue-600 rounded-full gap-2">
                                    <Download className="w-4 h-4" />
                                    Install CLI
                                </Button>
                                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full">
                                    View Documentation
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 overflow-hidden">
                                <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <div className="flex-1 text-center text-sm text-white/50">Terminal</div>
                                </div>
                                <div className="p-6 font-mono text-sm space-y-2">
                                    {cliCommands.map((cmd, i) => (
                                        <motion.div
                                            key={i}
                                            className={cmd.startsWith('#') ? 'text-white/40' : 'text-emerald-400'}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            {cmd || '\u00A0'}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-32 px-4 sm:px-6 lg:px-8" >
                <motion.div
                    className="max-w-4xl mx-auto text-center space-y-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light leading-tight">
                        Start managing your
                        <br />
                        <span className="italic">configs today</span>
                    </h2>
                    <p className="text-xl text-white/60">
                        Open source. Self-hostable. No vendor lock-in.
                    </p>
                    <Link to="/signup">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-12 h-16 text-lg shadow-2xl shadow-blue-500/50">
                                Get Started Free
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>
            </section >

            {/* Footer */}
            < footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8" >
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="space-y-4">
                            <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                                ConfigHub
                            </div>
                            <p className="text-sm text-white/50">
                                Modern configuration management for developers
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-white/50">
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#cli" className="hover:text-white transition-colors">CLI</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm text-white/50">
                                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-white/50">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-white/40">
                            © 2024 ConfigHub. All rights reserved.
                        </div>
                        <div className="flex gap-6 text-sm text-white/40">
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    );
}
