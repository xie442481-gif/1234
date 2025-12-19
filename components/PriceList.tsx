
import React, { useState } from 'react';
import { PriceItem, PriceCategory, CATEGORIES } from '../types';
import { CATEGORY_LABELS } from '../constants';

interface PriceListProps {
  prices: PriceItem[];
  setPrices: (prices: PriceItem[]) => void;
}

const PriceList: React.FC<PriceListProps> = ({ prices, setPrices }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Omit<PriceItem, 'id'>>({
    category: CATEGORIES[0],
    name: '',
    unit: '个',
    basePrice: 0,
    model: 'PerUnit'
  });

  const handleDelete = (id: string) => {
    setPrices(prices.filter(p => p.id !== id));
  };

  const handleAdd = () => {
    if (!newItem.name) return;
    setPrices([...prices, { ...newItem, id: Date.now().toString() }]);
    setIsAdding(false);
    setNewItem({ category: CATEGORIES[0], name: '', unit: '个', basePrice: 0, model: 'PerUnit' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-gray-900">标准加工价格库</h2>
          <p className="text-sm text-gray-500">维护工厂标准的各项工艺单价，作为报价依据</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all"
        >
          添加新工艺
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(CATEGORY_LABELS).map((cat) => (
          <div key={cat} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
              <span className="font-black text-gray-800">{CATEGORY_LABELS[cat]}</span>
              <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-gray-500">
                {prices.filter(p => p.category === cat).length} 项
              </span>
            </div>
            <div className="p-4 space-y-3">
              {prices.filter(p => p.category === cat).map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                  <div>
                    <div className="text-sm font-bold text-gray-700">{item.name}</div>
                    <div className="text-[10px] text-gray-400">单位：{item.unit}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-blue-600 font-black">¥{item.basePrice}</div>
                    <button onClick={() => handleDelete(item.id)} className="text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  </div>
                </div>
              ))}
              {prices.filter(p => p.category === cat).length === 0 && (
                <div className="text-center py-8 text-gray-300 text-xs italic">暂未设置</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl animate-in zoom-in duration-200">
            <h3 className="text-xl font-black mb-6">新增加工工艺单价</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">工艺分类</label>
                <select 
                  className="w-full border rounded-xl px-4 py-2"
                  value={newItem.category}
                  onChange={e => setNewItem({...newItem, category: e.target.value as PriceCategory})}
                >
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    // Explicitly cast v to string to avoid 'unknown' ReactNode error
                    <option key={k} value={k}>{(v as string)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">工艺名称</label>
                <input 
                  className="w-full border rounded-xl px-4 py-2"
                  placeholder="如：哑膜、骑马订"
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">计价单位</label>
                  <input 
                    className="w-full border rounded-xl px-4 py-2"
                    placeholder="如：个、张、本"
                    value={newItem.unit}
                    onChange={e => setNewItem({...newItem, unit: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">标准单价 (¥)</label>
                  <input 
                    type="number"
                    className="w-full border rounded-xl px-4 py-2 font-bold"
                    value={newItem.basePrice}
                    onChange={e => setNewItem({...newItem, basePrice: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setIsAdding(false)} className="flex-1 px-4 py-3 rounded-xl border font-bold text-gray-500">取消</button>
              <button onClick={handleAdd} className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold">保存单价</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceList;
