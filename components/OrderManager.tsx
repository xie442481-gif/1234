
import React, { useState } from 'react';
import { ProcessingOrder, SettlementStatus, PriceItem, CATEGORIES } from '../types';
import { STATUS_MAP } from '../constants';

interface OrderManagerProps {
  orders: ProcessingOrder[];
  prices: PriceItem[];
  addOrder: (order: Omit<ProcessingOrder, 'id'>) => void;
  deleteOrder: (id: string) => void;
}

const OrderManager: React.FC<OrderManagerProps> = ({ orders, prices, addOrder, deleteOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    customerName: '',
    projectName: '',
    printFee: 0,
    laminationFee: 0,
    bindingFee: 0,
    dieCutFee: 0,
    shippingFee: 0,
    quantity: 1000,
    status: 'Unpaid' as SettlementStatus,
    date: new Date().toISOString().split('T')[0],
    remark: '',
  });

  // 价格选择助手状态
  const [selectors, setSelectors] = useState<Record<string, string>>({
    printing: '',
    lamination: '',
    binding: '',
    craft: ''
  });

  const calculateTotal = (data = formData) => {
    return data.printFee + data.laminationFee + data.bindingFee + data.dieCutFee + data.shippingFee;
  };

  // 处理价格自动填充，修正 unitPrice -> basePrice 并适配分类名称
  const handlePriceSelect = (cat: string, priceId: string) => {
    const item = prices.find(p => p.id === priceId);
    if (!item) return;

    // Use basePrice from PriceItem definition
    const calculatedAmount = item.basePrice * formData.quantity;
    
    setSelectors(prev => ({ ...prev, [cat]: priceId }));
    
    // Logic mapping categories to fee fields
    if (item.category === '传统胶印') setFormData(f => ({ ...f, printFee: calculatedAmount }));
    if (item.category === '数码快印') setFormData(f => ({ ...f, laminationFee: calculatedAmount }));
    if (item.category === '后道加工') setFormData(f => ({ ...f, bindingFee: calculatedAmount }));
    if (item.category === '大幅面/喷绘') setFormData(f => ({ ...f, dieCutFee: calculatedAmount }));
  };

  const filteredOrders = orders.filter(o => 
    o.customerName.includes(searchTerm) || o.projectName.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900">加工费账单流水</h2>
          <p className="text-sm text-gray-500">录入对账信息，可根据价格表自动计算金额</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="搜索客户/项目..." 
            className="w-full pl-4 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow-md whitespace-nowrap"
          >
            + 录入账单
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">日期</th>
                <th className="px-6 py-4">客户 / 项目</th>
                <th className="px-6 py-4">数量</th>
                <th className="px-6 py-4">应收总计</th>
                <th className="px-6 py-4">对账状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-blue-50/20 transition-colors group">
                  <td className="px-6 py-4 text-xs text-gray-400">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.projectName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{order.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-black text-blue-600">¥{order.totalAmount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_MAP[order.status].color}`}>
                      {STATUS_MAP[order.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => deleteOrder(order.id)} className="text-red-300 hover:text-red-500 text-sm">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-black">录入加工单</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); addOrder({...formData, totalAmount: calculateTotal()}); setIsModalOpen(false); }} className="p-8 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">客户</label>
                  <input required className="w-full border rounded-xl px-4 py-2" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">项目</label>
                  <input required className="w-full border rounded-xl px-4 py-2" value={formData.projectName} onChange={e => setFormData({...formData, projectName: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">印刷数量</label>
                  <input type="number" className="w-full border rounded-xl px-4 py-2 font-bold text-blue-600 text-lg" value={formData.quantity} onChange={e => setFormData({...formData, quantity: Number(e.target.value)})} />
                  <p className="text-[10px] text-gray-400 mt-1">※ 修改数量后，可重新引用单价计算总额</p>
                </div>

                <div className="col-span-2 bg-blue-50/50 p-6 rounded-3xl border border-blue-100 space-y-4">
                   <p className="text-xs font-black text-blue-800 uppercase tracking-widest">自动引用单价 (工艺选择)</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {CATEGORIES.slice(0, 4).map(cat => (
                        <div key={cat}>
                          <label className="block text-[10px] font-bold text-gray-500 mb-1">
                            {cat}
                          </label>
                          <select 
                            className="w-full border rounded-lg px-2 py-1.5 text-xs"
                            onChange={(e) => handlePriceSelect(cat, e.target.value)}
                          >
                            <option value="">-- 手动输入金额 --</option>
                            {prices.filter(p => p.category === cat).map(p => (
                              <option key={p.id} value={p.id}>{p.name} (¥{p.basePrice}/{p.unit})</option>
                            ))}
                          </select>
                        </div>
                      ))}
                   </div>

                   <hr className="border-blue-100" />

                   <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-1">印刷费</label>
                      <input type="number" className="w-full border rounded-lg px-2 py-1.5 font-bold" value={formData.printFee} onChange={e => setFormData({...formData, printFee: Number(e.target.value)})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-1">覆膜费</label>
                      <input type="number" className="w-full border rounded-lg px-2 py-1.5 font-bold" value={formData.laminationFee} onChange={e => setFormData({...formData, laminationFee: Number(e.target.value)})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-1">装订费</label>
                      <input type="number" className="w-full border rounded-lg px-2 py-1.5 font-bold" value={formData.bindingFee} onChange={e => setFormData({...formData, bindingFee: Number(e.target.value)})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-1">其它费</label>
                      <input type="number" className="w-full border rounded-lg px-2 py-1.5 font-bold" value={formData.dieCutFee} onChange={e => setFormData({...formData, dieCutFee: Number(e.target.value)})} />
                    </div>
                   </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between bg-blue-600 p-6 rounded-3xl text-white">
                <div>
                  <span className="text-xs font-bold opacity-80 uppercase">合计加工总费</span>
                  <div className="text-4xl font-black">¥{calculateTotal().toLocaleString()}</div>
                </div>
                <button type="submit" className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all">
                  确认开单
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManager;
