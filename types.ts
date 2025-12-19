
export interface PriceTier {
  minQty: number;
  maxQty: number | '∞';
  price: number;
  mode: 'unit' | 'fixed'; // 'unit'=按单价计算(乘数量), 'fixed'=区间一口价(不乘数量)
}

export type PricingModel = 'startup' | 'tier';

export interface AdditionalOption {
  id: string;
  name: string; 
  price: number;
  mode: 'fixed' | 'unit'; // 新增：支持 "一口价" 或 "按基数乘" (如每千印多少钱)
}

export interface SizeConfig {
  id: string;
  name: string;           // 如：大度8K, A4
  unit: string;           // 单位显示，如 "张", "m²", "令"
  priceUnitQty: number;   // 计价基数。1=按单价算，1000=按千张算
  pricingModel: PricingModel; // 计价模式选择
  startupFee: number;     // 起步费/开机费
  includedQty: number;    // 起步费包含的数量
  extraUnitPrice: number; // 超过起步量后的单价
  tiers: PriceTier[];     // 阶梯价格
  additionalOptions: AdditionalOption[]; // 额外附加费配置
}

export interface ColorOption {
  id: string;
  name: string;           // 如：单色, 四色, 专色
  sizes: SizeConfig[];
}

export interface PrintingMethod {
  id: string;
  name: string;           // 如：海德堡对开, 数码喷墨
  description?: string;
  colors: ColorOption[];
}

export type SettlementStatus = 'Unpaid' | 'Paid' | 'Processing';

export interface ProcessingOrder {
  id: string;
  customerName: string;
  projectName: string;
  quantity: number;
  printFee: number;
  laminationFee: number;
  bindingFee: number;
  dieCutFee: number;
  shippingFee: number;
  totalAmount: number;
  status: SettlementStatus;
  date: string;
  remark?: string;
}

export type PriceCategory = '传统胶印' | '数码快印' | '后道加工' | '大幅面/喷绘' | '设计服务';

export const CATEGORIES: PriceCategory[] = ['传统胶印', '数码快印', '后道加工', '大幅面/喷绘', '设计服务'];

export interface PriceItem {
  id: string;
  category: PriceCategory;
  name: string;
  unit: string;
  basePrice: number;
  model: 'PerUnit' | 'Fixed';
}

export interface AIAnalysisResult {
  summary: string;
  customerInsight: string;
  pricingAdvice: string;
}
