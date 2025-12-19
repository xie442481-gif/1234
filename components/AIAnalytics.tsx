
import React, { useState } from 'react';
import { ProcessingOrder, AIAnalysisResult } from '../types';
import { analyzeProcessingData } from '../services/geminiService';

interface AIAnalyticsProps {
  orders: ProcessingOrder[];
}

const AIAnalytics: React.FC<AIAnalyticsProps> = ({ orders }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (orders.length === 0) return;
    setLoading(true);
    try {
      const data = await analyzeProcessingData(orders);
      setResult(data);
    } catch (err) {
      alert('AI 分析暂时不可用，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-indigo-900 rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-4 tracking-tight">智能经营决策助手</h2>
          <p className="text-indigo-200 text-lg max-w-xl mb-8 leading-relaxed">
            AI 将深度扫描您的加工费账单，识别核心客户价值，并提供精准的利润增长建议。
          </p>
          <button
            onClick={handleAnalyze}
            disabled={loading || orders.length === 0}
            className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? '正在深度分析数据...' : '开启 AI 经营洞察'}
          </button>
        </div>
        <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-10 duration-700">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-3">营收总结</h3>
            <p className="text-gray-600 leading-relaxed flex-1">{result.summary}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-3">客户洞察</h3>
            <p className="text-gray-600 leading-relaxed flex-1">{result.customerInsight}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-3">报价建议</h3>
            <p className="text-gray-600 leading-relaxed flex-1">{result.pricingAdvice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalytics;
