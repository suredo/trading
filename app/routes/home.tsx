import React, { useState, useEffect } from 'react';
import { useAuth } from "~/contexts/auth";
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, LogOut } from "lucide-react"
import { InvestmentCard } from '~/components/investmentCard';

// Import the modified InvestmentOption interface
export interface InvestmentOption {
  name: string;
  expectedReturn: string;
  expirationPeriod: Date | null;
  minInvestment: number;
  id?: string;
  investors?: Array<{ name: string }>;
}

// Mock data, now aligned with the updated InvestmentOption interface
const fakeData: InvestmentOption[] = [
  {
    id: 'option-1',
    name: 'Bitcoins',
    expectedReturn: '25-35%',
    expirationPeriod: new Date(),
    minInvestment: 5000,
    investors: [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }],
  },
  {
    id: 'option-2',
    name: 'Real Estate Fund',
    expectedReturn: '10-15%',
    expirationPeriod: new Date(),
    minInvestment: 10000,
    investors: [{ name: 'David' }, { name: 'Eve' }],
  },
  {
    id: 'option-3',
    name: 'Tech Startups Portfolio',
    expectedReturn: '30-40%',
    expirationPeriod: new Date(),
    minInvestment: 1000,
    investors: [{ name: 'Fiona' }, { name: 'George' }, { name: 'Hannah' }, { name: 'test' }],
  },
  {
    id: 'option-4',
    name: 'Government Bonds',
    expectedReturn: '5-7%',
    expirationPeriod: new Date(),
    minInvestment: 100,
    investors: [{ name: 'Investor 1' }, { name: 'Investor 2' }],
  },
];


// Variantes de animação
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};



const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-700"></div>
          <div>
            <div className="h-6 w-48 mb-2 bg-gray-700 rounded"></div>
            <div className="h-4 w-32 bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-4 w-full mb-2 bg-gray-700 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 animate-pulse">
            <div className="h-6 w-48 mb-2 bg-gray-700 rounded"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
            <div className="mt-4">
              <div className="h-4 w-full mb-2 bg-gray-700 rounded"></div>
              <div className="h-4 w-3/4 mb-2 bg-gray-700 rounded"></div>
              <div className="h-8 w-full mt-4 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const InvestmentProfilePage = () => {
  const { user, isLoading, error, signOut, initialLoadDone } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (initialLoadDone) {
      if (!user) {
        window.location.href = '/login';
      }
    }
  }, [initialLoadDone, user]);

  const handleLogout = async () => {
    await signOut();
  };

  if (isLoading || !initialLoadDone) {
    return (
      <div className="p-4 md:p-8">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-900 border border-red-700 text-red-100 p-4 rounded-md flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-1" />
          <div>
            <h2 className="text-lg font-semibold">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-3xl font-bold text-gray-100">Perfil de Investimento</h1>
        <button
          onClick={handleLogout}
          className="text-gray-300 hover:text-gray-100 hover:bg-gray-800 border border-gray-700 flex items-center gap-2 px-4 py-2 rounded-md"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {fakeData.map((option) => {
            const isOptionSelected = selectedOption === option.id;
            return (
              <React.Fragment key={option.id}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  <InvestmentCard
                    key={option.id}
                    option={option}
                    isSelected={isOptionSelected}
                    onSelect={setSelectedOption}
                    onInvest={(option) => alert(`Invest in ${option.name}`)}
                  />
                </motion.div>
                {/* Removed chart rendering */}
              </React.Fragment>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InvestmentProfilePage;
