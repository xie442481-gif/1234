
import { PrintingMethod, SettlementStatus } from './types';

export const INITIAL_METHODS: PrintingMethod[] = [
  // 1. 商务画册内页 (胶印 - 起步费模式)
  {
    id: 'sim_1',
    name: '1. 商务画册内页 (胶印)',
    description: '海德堡对开机，适合批量画册',
    colors: [
      {
        id: 'c_cmyk',
        name: '双面四色',
        sizes: [
          {
            id: 's_a4_16p',
            name: '大度16开 (A4)',
            unit: '张',
            priceUnitQty: 1000,
            pricingModel: 'startup',
            startupFee: 300, // 开机费
            includedQty: 1000, // 含1000张
            extraUnitPrice: 15, // 超量每千张15元 (印工)
            tiers: [],
            additionalOptions: [
              { id: 'opt_plate', name: 'CTP出版费', price: 120, mode: 'fixed' }, // 4张版 * 30
              { id: 'opt_paper', name: '157g铜版纸款', price: 280, mode: 'unit' }  // 每千张纸款
            ]
          }
        ]
      }
    ]
  },
  // 2. 高端名片 (数码 - 混合阶梯)
  {
    id: 'sim_2',
    name: '2. 高端名片 (数码直印)',
    description: 'HP Indigo，适合急单/小批量',
    colors: [
      {
        id: 'c_color',
        name: '彩色双面',
        sizes: [
          {
            id: 's_card_box',
            name: '每盒 (100张)',
            unit: '盒',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 2, price: 50, mode: 'fixed' }, // 1-2盒 一口价50元
              { minQty: 3, maxQty: 10, price: 20, mode: 'unit' }, // 3-10盒 单价20元/盒
              { minQty: 11, maxQty: '∞', price: 15, mode: 'unit' } // 11盒+ 单价15元/盒
            ],
            additionalOptions: [
               { id: 'opt_touch', name: '触感膜', price: 5, mode: 'unit' }, // 每盒+5元
               { id: 'opt_round', name: '圆角费', price: 2, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  // 3. 户外大喷 (喷绘 - 面积阶梯)
  {
    id: 'sim_3',
    name: '3. 户外灯箱布 (喷绘)',
    description: '3.2米宽幅，抗UV',
    colors: [
      {
        id: 'c_std',
        name: '标准精度',
        sizes: [
          {
            id: 's_m2',
            name: '按平方米计价',
            unit: 'm²',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
               { minQty: 1, maxQty: 20, price: 18, mode: 'unit' },
               { minQty: 21, maxQty: 100, price: 15, mode: 'unit' },
               { minQty: 101, maxQty: '∞', price: 12, mode: 'unit' }
            ],
            additionalOptions: [
               { id: 'opt_splice', name: '拼接费', price: 5, mode: 'unit' } // 每平米加5元拼接
            ]
          }
        ]
      }
    ]
  },
  // 4. 不干胶标签 (轮转/柔版 - 数量阶梯)
  {
    id: 'sim_4',
    name: '4. 卷筒不干胶 (柔版)',
    description: '自动贴标机用',
    colors: [
      {
        id: 'c_6c',
        name: '6色印刷',
        sizes: [
          {
            id: 's_label',
            name: '10x10cm标签',
            unit: '个',
            priceUnitQty: 1000, // 千个价
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
               { minQty: 1, maxQty: 10000, price: 1000, mode: 'fixed' }, // 起订量1万个以内，一口价1000元
               { minQty: 10001, maxQty: 50000, price: 80, mode: 'unit' }, // 每千个80元
               { minQty: 50001, maxQty: '∞', price: 60, mode: 'unit' }
            ],
            additionalOptions: [
               { id: 'opt_knife', name: '刀模费', price: 200, mode: 'fixed' },
               { id: 'opt_gold', name: '冷烫金', price: 20, mode: 'unit' } // 每千个+20
            ]
          }
        ]
      }
    ]
  },
  // 5. 联单/收据 (速印 - 按本计价)
  {
    id: 'sim_5',
    name: '5. 无碳联单 (速印)',
    description: '二联/三联单，包含打码',
    colors: [
      {
        id: 'c_red_black',
        name: '黑红双色',
        sizes: [
          {
            id: 's_book',
            name: '16开 (50份/本)',
            unit: '本',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
               { minQty: 1, maxQty: 20, price: 150, mode: 'fixed' }, // 20本以内一口价
               { minQty: 21, maxQty: '∞', price: 6, mode: 'unit' }   // 超过按6元一本
            ],
            additionalOptions: [
               { id: 'opt_number', name: '打流水号', price: 0.5, mode: 'unit' } // 每本0.5
            ]
          }
        ]
      }
    ]
  },
  // 6. 包装彩盒 (胶印 + 后道 - 起步费)
  {
    id: 'sim_6',
    name: '6. 包装彩盒 (胶印)',
    description: '白卡纸，对开机印刷',
    colors: [
      {
        id: 'c_4c_1',
        name: '4色+光油',
        sizes: [
          {
            id: 's_box_big',
            name: '展开尺寸 700x500',
            unit: '个',
            priceUnitQty: 1000,
            pricingModel: 'startup',
            startupFee: 800, // 开机费(印+油)
            includedQty: 0,  // 不含料，纯开机
            extraUnitPrice: 100, // 每千印工费
            tiers: [],
            additionalOptions: [
               { id: 'opt_die_base', name: '模切开机费', price: 200, mode: 'fixed' },
               { id: 'opt_die_run', name: '模切加工费', price: 30, mode: 'unit' }, // 每千个
               { id: 'opt_glue', name: '糊盒费', price: 50, mode: 'unit' } // 每千个
            ]
          }
        ]
      }
    ]
  },
  // 7. 艺术画册/作品集 (艺术微喷)
  {
    id: 'sim_7',
    name: '7. 艺术微喷 (Giclee)',
    description: '爱普生11色，收藏级',
    colors: [
      {
        id: 'c_art',
        name: '原色',
        sizes: [
          {
            id: 's_a2',
            name: 'A2 尺寸',
            unit: '张',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
               { minQty: 1, maxQty: 1, price: 120, mode: 'unit' },
               { minQty: 2, maxQty: 9, price: 100, mode: 'unit' },
               { minQty: 10, maxQty: '∞', price: 80, mode: 'unit' }
            ],
            additionalOptions: [
               { id: 'opt_mount', name: '装裱费', price: 50, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  // 8. 宣传手提袋 (胶印)
  {
    id: 'sim_8',
    name: '8. 手提袋 (Paper Bag)',
    description: '250g白卡，含穿绳',
    colors: [
      {
        id: 'c_pantone',
        name: '双专色',
        sizes: [
          {
            id: 's_bag_std',
            name: '标准袋 (30x40x10)',
            unit: '个',
            priceUnitQty: 1, // 单价模式
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
               { minQty: 1, maxQty: 500, price: 2500, mode: 'fixed' }, // 500个一口价
               { minQty: 501, maxQty: 2000, price: 3.5, mode: 'unit' }, // 2000以内 3.5元
               { minQty: 2001, maxQty: '∞', price: 2.8, mode: 'unit' }
            ],
            additionalOptions: [
               { id: 'opt_rope', name: '更换三股绳', price: 0.2, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  // 9. 会议吊牌/证件 (UV平板)
  {
    id: 'sim_9',
    name: '9. PVC证件卡 (UV打印)',
    description: '亚克力/PVC材质',
    colors: [
      {
        id: 'c_uv',
        name: '彩白彩',
        sizes: [
          {
            id: 's_card',
            name: '85x54mm',
            unit: '张',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
               { minQty: 1, maxQty: 50, price: 5, mode: 'unit' },
               { minQty: 51, maxQty: '∞', price: 3, mode: 'unit' }
            ],
            additionalOptions: [
               { id: 'opt_data', name: '可变人名', price: 1, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  // 10. 书刊黑白内页 (轮转)
  {
    id: 'sim_10',
    name: '10. 书刊内页 (轮转胶印)',
    description: '55g轻型纸，1印张=16页',
    colors: [
      {
        id: 'c_bw',
        name: '双面单黑',
        sizes: [
          {
            id: 's_signature',
            name: '每印张 (16P)',
            unit: '令', // 1令=500张全开
            priceUnitQty: 1, 
            pricingModel: 'startup',
            startupFee: 600, // 轮转开机费较低但损耗大，这里简化
            includedQty: 5,  // 含5令
            extraUnitPrice: 25, // 超量每令印工
            tiers: [],
            additionalOptions: [
               { id: 'opt_plate', name: 'PS版费', price: 80, mode: 'fixed' } // 2张版
            ]
          }
        ]
      }
    ]
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  '传统胶印': '传统胶印',
  '数码快印': '数码快印',
  '后道加工': '后道加工',
  '大幅面/喷绘': '大幅面/喷绘',
  '设计服务': '设计服务'
};

export const STATUS_MAP: Record<SettlementStatus, { label: string; color: string }> = {
  'Unpaid': { label: '未对账', color: 'bg-red-100 text-red-600' },
  'Paid': { label: '已对账', color: 'bg-green-100 text-green-600' },
  'Processing': { label: '进行中', color: 'bg-blue-100 text-blue-600' }
};
