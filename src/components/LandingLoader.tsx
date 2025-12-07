import { motion } from 'framer-motion';

export function LandingLoader() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
                <div className="absolute inset-0 w-full h-full noise-bg" />
            </div>

            <div className="flex flex-col items-center gap-10">
                {/* Premium spinner with glow effect */}
                <div className="relative">
                    {/* Outer glow ring */}
                    <motion.div
                        className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Main spinner */}
                    <div className="relative w-16 h-16">
                        <motion.div
                            className="absolute inset-0 rounded-full border-[3px] border-white/10"
                            style={{
                                borderTopColor: 'white',
                                borderRightColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>
                </div>

                {/* Brand with gradient */}
                <motion.div
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-3xl font-light tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                        ConfigHub
                    </h1>

                    {/* Animated loading text */}
                    <motion.p
                        className="text-sm text-white/50 font-light"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        Loading experience...
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
