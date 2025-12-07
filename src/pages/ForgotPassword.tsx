import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSent(true);
            toast.success("Password reset link sent!");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 sm:p-6 relative overflow-hidden">
            {/* Purple-Blue Gradient Background with Noise */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
                <div className="absolute inset-0 w-full h-full noise-bg" />
            </div>

            {/* Logo */}
            <Link to="/" className="absolute top-4 left-4 sm:top-8 sm:left-8">
                <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                        <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-lg sm:text-xl font-bold">ConfigHub</span>
                </motion.div>
            </Link>

            <motion.div
                className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center space-y-1.5 sm:space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Reset password</h1>
                    <p className="text-sm sm:text-base text-white/60">
                        {sent
                            ? "Check your email for a reset link"
                            : "Enter your email to receive a reset link"}
                    </p>
                </div>

                <motion.div
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {!sent ? (
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div className="space-y-1.5 sm:space-y-2">
                                <Label htmlFor="email" className="text-white text-sm sm:text-base">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500 rounded-xl h-11 sm:h-12 text-sm sm:text-base"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-11 sm:h-12 text-sm sm:text-base shadow-lg shadow-blue-500/30"
                            >
                                {loading ? "Sending..." : "Send reset link"}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm sm:text-base text-white/80">
                                We've sent a password reset link to your email address.
                            </p>
                        </div>
                    )}

                    <div className="mt-4 sm:mt-6 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Back to sign in
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
