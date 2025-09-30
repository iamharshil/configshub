"use client";

import { ArrowLeft, Bell, Clock, Eye, EyeOff, Globe, Key, Lock, Moon, Shield, Sun, UserX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [user, setUser] = useState<{ id: string; email: string } | null>(null);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
	const [newPasswordVisible, setNewPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

	// Refs for timeout cleanup
	const currentPasswordTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const newPasswordTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const confirmPasswordTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Helper functions for timeout-based password hiding
	const toggleCurrentPasswordVisibility = () => {
		// Clear any existing timeout
		if (currentPasswordTimeoutRef.current) {
			clearTimeout(currentPasswordTimeoutRef.current);
		}

		// Toggle visibility
		setCurrentPasswordVisible(!currentPasswordVisible);

		// Set timeout to hide password after 5 seconds if it's now visible
		if (!currentPasswordVisible) {
			currentPasswordTimeoutRef.current = setTimeout(() => {
				setCurrentPasswordVisible(false);
			}, 5000);
		}
	};

	const toggleNewPasswordVisibility = () => {
		// Clear any existing timeout
		if (newPasswordTimeoutRef.current) {
			clearTimeout(newPasswordTimeoutRef.current);
		}

		// Toggle visibility
		setNewPasswordVisible(!newPasswordVisible);

		// Set timeout to hide password after 5 seconds if it's now visible
		if (!newPasswordVisible) {
			newPasswordTimeoutRef.current = setTimeout(() => {
				setNewPasswordVisible(false);
			}, 5000);
		}
	};

	const toggleConfirmPasswordVisibility = () => {
		// Clear any existing timeout
		if (confirmPasswordTimeoutRef.current) {
			clearTimeout(confirmPasswordTimeoutRef.current);
		}

		// Toggle visibility
		setConfirmPasswordVisible(!confirmPasswordVisible);

		// Set timeout to hide password after 5 seconds if it's now visible
		if (!confirmPasswordVisible) {
			confirmPasswordTimeoutRef.current = setTimeout(() => {
				setConfirmPasswordVisible(false);
			}, 5000);
		}
	};
	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [passwordErrors, setPasswordErrors] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const [notificationSettings, setNotificationSettings] = useState({
		emailUpdates: true,
		configChanges: true,
		securityAlerts: true,
		marketingEmails: false,
	});

	// Cleanup timeouts when component unmounts
	useEffect(() => {
		return () => {
			if (currentPasswordTimeoutRef.current) clearTimeout(currentPasswordTimeoutRef.current);
			if (newPasswordTimeoutRef.current) clearTimeout(newPasswordTimeoutRef.current);
			if (confirmPasswordTimeoutRef.current) clearTimeout(confirmPasswordTimeoutRef.current);
		};
	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			setIsLoading(true);
			setError(null); // Reset any previous errors

			try {
				console.log("Fetching user for settings page...");

				// Check if Supabase client is initialized properly
				if (!supabase) {
					throw new Error("Supabase client is not initialized");
				}

				const authResponse = await supabase.auth.getUser();
				console.log("Auth response (settings):", authResponse);

				const { data: sessionData, error: sessionError } = authResponse;

				if (sessionError) {
					throw sessionError;
				}

				if (!sessionData.user) {
					router.push("/auth/signin");
					return;
				}

				setUser({
					id: sessionData.user.id,
					email: sessionData.user.email || "",
				});

				// Check theme preference from localStorage or system
				if (typeof window !== "undefined") {
					const theme = localStorage.getItem("theme") || "system";
					const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
					setIsDarkMode(theme === "dark" || (theme === "system" && systemPreference));
				}
			} catch (error) {
				console.error("Error fetching user for settings:", error);
				setError(error instanceof Error ? error.message : "Failed to load settings data");
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, [router]);

	// Error UI
	if (error) {
		return (
			<div className="min-h-screen bg-white dark:bg-slate-950">
				{/* Background Grid */}
				<div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

				<div className="min-h-screen flex items-center justify-center px-4">
					<div className="max-w-md w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-red-200 dark:border-red-900/30 rounded-xl p-8 shadow-lg">
						<div className="flex flex-col items-center text-center">
							<div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-8 w-8 text-red-600 dark:text-red-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
									role="img"
									aria-label="Error icon"
								>
									<title>Error loading settings</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-3">
								Error Loading Settings
							</h2>
							<p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
							<div className="flex gap-4">
								<Button
									onClick={() => window.location.reload()}
									className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
								>
									Try Again
								</Button>
								<Link href="/dashboard">
									<Button variant="outline" className="rounded-lg group flex items-center gap-2">
										<ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
										Return to Dashboard
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Password change handlers
	const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPasswordData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear errors when typing
		if (passwordErrors[name as keyof typeof passwordErrors]) {
			setPasswordErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const validatePasswordForm = () => {
		const errors = {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		};
		let isValid = true;

		if (!passwordData.currentPassword) {
			errors.currentPassword = "Current password is required";
			isValid = false;
		}

		if (!passwordData.newPassword) {
			errors.newPassword = "New password is required";
			isValid = false;
		} else if (passwordData.newPassword.length < 8) {
			errors.newPassword = "Password must be at least 8 characters";
			isValid = false;
		}

		if (!passwordData.confirmPassword) {
			errors.confirmPassword = "Please confirm your new password";
			isValid = false;
		} else if (passwordData.newPassword !== passwordData.confirmPassword) {
			errors.confirmPassword = "Passwords do not match";
			isValid = false;
		}

		setPasswordErrors(errors);
		return isValid;
	};

	const handlePasswordChange = async () => {
		if (!validatePasswordForm()) return;

		setIsUpdatingPassword(true);
		try {
			// First, sign in with current password to verify it
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: user?.email || "",
				password: passwordData.currentPassword,
			});

			if (signInError) {
				setPasswordErrors((prev) => ({
					...prev,
					currentPassword: "Current password is incorrect",
				}));
				return;
			}

			// Then update the password
			const { error: updateError } = await supabase.auth.updateUser({
				password: passwordData.newPassword,
			});

			if (updateError) throw updateError;

			// Clear form and show success
			setPasswordData({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});

			alert("Password updated successfully");
		} catch (error) {
			console.error("Error updating password:", error);
			alert("Failed to update password. Please try again.");
		} finally {
			setIsUpdatingPassword(false);
		}
	};

	// Theme toggle
	const toggleTheme = () => {
		const newTheme = !isDarkMode ? "dark" : "light";
		setIsDarkMode(!isDarkMode);

		// Apply theme
		if (typeof window !== "undefined") {
			const root = window.document.documentElement;
			localStorage.setItem("theme", newTheme);

			if (newTheme === "dark") {
				root.classList.add("dark");
			} else {
				root.classList.remove("dark");
			}
		}
	};

	// Notification settings
	const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
		setNotificationSettings((prev) => ({
			...prev,
			[setting]: !prev[setting],
		}));

		// In a real app, you'd save this to the user's preferences in the database
	};

	// Delete account
	const handleDeleteAccount = async () => {
		if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
			try {
				// In a real implementation, you'd want to:
				// 1. Have the user confirm with their password
				// 2. Delete all user-specific data
				// 3. Then delete the user account

				const { error } = await supabase.auth.admin.deleteUser(user?.id || "");
				if (error) throw error;

				// Sign out and redirect
				await supabase.auth.signOut();
				router.push("/");
			} catch (error) {
				console.error("Error deleting account:", error);
				alert("Failed to delete account. Please contact support.");
			}
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-pulse flex flex-col items-center">
					<div className="h-12 w-12 bg-blue-100 dark:bg-slate-800 rounded-full mb-4"></div>
					<div className="h-4 w-48 bg-blue-100 dark:bg-slate-800 rounded"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white dark:bg-slate-950">
			{/* Background Grid */}
			<div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

			{/* Gradient Orbs */}
			<div className="absolute top-0 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
			<div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
			<div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

			{/* Main Content */}
			<main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
				{/* Back button */}
				<div className="mb-8">
					<Link href="/dashboard">
						<Button
							variant="outline"
							size="lg"
							className="group flex items-center gap-3 rounded-full bg-white px-5 py-2 text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg dark:bg-slate-900/60 dark:text-gray-200 dark:hover:bg-slate-900/90"
						>
							<ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
							<span className="font-medium">Back to Dashboard</span>
						</Button>
					</Link>
				</div>

				<div className="flex flex-col gap-6">
					{/* Settings Header */}
					<div className="backdrop-blur-md bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-lg p-8">
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">
							Manage your account preferences and settings
						</p>
					</div>

					{/* Settings Sections */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Change Password */}
						<div className="col-span-1 lg:col-span-2 backdrop-blur-md bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-lg p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
									<Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
								</div>
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">Password Settings</h2>
							</div>

							<div className="space-y-6">
								{/* Current Password */}
								<div className="space-y-2">
									<Label
										htmlFor="currentPassword"
										className="text-sm font-medium text-gray-700 dark:text-gray-300"
									>
										Current Password
									</Label>
									<div className="relative">
										<Input
											id="currentPassword"
											name="currentPassword"
											type={currentPasswordVisible ? "text" : "password"}
											value={passwordData.currentPassword}
											onChange={handlePasswordInputChange}
											className={cn(
												"rounded-xl pr-10",
												passwordErrors.currentPassword && "border-red-500",
											)}
											placeholder="Enter your current password"
										/>
										<button
											type="button"
											onClick={toggleCurrentPasswordVisibility}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
										>
											{currentPasswordVisible ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</button>
									</div>
									{passwordErrors.currentPassword && (
										<p className="text-sm text-red-500">{passwordErrors.currentPassword}</p>
									)}
								</div>

								{/* New Password */}
								<div className="space-y-2">
									<Label
										htmlFor="newPassword"
										className="text-sm font-medium text-gray-700 dark:text-gray-300"
									>
										New Password
									</Label>
									<div className="relative">
										<Input
											id="newPassword"
											name="newPassword"
											type={newPasswordVisible ? "text" : "password"}
											value={passwordData.newPassword}
											onChange={handlePasswordInputChange}
											className={cn(
												"rounded-xl pr-10",
												passwordErrors.newPassword && "border-red-500",
											)}
											placeholder="Enter your new password"
										/>
										<button
											type="button"
											onClick={toggleNewPasswordVisibility}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
										>
											{newPasswordVisible ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</button>
									</div>
									{passwordErrors.newPassword && (
										<p className="text-sm text-red-500">{passwordErrors.newPassword}</p>
									)}
								</div>

								{/* Confirm Password */}
								<div className="space-y-2">
									<Label
										htmlFor="confirmPassword"
										className="text-sm font-medium text-gray-700 dark:text-gray-300"
									>
										Confirm New Password
									</Label>
									<div className="relative">
										<Input
											id="confirmPassword"
											name="confirmPassword"
											type={confirmPasswordVisible ? "text" : "password"}
											value={passwordData.confirmPassword}
											onChange={handlePasswordInputChange}
											className={cn(
												"rounded-xl pr-10",
												passwordErrors.confirmPassword && "border-red-500",
											)}
											placeholder="Confirm your new password"
										/>
										<button
											type="button"
											onClick={toggleConfirmPasswordVisibility}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
										>
											{confirmPasswordVisible ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</button>
									</div>
									{passwordErrors.confirmPassword && (
										<p className="text-sm text-red-500">{passwordErrors.confirmPassword}</p>
									)}
								</div>

								{/* Update button */}
								<div className="pt-4">
									<Button
										onClick={handlePasswordChange}
										disabled={isUpdatingPassword}
										className="group relative overflow-hidden rounded-xl 
                    bg-gradient-to-b from-blue-500 to-indigo-600
                    border border-white/20 dark:border-slate-700/30 
                    backdrop-blur-lg shadow-sm
                    hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]
                    py-2 px-6 
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
									>
										<div className="absolute inset-0 rounded-xl overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
										</div>
										<span className="relative z-10 font-medium text-sm text-white">
											{isUpdatingPassword ? "Updating..." : "Update Password"}
										</span>
									</Button>
								</div>
							</div>
						</div>

						{/* Preferences */}
						<div className="col-span-1 backdrop-blur-md bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-lg p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
									<Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
								</div>
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">Preferences</h2>
							</div>

							<div className="space-y-6">
								{/* Theme Toggle */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										{isDarkMode ? (
											<Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
										) : (
											<Sun className="h-5 w-5 text-amber-500" />
										)}
										<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
											{isDarkMode ? "Dark Mode" : "Light Mode"}
										</span>
									</div>
									<button
										type="button"
										onClick={toggleTheme}
										className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
											isDarkMode ? "bg-blue-600" : "bg-gray-200"
										}`}
									>
										<span
											className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
												isDarkMode ? "translate-x-5" : "translate-x-0"
											}`}
										/>
									</button>
								</div>

								{/* Language Preference (placeholder) */}
								<div className="pt-4 border-t border-gray-100 dark:border-gray-800">
									<div className="flex items-center gap-3 mb-2">
										<Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
										<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Language
										</span>
									</div>
									<select
										className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-sm"
										defaultValue="en"
									>
										<option value="en">English (US)</option>
										<option value="en-gb">English (UK)</option>
										<option value="fr">Français</option>
										<option value="de">Deutsch</option>
										<option value="es">Español</option>
										<option value="pt">Português</option>
										<option value="ja">日本語</option>
										<option value="zh">中文</option>
									</select>
								</div>

								{/* Time zone (placeholder) */}
								<div className="pt-4 border-t border-gray-100 dark:border-gray-800">
									<div className="flex items-center gap-3 mb-2">
										<Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
										<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Time Zone
										</span>
									</div>
									<select
										className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-sm"
										defaultValue="utc"
									>
										<option value="utc">UTC (Coordinated Universal Time)</option>
										<option value="est">Eastern Time (US & Canada)</option>
										<option value="cst">Central Time (US & Canada)</option>
										<option value="mst">Mountain Time (US & Canada)</option>
										<option value="pst">Pacific Time (US & Canada)</option>
										<option value="gmt">Greenwich Mean Time</option>
										<option value="cet">Central European Time</option>
										<option value="jst">Japan Standard Time</option>
									</select>
								</div>
							</div>
						</div>

						{/* Notifications */}
						<div className="col-span-1 lg:col-span-2 backdrop-blur-md bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-lg p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
									<Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
								</div>
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">
									Notification Settings
								</h2>
							</div>

							<div className="space-y-6">
								{/* Email Updates */}
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Email Updates
										</h3>
										<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
											Receive emails about your account activity
										</p>
									</div>
									<button
										type="button"
										onClick={() => handleNotificationToggle("emailUpdates")}
										className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
											notificationSettings.emailUpdates
												? "bg-blue-600"
												: "bg-gray-200 dark:bg-gray-700"
										}`}
									>
										<span
											className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
												notificationSettings.emailUpdates ? "translate-x-5" : "translate-x-0"
											}`}
										/>
									</button>
								</div>

								{/* Config Changes */}
								<div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
									<div>
										<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Configuration Changes
										</h3>
										<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
											Get notified when your configurations are changed
										</p>
									</div>
									<button
										type="button"
										onClick={() => handleNotificationToggle("configChanges")}
										className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
											notificationSettings.configChanges
												? "bg-blue-600"
												: "bg-gray-200 dark:bg-gray-700"
										}`}
									>
										<span
											className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
												notificationSettings.configChanges ? "translate-x-5" : "translate-x-0"
											}`}
										/>
									</button>
								</div>

								{/* Security Alerts */}
								<div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
									<div>
										<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Security Alerts
										</h3>
										<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
											Receive alerts about suspicious activity
										</p>
									</div>
									<button
										type="button"
										onClick={() => handleNotificationToggle("securityAlerts")}
										className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
											notificationSettings.securityAlerts
												? "bg-blue-600"
												: "bg-gray-200 dark:bg-gray-700"
										}`}
									>
										<span
											className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
												notificationSettings.securityAlerts ? "translate-x-5" : "translate-x-0"
											}`}
										/>
									</button>
								</div>

								{/* Marketing Emails */}
								<div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
									<div>
										<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
											Marketing Emails
										</h3>
										<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
											Receive emails about new features and offers
										</p>
									</div>
									<button
										type="button"
										onClick={() => handleNotificationToggle("marketingEmails")}
										className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
											notificationSettings.marketingEmails
												? "bg-blue-600"
												: "bg-gray-200 dark:bg-gray-700"
										}`}
									>
										<span
											className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
												notificationSettings.marketingEmails ? "translate-x-5" : "translate-x-0"
											}`}
										/>
									</button>
								</div>
							</div>
						</div>

						{/* Security & Account */}
						<div className="col-span-1 backdrop-blur-md bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-lg p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
									<Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
								</div>
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">Security</h2>
							</div>

							<div className="space-y-6">
								{/* Two-factor authentication */}
								<div>
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
												Two-Factor Authentication
											</h3>
											<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
												Add an extra layer of security to your account
											</p>
										</div>
										<button
											type="button"
											className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none"
										>
											<span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0" />
										</button>
									</div>
								</div>

								{/* API Keys */}
								<div className="pt-4 border-t border-gray-100 dark:border-gray-800">
									<Link
										href="#"
										className="flex items-center gap-3 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
									>
										<Key className="h-4 w-4" />
										<span className="text-sm font-medium">Manage API Keys</span>
									</Link>
								</div>

								{/* Delete Account */}
								<div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
									<h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-4">
										Danger Zone
									</h3>
									<Button
										variant="outline"
										onClick={handleDeleteAccount}
										className="w-full border-red-200 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 dark:border-red-900/30 dark:bg-red-900/10 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
									>
										<UserX className="h-4 w-4 mr-2" />
										Delete Account
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
