
import React from 'react';

interface SidebarProps {
  activeTab: 'dashboard' | 'orders' | 'prices' | 'analysis';
  setActiveTab: (tab: 'dashboard' | 'orders' | 'prices' | 'analysis') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: '经营概览', icon: '📊' },
    { id: 'prices', label: '价格表管理', icon: '💰' },
    { id: 'orders', label: '对账单录入', icon: '📝' },
    { id: 'analysis', label: 'AI 建议', icon: '✨' },
  ];

  return (
    <div className="w-64 bg-white border-r h-screen sticky top-0 flex flex-col shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          PrintFlow
        </h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold tracking-tighter">印刷加工管理系统</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 font-bold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t">
        <div className="bg-gray-50 rounded-xl p-3 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
            工厂
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">生产调度中心</p>
            <p className="text-[10px] text-gray-400 truncate tracking-tighter">V2.1 稳定版</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
