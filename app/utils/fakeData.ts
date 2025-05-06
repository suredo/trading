import type { InvestmentOption } from "~/routes/home";

const generateInvestors = (count: number, seed: number) => {
  const investors = [];
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fiona', 'George', 'Hannah', 'Isaac', 'Judy', 'Kevin', 'Linda'];
  // Use a simple seed for randomization
  const random = (seed: number) => {
    let x = seed;
    x = Math.sin(x) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    // Create a unique seed for each investor
    const investorSeed = seed + i;
    const nameIndex = Math.floor(random(investorSeed) * names.length);
    investors.push({
      name: names[nameIndex] + ' ' + Math.floor(random(investorSeed * 2) * 100), // Add some randomness to the number
    });
  }
  return investors;
};

const mockInvestmentOptions: InvestmentOption[] = [
  {
    id: 'option-1',
    name: 'Bitcoins',
    minInvestment: 5000,
    expectedReturn: '25-35%',
    expirationPeriod: new Date(),
    investors: generateInvestors(Math.floor(Math.random() * 50) + 20, 100), // Between 20 and 70 investors, seed 100
  },
  {
    id: 'option-2',
    name: 'Real Estate Fund',
    minInvestment: 10000,
    expectedReturn: '10-15%',
    expirationPeriod: new Date(),
    investors: generateInvestors(Math.floor(Math.random() * 50) + 20, 200), // Between 20 and 70 investors, seed 200
  },
  {
    id: 'option-3',
    name: 'Tech Startups Portfolio',
    minInvestment: 1000,
    expectedReturn: '30-40%',
    expirationPeriod: new Date(),
    investors: generateInvestors(Math.floor(Math.random() * 50) + 20, 300), // Between 20 and 70 investors, seed 300
  },
  {
    id: 'option-4',
    name: 'Government Bonds',
    minInvestment: 100,
    expectedReturn: '5-7%',
    expirationPeriod: new Date(),
    investors: generateInvestors(Math.floor(Math.random() * 50) + 20, 400), // Between 20 and 70 investors, seed 400
  },
];

export default mockInvestmentOptions;
