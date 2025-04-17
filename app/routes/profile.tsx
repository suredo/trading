import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Wallet, LogOut, Settings, HelpCircle, ChevronRight, Banknote } from 'lucide-react';
import supabase from '~/supabase';

interface UserProfile {
	name: string;
	email: string;
	depositAmount: number;
}

const mockUserProfile: UserProfile = {
	name: 'John Doe',
	email: 'john.doe@example.com',
	depositAmount: 12345.67,
};

const ProfileScreen = () => {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	// const router = useRouter(); // Initialize next/navigation router - removed

	// Simulate fetching user data and session
	useEffect(() => {
		const fetchProfile = async () => {
			setLoading(true);
			// Check for an active session
			const { data: { session }, error: sessionError } = await supabase.auth.getSession();

			if (sessionError) {
				console.error("Error checking session:", sessionError);
				// Handle error appropriately
			}

			if (!session?.user) {
				// Redirect to login if not logged in
				// router.push('/login'); // Use next/navigation's router.push - removed
				window.location.href = '/login';
				return; // Important:  Exit the function to prevent further execution
			}


			if (session?.user) {
				// Fetch user data from Supabase (assuming you have a user profile table)
				// const { data: profileData, error: profileError } = await supabase
				//     .from('profiles') //  <- Replace 'profiles' with your actual table name
				//     .select('*')
				//     .eq('id', session.user.id)
				//     .single();

				// if (profileError) {
				//     console.error("Error fetching profile:", profileError);
				//     // Handle error (e.g., show error message, redirect)
				// } else {
				//      setUser({
				//         name: profileData.name,  // Adjust field names as necessary
				//         email: session.user.email || '',
				//         depositAmount: profileData.deposit_amount || 0, //  Adjust field names
				//     });
				// }

				// For this example, we'll use the mock data since we don't have a real database setup.
				setUser(mockUserProfile);

			}
			setLoading(false);
		};

		fetchProfile();
	}, []); // removed router

	const handleLogout = async () => {
		// Implement logout using Supabase
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Error logging out:", error);
			// Handle error (e.g., show error message)
		} else {
			console.log('Logged out successfully');
			setUser(null); // Clear user state
			// router.push('/login');  removed
			window.location.href = '/login';
			// Redirect to login page (if using client-side routing)
			// window.location.href = '/login';
		}
	};

	const handleDeposit = () => {
		// Implement deposit logic here (e.g., open a modal, redirect to a payment gateway)
		console.log('Depositing funds...');
		// For demonstration, we'll just show an alert
		// alert('Deposit functionality not implemented in this example.');
		window.location.href = '/deposit';
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
			<div className="max-w-3xl mx-auto space-y-6">
				<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
					Meu Perfil
				</h1>

				{loading ? (
					// Show loading state
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="space-y-4"
					>
						<div className="bg-gray-800 border border-gray-700 rounded-lg">
							<div className="flex flex-row items-center gap-4 p-4">
								<div className="w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
								<div className="space-y-2">
									<div className="w-40 h-6 bg-gray-700 rounded-md animate-pulse"></div>
									<div className="w-64 h-4 bg-gray-700 rounded-md animate-pulse"></div>
								</div>
							</div>
							<div className="space-y-4 p-4">
								<div className="h-8 w-full bg-gray-700 rounded-md animate-pulse"></div>
								<div className="h-8 w-full bg-gray-700 rounded-md animate-pulse"></div>
							</div>
						</div>
						<div className="bg-gray-800 border border-gray-700 rounded-lg">
							<div className="p-4">
								<div className="w-40 h-6 bg-gray-700 rounded-md animate-pulse"></div>
							</div>
							<div className="p-4">
								<div className="h-8 w-full bg-gray-700 rounded-md animate-pulse"></div>
							</div>
						</div>
					</motion.div>
				) : user ? (
					// Show user profile
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-6"
					>
						<div className="bg-gray-800 border border-gray-700 rounded-lg">
							<div className="flex flex-row items-center justify-between gap-4 p-4">
								<div className="flex items-center gap-4">
									<div className="relative w-16 h-16">
										<div className="absolute inset-0 bg-purple-500 text-white flex items-center justify-center rounded-full">
											<User className="w-8 h-8" />
										</div>
									</div>
									<div className="space-y-1">
										<h2 className="text-xl font-semibold text-white flex items-center gap-1">
											<User className="w-5 h-5" />
											{user.name}
										</h2>
										<p className="text-gray-400 text-sm">{user.email}</p>
									</div>
								</div>
								<button
									onClick={handleLogout}
									className=" bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30 flex items-center gap-2 px-4 py-2 rounded-md"
								>
									<LogOut className="w-4 h-4" />
									Sair
								</button>
							</div>
							<div className="space-y-4 p-4 pt-0">
								<div className="flex items-center justify-between">
									<span className="text-gray-300 flex items-center gap-2">
										<Wallet className="w-5 h-5" />
										Saldo de Depósito:
									</span>
									<span className="text-xl font-bold text-green-400">
										${user.depositAmount.toFixed(2)}
									</span>
								</div>
								<div className="mt-4">
									<button
										onClick={handleDeposit}
										className="w-full  bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30 flex items-center gap-2 px-4 py-2 rounded-md"
									>
										<Banknote className="w-4 h-4" />
										Depositar
									</button>
								</div>
							</div>
						</div>

						<div className="bg-gray-800 border border-gray-700 rounded-lg">
							<div className="p-4">
								<h3 className="text-lg font-semibold text-white">Configurações</h3>
							</div>
							<div className="space-y-4 p-4">
								<div className="flex items-center justify-between">
									<span className="text-gray-300 flex items-center gap-2">
										<Settings className="w-4 h-4" />
										Configurações da Conta
									</span>
									<ChevronRight className="w-5 h-5 text-gray-400" />
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-300 flex items-center gap-2">
										<HelpCircle className="w-4 h-4" />
										Central de Ajuda
									</span>
									<ChevronRight className="w-5 h-5 text-gray-400" />
								</div>
							</div>
						</div>
					</motion.div>
				) : (
					// Show logged out state (optional, for demonstration)
					<div className="text-center">
						<p className="text-gray-400">Você não está logado.</p>
						{/* Implement login button/link here */}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileScreen;
