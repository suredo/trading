import React, { useState, useEffect } from 'react';
import { useAuth } from "~/contexts/auth"; // Ajuste o caminho se necessário
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
} from 'recharts';
import { AlertCircle } from "lucide-react"
import { cn } from '~/utils';
import fakeData from '~/utils/fakeData';
import { InvestmentCard } from '~/components/investmentCard';

// Dados fictícios para opções de investimento (substitua por dados reais)
export interface InvestmentOption {
  id: string;
  name: string;
  description: string;
  riskLevel: string;
  expectedReturn: string;
  currentValue: number;
  initialInvestment: number;
  minInvestment: number;
  maxInvestment: number;
  expirationPeriod: string;
  investors: Array<{ name: string; investedAmount: number }>;
  performanceHistory: { date: string; value: number }[];
}

// Função auxiliar para obter a variante do selo de risco
const getRiskBadgeVariant = (riskLevel: string) => {
  switch (riskLevel) {
    case 'High':
      return 'bg-red-500 text-white';
    case 'Medium':
      return 'bg-yellow-500 text-gray-900';
    case 'Low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

// Função auxiliar para calcular o retorno simples
const calculateReturn = (currentValue: number, initialInvestment: number) => {
  return ((currentValue - initialInvestment) / initialInvestment) * 100;
};

// Variantes de animação
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const InvestmentProfilePage = () => {
  const { user, isLoading, error } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFullProfile, setShowFullProfile] = useState(false); // Estado para mostrar o perfil completo


  useEffect(() => {
    if (user) {
      console.log('User on Investment Profile Page:', user);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">
          <div className="h-8 w-64 bg-gray-700 rounded animate-pulse"></div>
        </h1>
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-700 animate-pulse"></div>
              <div>
                <div className="h-6 w-48 mb-2 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-4 w-full mb-2 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="h-6 w-48 mb-2 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                <div className="mt-4">
                  <div className="h-4 w-full mb-2 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 mb-2 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 w-full mt-4 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
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

  if (!user) {
    return (
      <div className="p-4 md:p-8 text-center text-gray-400">
        Please log in to view your investment profile.
      </div>
    );
  }

  const renderPerformanceChart = (performanceHistory: { date: string; value: number }[], title: string) => {
    return (
      <motion.div
        variants={chartVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full"
      >
        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={performanceHistory}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id={`colorUv${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="date" tick={{ fill: '#9ca3af' }} />
                <YAxis tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#374151', borderColor: '#4b5563', color: '#f8fafc' }}
                  labelStyle={{ color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend wrapperStyle={{ color: '#f8fafc' }} />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill={`url(#colorUv${title})`} />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-3xl font-bold text-gray-100">Perfil de Investimento</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {fakeData.map((option) => (
            <motion.div
              key={option.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              <InvestmentCard
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                onSelect={setSelectedOption}
                onInvest={(option) => alert(`Invest in ${option.name}`)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedOption && (
        <div className="mt-8">
          {renderPerformanceChart(
            fakeData.find((opt) => opt.id === selectedOption)
              ?.performanceHistory || [],
            `Histórico de Desempenho para ${fakeData.find((opt) => opt.id === selectedOption)?.name || ''
            }`
          )}
        </div>
      )}
    </div>
  );
};

export default InvestmentProfilePage;
