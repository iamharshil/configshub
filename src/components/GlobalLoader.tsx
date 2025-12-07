import { motion } from 'framer-motion';

export function GlobalLoader() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

            <div className="flex flex-col items-center gap-8 relative z-10">
                {/* Clean spinner */}
                <div className="relative w-14 h-14">
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-muted"
                        style={{ borderTopColor: 'hsl(var(--primary))' }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {/* Brand name */}
                <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
                    <h2 className="text-xl font-semibold text-foreground">
                        ConfigHub
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Loading workspace...
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
