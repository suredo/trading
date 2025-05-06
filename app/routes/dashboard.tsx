import React, { useEffect, useState } from 'react';
import type { InvestmentOption } from './home';
import supabase from '~/supabase';
import DatePicker from 'react-datepicker';
import "../css/react-datepicker.css";

interface Investor {
  id: number;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface FormState {
  id?: string;
  name: string;
  minInvestment: number;
  expectedReturn: string;
  expirationPeriod: Date | null;
}

export interface InvestmentOptionRequest {
  id: string;
  name: string;
  expected_return: string;
  expiration_period: Date;
  min_investment: number;
  investors?: Array<{ name: string }>;
}

// Static user data (replace with dynamic data if needed)
const users: User[] = [
  { id: 'user-1', name: 'João Silva', email: 'joao.silva@email.com' },
  { id: 'user-2', name: 'Maria Oliveira', email: 'maria.oliveira@email.com' },
  { id: 'user-3', name: 'Pedro Santos', email: 'pedro.santos@email.com' },
];

const InvestmentForm: React.FC<{
  option?: InvestmentOption;
  onSubmit: (data: FormState) => void;
  onCancel: () => void;
}> = ({ option, onSubmit, onCancel }) => {
  const [date, setDate] = useState<Date | null>();
  const [formState, setFormState] = useState<FormState>(
    option
      ? {
        id: option.id,
        name: option.name,
        minInvestment: option.minInvestment,
        expectedReturn: option.expectedReturn,
        expirationPeriod: option.expirationPeriod,
      }
      : {
        name: '',
        minInvestment: 0,
        expectedReturn: '',
        expirationPeriod: null,
      }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">
          {option ? 'Editar' : 'Adicionar'} Opção de Investimento
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Nome</label>
            <input
              type="text"
              value={formState.name}
              onChange={e =>
                setFormState({ ...formState, name: e.target.value })
              }
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">
              Investimento Mínimo ($)
            </label>
            <input
              type="number"
              value={formState.minInvestment}
              onChange={e =>
                setFormState({
                  ...formState,
                  minInvestment: parseInt(e.target.value) || 0,
                })
              }
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">
              Retorno Esperado
            </label>
            <input
              type="text"
              value={formState.expectedReturn}
              onChange={e =>
                setFormState({ ...formState, expectedReturn: e.target.value })
              }
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">
              Período de Expiração
            </label>
            <DatePicker
              showIcon
              selected={formState.expirationPeriod}
              onChange={(date) => setFormState({ ...formState, expirationPeriod: date })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmation: React.FC<{
  optionName: string;
  optionId: string;
  onConfirm: (id: string) => void;
  onCancel: () => void;
}> = ({ optionName, optionId, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm">
      <h2 className="text-xl font-semibold text-white mb-4">Confirmar Exclusão</h2>
      <p className="text-gray-300 mb-6">
        Tem certeza que deseja excluir "{optionName}"? Esta ação não pode ser desfeita.
      </p>
      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
          onClick={() => onConfirm(optionId)}
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
);

const InvestmentTable: React.FC<{
  options: InvestmentOption[];
  onEdit: (option: InvestmentOption) => void;
  onDelete: (id?: string, name?: string) => void;
}> = ({ options, onEdit, onDelete }) => {
  console.log("options", options);
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3 text-left text-white font-semibold">Nome</th>
            <th className="p-3 text-left text-white font-semibold">Invest. Mínimo</th>
            <th className="p-3 text-left text-white font-semibold">Retorno Esperado</th>
            <th className="p-3 text-left text-white font-semibold">Expiração</th>
            <th className="p-3 text-left text-white font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {options.map(option => (
            <tr key={option.id} className="border-b border-gray-700">
              <td className="p-3 text-white">{option.name}</td>
              <td className="p-3 text-white">
                ${option.minInvestment}
              </td>
              <td className="p-3 text-white">{option.expectedReturn}</td>
              <td className="p-3 text-white">{`${option.expirationPeriod}`}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition-colors"
                    onClick={() => onEdit(option)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
                    onClick={() => onDelete(option.id, option.name)}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

const UsersTable: React.FC = () => (
  <div className="bg-gray-800 rounded-lg overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-700">
          <th className="p-3 text-left text-white font-semibold">ID</th>
          <th className="p-3 text-left text-white font-semibold">Nome</th>
          <th className="p-3 text-left text-white font-semibold">Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="border-b border-gray-700">
            <td className="p-3 text-white">{user.id}</td>
            <td className="p-3 text-white">{user.name}</td>
            <td className="p-3 text-white">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Dashboard: React.FC = () => {
  const [options, setOptions] = useState<InvestmentOption[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<
    InvestmentOption | undefined
  >(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteOption, setDeleteOption] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedTab, setSelectedTab] = useState<'investment' | 'users'>('investment');

  const fetchData = async () => {
    const { data, error }: { data: any, error: any } = await supabase
      .from("investment_options")
      .select()
      .order("id", { ascending: true });
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setOptions(data.map((item: any) => ({
        id: item.id,
        name: item.name,
        minInvestment: item.min_investment,
        expectedReturn: item.expected_return,
        expirationPeriod: item.expiration_period,
      })));
    }
  }

  const handleAddEdit = async (option: FormState) => {
    if (option.id) {
      const { data, error } = await supabase
        .from("investment_options")
        .update({
          name: option.name,
          min_investment: option.minInvestment,
          expected_return: option.expectedReturn,
          expiration_period: option.expirationPeriod,
        })
        .eq("id", option.id)
        .select();
      if (error) {
        console.error("Edit error:", error);
      } else {
        fetchData();
      }
    } else {
      const { data, error } = await supabase
        .from("investment_options")
        .insert([{
          name: option.name,
          min_investment: option.minInvestment,
          expected_return: option.expectedReturn,
          expiration_period: option.expirationPeriod,
        },]);
      if (error && !data) {
        console.error("Insert error:", error);
      } else {
        fetchData();
      }
    }
    setIsModalOpen(false);
    setEditingOption(undefined);
  };

  const handleDeleteRequest = (id?: string, name?: string) => {
    if (id && name) {
      setDeleteOption({ id, name });
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    const { error } = await supabase
      .from("investment_options")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      fetchData();
    }
    setIsDeleteModalOpen(false);
    setDeleteOption(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteOption(null);
  };

  const openModal = (option?: InvestmentOption) => {
    setEditingOption(option);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-5">Painel de Investimentos</h1>
        <div className="flex mb-5 border-b border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium ${selectedTab === 'investment'
              ? 'border-b-2 border-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
              }`}
            onClick={() => setSelectedTab('investment')}
          >
            Opções de Investimento
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${selectedTab === 'users'
              ? 'border-b-2 border-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
              }`}
            onClick={() => setSelectedTab('users')}
          >
            Usuários
          </button>
        </div>
        {selectedTab === 'investment' && (
          <>
            <div className="flex justify-end mb-5">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
                onClick={() => openModal()}
              >
                Adicionar Opção
              </button>
            </div>
            <InvestmentTable
              options={options}
              onEdit={openModal}
              onDelete={handleDeleteRequest}
            />
            {isModalOpen && (
              <InvestmentForm
                option={editingOption}
                onSubmit={handleAddEdit}
                onCancel={() => {
                  setIsModalOpen(false);
                  setEditingOption(undefined);
                }}
              />
            )}
            {isDeleteModalOpen && deleteOption && (
              <DeleteConfirmation
                optionName={deleteOption.name}
                optionId={deleteOption.id}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
              />
            )}
          </>
        )}
        {selectedTab === 'users' && <UsersTable />}
      </div>
    </div>
  );
};

export default Dashboard;