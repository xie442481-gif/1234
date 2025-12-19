
import React, { useState, useEffect } from 'react';
import { PrintingMethod, SizeConfig, AdditionalOption } from '../types';

interface PriceManagerProps {
  methods: PrintingMethod[];
  setMethods: (methods: PrintingMethod[]) => void;
}

const PriceManager: React.FC<PriceManagerProps> = ({ methods, setMethods }) => {
  const [activeM, setActiveM] = useState<string>('');
  const [activeC, setActiveC] = useState<string>('');

  useEffect(() => {
    if (methods.length > 0) {
      if (!activeM || !methods.find(m => m.id === activeM)) {
        setActiveM(methods[0].id);
      }
    } else {
      if (activeM !== '') setActiveM('');
    }
  }, [methods, activeM]);

  const currentMethod = methods.find(m => m.id === activeM);

  useEffect(() => {
    if (currentMethod) {
      if (currentMethod.colors.length > 0) {
        if (!activeC || !currentMethod.colors.find(c => c.id === activeC)) {
          setActiveC(currentMethod.colors[0].id);
        }
      } else {
        if (activeC !== '') setActiveC('');
      }
    } else {
      if (activeC !== '') setActiveC('');
    }
  }, [currentMethod, activeC]);

  const currentColor = currentMethod?.colors.find(c => c.id === activeC);

  // --- CRUD Functions ---

  const addMethod = () => {
    const newId = `m_${Date.now()}`;
    const newMethod: PrintingMethod = {
      id: newId,
      name: '新印刷方式',
      description: '点击标题可重命名',
      colors: []
    };
    setMethods([...methods, newMethod]);
    setActiveM(newId);
    setActiveC('');
  };

  const deleteMethod = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newMethods = methods.filter(m => m.id !== id);
    setMethods(newMethods);
  };

  const updateMethodName = (id: string, newName: string) => {
    setMethods(methods.map(m => m.id === id ? { ...m, name: newName } : m));
  };

  const addColor = () => {
    if (!currentMethod) return;
    const newId = `c_${Date.now()}`;
    const newMethods = methods.map(m => {
      if (m.id === activeM) {
        return {
          ...m,
          colors: [...m.colors, { id: newId, name: '新颜色', sizes: [] }]
        };
      }
      return m;
    });
    setMethods(newMethods);
    setActiveC(newId);
  };

  const deleteColor = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newMethods = methods.map(m => {
      if (m.id === activeM) {
        return {
          ...m,
          colors: m.colors.filter(c => c.id !== id)
        };
      }
      return m;
    });
    setMethods(newMethods);
  };

  const updateColorName = (id: string, newName: string) => {
    const newMethods = methods.map(m => {
      if (m.id === activeM) {
        return {
          ...m,
          colors: m.colors.map(c => c.id === id ? { ...c, name: newName } : c)
        };
      }
      return m;
    });
    setMethods(newMethods);
  };

  const addSize = () => {
    if (!currentColor) return;
    const newSize: SizeConfig = {
      id: `s_${Date.now()}`,
      name: '新规格',
      unit: '张',
      priceUnitQty: 1,
      pricingModel: 'startup', 
      startupFee: 0,
      includedQty: 0,
      extraUnitPrice: 0,
      tiers: [],
      additionalOptions: []
    };

    const newMethods = methods.map(m => {
      if (m.id === activeM) {
        return {
          ...m,
          colors: m.colors.map(c => {
            if (c.id === activeC) {
              return { ...c, sizes: [...c.sizes, newSize] };
            }
            return c;
          })
        };
      }
      return m;
    });
    setMethods(newMethods);
  };

  const deleteSize = (sizeId: string) => {
    const newMethods = methods.map(m => {
      if (m.id === activeM) {
        return {
          ...m,
          colors: m.colors.map(c => {
            if (c.id === activeC) {
              return { ...c, sizes: c.sizes.filter(s => s.id !== sizeId) };
            }
            return c;
          })
        };
      }
      return m;
    });
    setMethods(newMethods);
  };

  const updateSizeField = (sizeId: string, field: keyof SizeConfig, value: any) => {
    const newMethods = methods.map(m => {
      if (m.id === activeM) {
        return {
          ...m,
          colors: m.colors.map(c => {
            if (c.id === activeC) {
              return {
                ...c,
                sizes: c.sizes.map(s => s.id === sizeId ? { ...s, [field]: value } : s)
              };
            }
            return c;
          })
        };
      }
      return m;
    });
    setMethods(newMethods);
  };

  // --- 智能辅助功能 ---
  
  const autoFixTiers = (sizeId: string, tiers: SizeConfig['tiers']) => {
    // 1. 按 MinQty 排序
    const sorted = [...tiers].sort((a, b) => a.minQty - b.minQty);
    
    // 2. 修正接缝
    const fixed = sorted.map((tier, idx) => {
      if (idx === 0) {
        return { ...tier, minQty: 1 };
      }
      const prevTier = sorted[idx - 1];
      // 如果上一级是无限大，这级其实是无效的，但为了逻辑严谨，我们先处理数字
      if (typeof prevTier.maxQty === 'number') {
        return { ...tier, minQty: prevTier.maxQty + 1 };
      }
      return tier;
    });

    updateSizeField(sizeId, 'tiers', fixed);
  };

  return (
    <div className="grid grid-cols-12 gap-8 h-[calc(100vh-200px)]">
      {/* 左侧列表 */}
      <div className="col-span-3 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50">
          <h3 className="font-black text-gray-800 text-xs uppercase tracking-widest">印刷方式</h3>
          <button 
            onClick={addMethod} 
            className="w-8 h-8 bg-black text-white rounded-xl flex items-center justify-center font-bold shadow-lg hover:bg-gray-800 active:scale-95 transition-all cursor-pointer"
          >
            +
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {methods.map(m => (
            <div key={m.id} className="relative group">
              <div
                onClick={() => setActiveM(m.id)}
                className={`w-full text-left px-4 py-4 rounded-2xl transition-all border-2 cursor-pointer ${
                  activeM === m.id 
                    ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-md' 
                    : 'border-transparent bg-white hover:bg-gray-50 text-gray-600'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <input 
                    className={`font-bold text-sm truncate flex-1 pr-2 bg-transparent outline-none ${activeM === m.id ? 'text-blue-900 placeholder-blue-300' : 'text-gray-800'}`}
                    value={m.name}
                    onChange={(e) => updateMethodName(m.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="输入名称"
                  />
                </div>
                <div className="flex justify-between items-center">
                   <p className="text-[10px] opacity-60 truncate flex-1">{m.description || '无描述'}</p>
                   <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">{m.colors.length}色</span>
                </div>
              </div>
              
              <button 
                onClick={(e) => deleteMethod(m.id, e)}
                className="absolute -right-2 -top-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all shadow-lg z-20 hover:scale-110 cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧详情 */}
      <div className="col-span-9 flex flex-col space-y-6">
        {/* 颜色 Tabs */}
        {activeM ? (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 min-h-[50px] scrollbar-hide">
            {currentMethod?.colors.map(c => (
              <div key={c.id} className="relative group flex-shrink-0">
                <div
                  onClick={() => setActiveC(c.id)}
                  className={`px-3 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border-2 cursor-pointer flex items-center gap-2 ${
                    activeC === c.id 
                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg' 
                      : 'border-gray-200 bg-white text-gray-500 hover:border-blue-300'
                  }`}
                >
                  <input 
                     value={c.name}
                     onChange={(e) => updateColorName(c.id, e.target.value)}
                     className={`bg-transparent outline-none w-20 text-center ${activeC === c.id ? 'text-white placeholder-blue-200' : 'text-gray-600'}`}
                     placeholder="颜色名称"
                  />
                </div>
                <button 
                  onClick={(e) => deleteColor(c.id, e)}
                  className="absolute -top-2 -right-1 w-5 h-5 bg-gray-200 text-gray-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-all shadow-sm cursor-pointer border border-white"
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              onClick={addColor} 
              className="px-5 py-2.5 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 text-xs font-bold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 flex-shrink-0 transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <div className="h-[50px] flex items-center text-gray-300 text-xs font-bold bg-gray-50 rounded-2xl px-6 border border-dashed">
            请先选择机台
          </div>
        )}

        {/* 规格明细 */}
        <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden flex flex-col relative">
          <div className="px-8 py-6 border-b flex justify-between items-center bg-white sticky top-0 z-20">
            <div>
              <h4 className="text-xl font-black text-gray-900 flex items-center gap-2">
                {currentMethod?.name || <span className="text-gray-300">...</span>} 
                <span className="text-gray-200 mx-2">/</span>
                <span className="text-blue-600">{currentColor?.name || <span className="text-gray-300 text-sm font-normal">...</span>}</span>
              </h4>
            </div>
            <button 
              onClick={addSize} 
              disabled={!currentColor}
              className="bg-black text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-lg hover:bg-gray-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
            >
              <span>+</span> 新增规格
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/30">
            {currentColor?.sizes.map(size => {
              const currentModel = size.pricingModel || (size.startupFee > 0 ? 'startup' : 'tier');

              return (
              <div key={size.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group">
                <button 
                  onClick={() => deleteSize(size.id)}
                  className="absolute top-6 right-6 text-gray-300 hover:text-red-500 text-xs font-bold transition-colors cursor-pointer z-10"
                >
                  删除 🗑️
                </button>

                {/* 规格头部信息 */}
                <div className="mb-4 pr-20 grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">规格名称</label>
                     <input 
                        value={size.name}
                        onChange={(e) => updateSizeField(size.id, 'name', e.target.value)}
                        className="text-lg font-black text-gray-800 bg-transparent border-b-2 border-transparent hover:border-gray-200 focus:border-blue-500 outline-none w-full transition-colors"
                        placeholder="例如：A4, 16开"
                     />
                   </div>
                   <div className="flex gap-2">
                     <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">计价单位</label>
                        <input 
                          value={size.unit || '张'}
                          onChange={(e) => updateSizeField(size.id, 'unit', e.target.value)}
                          className="w-full bg-gray-50 border-none rounded-lg px-2 py-1 text-sm font-bold text-gray-700"
                        />
                     </div>
                     <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">计价基数</label>
                        <input 
                          type="number"
                          value={size.priceUnitQty || 1}
                          onChange={(e) => updateSizeField(size.id, 'priceUnitQty', Number(e.target.value))}
                          className="w-full bg-gray-50 border-none rounded-lg px-2 py-1 text-sm font-bold text-blue-600"
                        />
                        <div className="text-[9px] text-gray-400 mt-0.5">1=单价, 1000=千价</div>
                     </div>
                   </div>
                </div>

                {/* 计价模式切换开关 */}
                <div className="mb-6 bg-gray-100 p-1 rounded-xl flex">
                  <button 
                    onClick={() => updateSizeField(size.id, 'pricingModel', 'startup')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      currentModel === 'startup' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    起步费+印工模式 (胶印)
                  </button>
                  <button 
                    onClick={() => updateSizeField(size.id, 'pricingModel', 'tier')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      currentModel === 'tier' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    混合阶梯模式 (数码/一口价)
                  </button>
                </div>
                
                {/* 模式 A: 起步费区域 */}
                {currentModel === 'startup' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 animate-in fade-in zoom-in duration-200">
                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                      <label className="block text-[10px] font-bold text-blue-400 uppercase mb-2">起步费/开机费 (¥)</label>
                      <input 
                        type="number"
                        className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-black text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none"
                        value={size.startupFee}
                        onChange={e => updateSizeField(size.id, 'startupFee', Number(e.target.value))}
                      />
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                      <label className="block text-[10px] font-bold text-blue-400 uppercase mb-2">含工数量 (如:1000)</label>
                      <input 
                        type="number"
                        className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-black text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none"
                        value={size.includedQty}
                        onChange={e => updateSizeField(size.id, 'includedQty', Number(e.target.value))}
                      />
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 relative">
                      <label className="block text-[10px] font-bold text-blue-400 uppercase mb-2">超量单价 (¥)</label>
                      <input 
                        type="number"
                        className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm font-black text-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                        value={size.extraUnitPrice}
                        onChange={e => updateSizeField(size.id, 'extraUnitPrice', Number(e.target.value))}
                      />
                      <div className="absolute bottom-2 right-4 text-[10px] text-blue-300 font-bold">
                        /{size.priceUnitQty === 1 ? size.unit : `${size.priceUnitQty}${size.unit}`}
                      </div>
                    </div>
                  </div>
                )}

                {/* 模式 B: 阶梯价区域 */}
                {currentModel === 'tier' && (
                  <div className="border-t border-dashed border-gray-200 pt-5 animate-in fade-in zoom-in duration-200">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black text-purple-500 uppercase bg-purple-50 px-2 py-1 rounded">
                           混合阶梯表
                         </span>
                         {/* 自动衔接按钮 */}
                         {size.tiers.length > 1 && (
                            <button 
                              onClick={() => autoFixTiers(size.id, size.tiers)}
                              className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded ml-2 hover:bg-green-100 cursor-pointer"
                              title="自动修正阶梯数值，使首尾相连"
                            >
                              ⚡ 自动衔接
                            </button>
                         )}
                      </div>
                      <button 
                        onClick={() => {
                          const newTiers = [...size.tiers, { minQty: 1, maxQty: '∞', price: 0, mode: 'unit' }];
                          updateSizeField(size.id, 'tiers', newTiers);
                        }}
                        className="text-purple-600 text-[10px] font-bold bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
                      >
                        + 添加阶梯
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-12 gap-2 text-[10px] text-gray-400 uppercase font-bold mb-1 px-2">
                        <div className="col-span-3 text-center">数量区间</div>
                        <div className="col-span-1"></div>
                        <div className="col-span-3 text-center">价格</div>
                        <div className="col-span-3 text-center">计价方式</div>
                      </div>
                      {size.tiers.map((tier, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm group/tier">
                          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-1 border border-gray-100">
                             <input 
                               type="number" 
                               className="w-16 bg-transparent text-center font-bold outline-none text-xs"
                               value={tier.minQty}
                               onChange={e => {
                                 const newTiers = [...size.tiers];
                                 newTiers[idx].minQty = Number(e.target.value);
                                 updateSizeField(size.id, 'tiers', newTiers);
                               }}
                             />
                             <span className="text-gray-300 mx-2">~</span>
                             <input 
                               className="w-16 bg-transparent text-center font-bold outline-none text-xs"
                               value={tier.maxQty}
                               onChange={e => {
                                 const newTiers = [...size.tiers];
                                 newTiers[idx].maxQty = e.target.value === '∞' ? '∞' : Number(e.target.value);
                                 updateSizeField(size.id, 'tiers', newTiers);
                               }}
                             />
                          </div>
                          <span className="text-gray-300">→</span>
                          <div className="flex items-center bg-purple-50/50 rounded-lg px-3 py-1 border border-purple-100 relative">
                             <span className="text-gray-400 text-xs mr-1">¥</span>
                             <input 
                               type="number" 
                               className="w-16 bg-transparent font-black text-purple-600 outline-none text-xs"
                               value={tier.price}
                               onChange={e => {
                                 const newTiers = [...size.tiers];
                                 newTiers[idx].price = Number(e.target.value);
                                 updateSizeField(size.id, 'tiers', newTiers);
                               }}
                             />
                          </div>
                          <div className="flex-1">
                             <select
                               value={tier.mode || 'unit'} // 默认兼容
                               onChange={e => {
                                 const newTiers = [...size.tiers];
                                 newTiers[idx].mode = e.target.value as 'unit' | 'fixed';
                                 updateSizeField(size.id, 'tiers', newTiers);
                               }}
                               className="bg-gray-100 text-xs rounded-lg px-2 py-1 w-full border-none outline-none font-bold text-gray-600"
                             >
                               <option value="unit">按单价(×数量)</option>
                               <option value="fixed">一口价(总额)</option>
                             </select>
                          </div>
                          <button 
                            onClick={() => {
                              const newTiers = size.tiers.filter((_, i) => i !== idx);
                              updateSizeField(size.id, 'tiers', newTiers);
                            }}
                            className="text-gray-300 hover:text-red-500 px-2 opacity-0 group-hover/tier:opacity-100 transition-opacity cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 附加费用区域 (通用) */}
                <div className="mt-6 border-t border-gray-100 pt-4">
                   <div className="flex justify-between items-center mb-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">额外附加费 (如：专色、换版、打样)</label>
                      <button 
                        onClick={() => {
                          const newOpts = [...(size.additionalOptions || []), { id: `opt_${Date.now()}`, name: '新费用', price: 0, mode: 'fixed' }];
                          updateSizeField(size.id, 'additionalOptions', newOpts);
                        }}
                        className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100"
                      >
                        + 添加费用项
                      </button>
                   </div>
                   <div className="space-y-2">
                     {(size.additionalOptions || []).map((opt, oIdx) => (
                       <div key={opt.id} className="flex items-center gap-2 group/opt">
                          <input 
                            className="bg-gray-50 border-none rounded px-2 py-1 text-xs font-bold w-full"
                            placeholder="费用名称"
                            value={opt.name}
                            onChange={(e) => {
                              const newOpts = [...size.additionalOptions];
                              newOpts[oIdx].name = e.target.value;
                              updateSizeField(size.id, 'additionalOptions', newOpts);
                            }}
                          />
                          <div className="flex items-center bg-gray-50 rounded px-2 py-1">
                            <span className="text-[10px] text-gray-400 mr-1">¥</span>
                            <input 
                              type="number"
                              className="bg-transparent border-none outline-none text-xs font-black w-16"
                              value={opt.price}
                              onChange={(e) => {
                                const newOpts = [...size.additionalOptions];
                                newOpts[oIdx].price = Number(e.target.value);
                                updateSizeField(size.id, 'additionalOptions', newOpts);
                              }}
                            />
                          </div>
                          
                          {/* 附加费计价模式选择 */}
                          <select
                             className="bg-gray-100 text-xs rounded px-2 py-1 border-none outline-none font-bold text-gray-600 w-24"
                             value={opt.mode || 'fixed'}
                             onChange={(e) => {
                                const newOpts = [...size.additionalOptions];
                                newOpts[oIdx].mode = e.target.value as 'fixed' | 'unit';
                                updateSizeField(size.id, 'additionalOptions', newOpts);
                             }}
                          >
                             <option value="fixed">一口价</option>
                             <option value="unit">按量({size.priceUnitQty > 1 ? `每${size.priceUnitQty}` : '每'}{size.unit})</option>
                          </select>

                          <button 
                             onClick={() => {
                               const newOpts = size.additionalOptions.filter((_, i) => i !== oIdx);
                               updateSizeField(size.id, 'additionalOptions', newOpts);
                             }}
                             className="text-gray-300 hover:text-red-500 px-1 opacity-0 group-hover/opt:opacity-100"
                          >
                            ×
                          </button>
                       </div>
                     ))}
                   </div>
                </div>

              </div>
              );
            })}

            {(!currentColor || currentColor.sizes.length === 0) && (
              <div className="flex flex-col items-center justify-center h-full text-gray-300 py-20">
                <div className="text-4xl mb-4 opacity-30">📏</div>
                <p className="text-xs font-bold">该颜色下暂无规格</p>
                <p className="text-[10px] mt-1 opacity-60">请点击右上角按钮添加</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceManager;
