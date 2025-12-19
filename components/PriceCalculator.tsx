
import React, { useState, useMemo } from 'react';
import { PrintingMethod } from '../types';

interface PriceCalculatorProps {
  methods: PrintingMethod[];
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ methods }) => {
  const [mId, setMId] = useState('');
  const [cId, setCId] = useState('');
  const [sId, setSId] = useState('');
  const [qty, setQty] = useState(100);
  const [selectedOptIds, setSelectedOptIds] = useState<string[]>([]);

  const selectedMethod = methods.find(m => m.id === mId);
  const selectedColor = selectedMethod?.colors.find(c => c.id === cId);
  const selectedSize = selectedColor?.sizes.find(s => s.id === sId);

  // 当切换规格时，重置选中的附加费
  React.useEffect(() => {
    setSelectedOptIds([]);
  }, [sId]);

  const toggleOption = (id: string) => {
    if (selectedOptIds.includes(id)) {
      setSelectedOptIds(selectedOptIds.filter(i => i !== id));
    } else {
      setSelectedOptIds([...selectedOptIds, id]);
    }
  };

  const calculation = useMemo(() => {
    if (!selectedSize) return { base: 0, extra: 0, total: 0 };
    
    let basePrice = 0;
    const baseUnit = selectedSize.priceUnitQty || 1; 
    const model = selectedSize.pricingModel || (selectedSize.startupFee > 0 ? 'startup' : 'tier');

    if (model === 'startup') {
      const extraQty = Math.max(0, qty - selectedSize.includedQty);
      basePrice = selectedSize.startupFee + ((extraQty / baseUnit) * selectedSize.extraUnitPrice);
    } else {
      // 阶梯模式 (支持 unit 和 fixed)
      const tier = selectedSize.tiers.find(t => 
        qty >= t.minQty && (t.maxQty === '∞' || qty <= (t.maxQty as number))
      );

      if (tier) {
        if (tier.mode === 'fixed') {
          // 一口价模式：价格就是总价
          basePrice = tier.price;
        } else {
          // 单价模式：价格 * (数量 / 基数)
          // 默认为 unit 模式
          basePrice = tier.price * (qty / baseUnit);
        }
      } else {
        basePrice = 0;
      }
    }

    // 计算附加费
    let extraPrice = 0;
    if (selectedSize.additionalOptions) {
      extraPrice = selectedSize.additionalOptions
        .filter(opt => selectedOptIds.includes(opt.id))
        .reduce((sum, opt) => {
          if (opt.mode === 'unit') {
             // 如果是按量计费：价格 * (数量 / 基数)
             return sum + (opt.price * (qty / baseUnit));
          } else {
             // 默认 Fixed 一口价
             return sum + opt.price;
          }
        }, 0);
    }

    return {
      base: basePrice,
      extra: extraPrice,
      total: basePrice + extraPrice
    };
  }, [selectedSize, qty, selectedOptIds]);

  return (
    <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-xl">🎯</div>
        <h3 className="text-xl font-black">快速算价器</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">1. 选择印刷方式</label>
          <select className="w-full bg-gray-800 border-none rounded-xl p-3 text-sm" value={mId} onChange={e => {setMId(e.target.value); setCId(''); setSId('');}}>
            <option value="">请选择...</option>
            {methods.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">2. 颜色</label>
            <select className="w-full bg-gray-800 border-none rounded-xl p-3 text-sm" value={cId} onChange={e => {setCId(e.target.value); setSId('');}} disabled={!mId}>
              <option value="">选择颜色</option>
              {selectedMethod?.colors.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">3. 尺寸/规格</label>
            <select className="w-full bg-gray-800 border-none rounded-xl p-3 text-sm" value={sId} onChange={e => setSId(e.target.value)} disabled={!cId}>
              <option value="">选择规格</option>
              {selectedColor?.sizes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
             <label className="text-[10px] font-bold text-gray-500 uppercase block">4. 输入数量</label>
          </div>
          <div className="relative">
             <input type="number" className="w-full bg-gray-800 border-none rounded-xl p-3 text-sm font-black text-blue-400" value={qty} onChange={e => setQty(Number(e.target.value))} />
             <span className="absolute right-4 top-3 text-xs text-gray-500 font-bold">{selectedSize?.unit || '张'}</span>
          </div>
        </div>

        {/* 附加选项区域 */}
        {selectedSize?.additionalOptions && selectedSize.additionalOptions.length > 0 && (
          <div className="pt-4 border-t border-gray-800">
             <label className="text-[10px] font-bold text-gray-500 uppercase block mb-2">5. 附加费用</label>
             <div className="grid grid-cols-2 gap-2">
               {selectedSize.additionalOptions.map(opt => (
                 <div 
                    key={opt.id}
                    onClick={() => toggleOption(opt.id)}
                    className={`cursor-pointer rounded-lg p-2 text-xs border transition-all flex justify-between items-center ${selectedOptIds.includes(opt.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-800 border-gray-800 text-gray-300 hover:border-gray-600'}`}
                 >
                   <span>{opt.name}</span>
                   <span className="font-bold">+¥{opt.price}
                      <span className="text-[9px] opacity-70 font-normal ml-1">
                        {opt.mode === 'unit' ? `/${selectedSize.priceUnitQty > 1 ? selectedSize.priceUnitQty : ''}${selectedSize.unit}` : ''}
                      </span>
                   </span>
                 </div>
               ))}
             </div>
          </div>
        )}

        <div className="pt-8 mt-4 border-t border-gray-800">
          <div className="flex justify-between items-end">
            <div>
               <span className="text-gray-400 text-sm font-bold block">估算总额</span>
               {calculation.extra > 0 && <span className="text-[10px] text-gray-500">(含附加费 ¥{calculation.extra.toFixed(2)})</span>}
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 block">RMB</span>
              <span className="text-4xl font-black text-blue-500">¥{calculation.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
