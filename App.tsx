
import React, { useState, useEffect } from 'react';
import PriceManager from './components/PriceManager';
import PriceCalculator from './components/PriceCalculator';
import { PrintingMethod } from './types';
import { INITIAL_METHODS } from './constants';

const App: React.FC = () => {
  // 核心状态：印刷报价矩阵
  const [methods, setMethods] = useState<PrintingMethod[]>(() => {
    const saved = localStorage.getItem('printflow_matrix_only_v1');
    return saved ? JSON.parse(saved) : INITIAL_METHODS;
  });

  // 持久化存储
  useEffect(() => {
    localStorage.setItem('printflow_matrix_only_v1', JSON.stringify(methods));
  }, [methods]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* 极简顶栏 */}
      <header className="bg-white border-b px-8 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center text-white text-xl shadow-xl">🖨️</div>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase">PrintMatrix</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">专业印刷费计算矩阵</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <span className="flex items-center gap-2 text-green-500">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            本地数据已同步
          </span>
        </div>
      </header>

      {/* 主界面布局 */}
      <main className="flex-1 p-8 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左侧：价格矩阵管理 */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-blue-600 rounded-[2rem] p-8 text-white mb-8 shadow-2xl shadow-blue-100">
            <h2 className="text-2xl font-black mb-2">印刷费报价模型</h2>
            <p className="text-blue-100 opacity-80 text-sm max-w-2xl">
              在这里详细管理您的印刷机台、颜色配置以及规格单价。
              系统将根据“机台 + 颜色 + 尺寸”构建三维价格矩阵，支持起步费和数量阶梯两种工业级计算模式。
            </p>
          </div>
          
          <PriceManager methods={methods} setMethods={setMethods} />
        </div>

        {/* 右侧：实时计算与逻辑说明 */}
        <div className="lg:col-span-3 space-y-6">
          <div className="sticky top-28">
            <PriceCalculator methods={methods} />
            
            <div className="mt-6 bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
              <h4 className="text-xs font-black text-gray-800 mb-4 flex items-center gap-2 uppercase tracking-widest">
                <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px]">?</span> 
                计价逻辑说明
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="text-blue-500 font-bold text-sm">01</div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">起步费优先</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed mt-1">若设置了开机费，公式：起步费 + (总数 - 包含量) × 超量单价。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="text-blue-500 font-bold text-sm">02</div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">数量阶梯</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed mt-1">若起步费为0，则根据订单总数自动匹配对应的阶梯区间单价。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="text-blue-500 font-bold text-sm">03</div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">动态矩阵</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed mt-1">支持无限添加印刷方式（机台）和颜色组合，实现全方位覆盖。</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">
        PrintMatrix Core - 仅专注印刷核心成本管理
      </footer>
    </div>
  );
};

export default App;
