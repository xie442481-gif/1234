
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ProcessingOrder } from '../types';

interface DashboardProps {
  orders: ProcessingOrder[];
}

const Dashboard: React.FC<DashboardProps> = ({ orders }) => {
  const stats = useMemo(() => {
    const total = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const unpaid = orders.filter(o => o.status !== 'Paid').reduce((acc, curr) => acc + curr.totalAmount, 0);
    const paid = total - unpaid;
    const orderCount = orders.length;

    return { total, unpaid, paid, orderCount };
  }, [orders]);

  const customerRanking = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach(o => {
      map[o.customerName] = (map[o.customerName] || 0) + o.totalAmount;
    });
    return Object.entries(map)
      .map(([name, val]) => ({ name, val }))
      .sort((a, b) => b.val - a.val)
      .slice(0, 5);
  }, [orders]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">累计应收加工额</p>
          <p className="text-4xl font-black text-blue-600 tracking-tighter">¥{stats.total.toLocaleString()}</p>
          <div className="mt-4 text-xs text-green-500 font-bold">↑ 较上月增长 12%</div>
        </div>
        
        <div className="bg-red-50 p-7 rounded-[2rem] border border-red-100 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4">未结算待对账</p>
            <p className="text-4xl font-black text-red-600 tracking-tighter">¥{stats.unpaid.toLocaleString()}</p>
            <div className="mt-4 text-xs text-red-400 font-bold flex items-center gap-1">
              <span>⚠️ 需要尽快回款</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 text-red-100 text-6xl opacity-50">💰</div>
        </div>

        <div className="bg-gray-900 p-7 rounded-[2rem] text-white flex flex-col justify-between">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">已完成单数</p>
          <p className="text-4xl font-black tracking-tighter">{stats.orderCount}</p>
          <div className="mt-4 text-xs text-gray-400">平均单价 ¥{(stats.total / (stats.orderCount || 1)).toFixed(0)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-gray-800 tracking-tight">核心对账客户排行</h3>
            <span className="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">Top 5</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerRanking} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f5f5f5" />
                <XAxis type="number" hide />
                <YAxis 
                   dataKey="name" 
                   type="category" 
                   axisLine={false} 
                   tickLine={false} 
                   width={100}
                   tick={{ fontSize: 12, fontWeight: 700, fill: '#4B5563' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="val" fill="#3B82F6" radius={[0, 12, 12, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-lg font-black text-gray-800 tracking-tight mb-8">资金回笼进度</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: '已收回', value: stats.paid },
                    { name: '待回款', value: stats.unpaid }
                  ]}
                  innerRadius={75}
                  outerRadius={110}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#3B82F6" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-10 text-xs font-bold mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-200"></div>
              <span className="text-gray-600">已回款: {((stats.paid/stats.total)*100 || 0).toFixed(1)}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-200"></div>
              <span className="text-gray-600">待对账: {((stats.unpaid/stats.total)*100 || 0).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
