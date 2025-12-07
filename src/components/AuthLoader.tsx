import { motion } from 'framer-motion';

export function AuthLoader() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
                <div className="absolute inset-0 w-full h-full noise-bg" />
            </div>

            <div className="flex flex-col items-center gap-12">
                {/* Minimalist spinner */}
                <div className="relative w-16 h-16">
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/20"
                        style={{ borderTopColor: 'white' }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {/* Minimal authentication text */}
                <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <h1 className="text-2xl font-light tracking-wide text-white">
                        ConfigHub
                    </h1>
                </motion.div>
            </div>
        </div>
    );
}
