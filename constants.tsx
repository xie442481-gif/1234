
import { PrintingMethod, SettlementStatus } from './types';

export const INITIAL_METHODS: PrintingMethod[] = [
  // --- 传统胶印类 (1-8) ---
  {
    id: 'm_01',
    name: '1. 胶印合版 (名片/彩页)',
    description: '拼版印刷，极低成本，不支持跟色',
    colors: [
      {
        id: 'c_gang',
        name: '合版四色',
        sizes: [
          {
            id: 's_flyer',
            name: 'A4单页 (157g铜版)',
            unit: '张',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 500, price: 150, mode: 'fixed' }, // 500张以下固定150元
              { minQty: 501, maxQty: 1000, price: 180, mode: 'fixed' }, // 1000张固定180元
              { minQty: 1001, maxQty: 2000, price: 300, mode: 'fixed' },
              { minQty: 2001, maxQty: '∞', price: 0.12, mode: 'unit' } // 超过2000张按单张算
            ],
            additionalOptions: []
          }
        ]
      }
    ]
  },
  {
    id: 'm_02',
    name: '2. 胶印专版 (画册/书刊)',
    description: '独立开机，可跟色，质量高',
    colors: [
      {
        id: 'c_offset_4c',
        name: '正度四色',
        sizes: [
          {
            id: 's_offset_a4',
            name: 'A4 画册内页 (1P)',
            unit: '张',
            priceUnitQty: 1000,
            pricingModel: 'startup',
            startupFee: 300,
            includedQty: 1000,
            extraUnitPrice: 20,
            tiers: [],
            additionalOptions: [
              { id: 'opt_ctp', name: 'CTP出版费', price: 120, mode: 'fixed' },
              { id: 'opt_paper', name: '128g铜版纸费', price: 220, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_03',
    name: '3. 专色信封 (胶印)',
    description: '标准西式信封，专色印刷',
    colors: [
      {
        id: 'c_spot_1',
        name: '单专色',
        sizes: [
          {
            id: 's_dl',
            name: 'DL标准信封 (220x110)',
            unit: '个',
            priceUnitQty: 1000,
            pricingModel: 'startup',
            startupFee: 200,
            includedQty: 1000,
            extraUnitPrice: 50,
            tiers: [],
            additionalOptions: [
              { id: 'opt_glue', name: '口胶费', price: 10, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_04',
    name: '4. 包装卡盒 (胶印)',
    description: '白卡纸/金银卡纸，对开机',
    colors: [
      {
        id: 'c_box_4c',
        name: '四色+光油',
        sizes: [
          {
            id: 's_box_std',
            name: '药盒/化妆品盒',
            unit: '个',
            priceUnitQty: 1000,
            pricingModel: 'startup',
            startupFee: 800,
            includedQty: 0,
            extraUnitPrice: 80,
            tiers: [],
            additionalOptions: [
              { id: 'opt_die', name: '模切费', price: 40, mode: 'unit' },
              { id: 'opt_paste', name: '自动糊盒', price: 30, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_05',
    name: '5. 手提袋 (单张胶印)',
    description: '厚纸印刷，含人工穿绳',
    colors: [
      {
        id: 'c_bag_4c',
        name: '四色印刷',
        sizes: [
          {
            id: 's_bag_m',
            name: '中号手提袋',
            unit: '个',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 500, price: 3000, mode: 'fixed' }, // 500个一口价
              { minQty: 501, maxQty: 2000, price: 4.5, mode: 'unit' },
              { minQty: 2001, maxQty: '∞', price: 3.8, mode: 'unit' }
            ],
            additionalOptions: [
              { id: 'opt_rope', name: '特种棉绳', price: 0.5, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_06',
    name: '6. 挂历/台历 (专版)',
    description: '季节性产品，含圈装',
    colors: [
      {
        id: 'c_cal',
        name: '双面彩色',
        sizes: [
          {
            id: 's_cal_desk',
            name: '台历 (13张)',
            unit: '本',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 200, price: 15, mode: 'unit' },
              { minQty: 201, maxQty: 1000, price: 12, mode: 'unit' },
              { minQty: 1001, maxQty: '∞', price: 8, mode: 'unit' }
            ],
            additionalOptions: [
              { id: 'opt_foil', name: '封面烫金', price: 0.5, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_07',
    name: '7. 档案袋 (胶印)',
    description: '牛皮纸，专色',
    colors: [
      {
        id: 'c_kraft',
        name: '单黑印刷',
        sizes: [
          {
            id: 's_filebag',
            name: '标准档案袋',
            unit: '个',
            priceUnitQty: 1000,
            pricingModel: 'startup',
            startupFee: 150,
            includedQty: 1000,
            extraUnitPrice: 30,
            tiers: [],
            additionalOptions: [
              { id: 'opt_string', name: '缠绳扣', price: 0.2, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_08',
    name: '8. 书刊内页 (轮转)',
    description: '卷筒纸，适合大批量书刊',
    colors: [
      {
        id: 'c_web_bw',
        name: '双面单黑',
        sizes: [
          {
            id: 's_ream',
            name: '每令 (500张全开)',
            unit: '令',
            priceUnitQty: 1,
            pricingModel: 'startup',
            startupFee: 800,
            includedQty: 5,
            extraUnitPrice: 25,
            tiers: [],
            additionalOptions: []
          }
        ]
      }
    ]
  },

  // --- 数码快印类 (9-14) ---
  {
    id: 'm_09',
    name: '9. 数码名片 (HP Indigo)',
    description: '立等可取，高精度',
    colors: [
      {
        id: 'c_digi_color',
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
              { minQty: 1, maxQty: 2, price: 50, mode: 'fixed' },
              { minQty: 3, maxQty: 10, price: 20, mode: 'unit' },
              { minQty: 11, maxQty: '∞', price: 15, mode: 'unit' }
            ],
            additionalOptions: []
          }
        ]
      }
    ]
  },
  {
    id: 'm_10',
    name: '10. 数码标书 (激光)',
    description: '会议资料，胶装',
    colors: [
      {
        id: 'c_doc_color',
        name: 'A4 彩色',
        sizes: [
          {
            id: 's_page',
            name: 'P (面)',
            unit: '面',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 50, price: 1.5, mode: 'unit' },
              { minQty: 51, maxQty: 200, price: 1.0, mode: 'unit' },
              { minQty: 201, maxQty: '∞', price: 0.8, mode: 'unit' }
            ],
            additionalOptions: [
              { id: 'opt_bind_glue', name: '无线胶装费', price: 5, mode: 'unit' } // 按本算，这里需注意单位换算逻辑，暂简化
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_11',
    name: '11. 试卷/讲义 (速印)',
    description: '一体机，成本极低',
    colors: [
      {
        id: 'c_riso',
        name: '黑色',
        sizes: [
          {
            id: 's_b4',
            name: 'B4 试卷',
            unit: '张',
            priceUnitQty: 1,
            pricingModel: 'startup',
            startupFee: 5, // 制版费
            includedQty: 0,
            extraUnitPrice: 0.08,
            tiers: [],
            additionalOptions: []
          }
        ]
      }
    ]
  },
  {
    id: 'm_12',
    name: '12. 可变数据优惠券',
    description: '每张带唯一二维码',
    colors: [
      {
        id: 'c_vdp',
        name: '彩色单面',
        sizes: [
          {
            id: 's_coupon',
            name: '210x90mm',
            unit: '张',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 1000, price: 0.5, mode: 'unit' },
              { minQty: 1001, maxQty: '∞', price: 0.3, mode: 'unit' }
            ],
            additionalOptions: [
              { id: 'opt_code', name: '数据处理费', price: 0.05, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_13',
    name: '13. 艺术微喷 (Giclee)',
    description: '收藏级打印，按平米或张',
    colors: [
      {
        id: 'c_11color',
        name: '11色原装墨',
        sizes: [
          {
            id: 's_m2_art',
            name: '哈内姆勒相纸',
            unit: 'm²',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: '∞', price: 350, mode: 'unit' }
            ],
            additionalOptions: []
          }
        ]
      }
    ]
  },
  {
    id: 'm_14',
    name: '14. 数码不干胶 (模切)',
    description: '异形切割，无需刀模',
    colors: [
      {
        id: 'c_sticker',
        name: 'PVC防水',
        sizes: [
          {
            id: 's_sticker_a3',
            name: 'A3幅面',
            unit: '张',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 10, price: 15, mode: 'unit' },
              { minQty: 11, maxQty: 50, price: 12, mode: 'unit' },
              { minQty: 51, maxQty: '∞', price: 10, mode: 'unit' }
            ],
            additionalOptions: []
          }
        ]
      }
    ]
  },

  // --- 大幅面/喷绘类 (15-19) ---
  {
    id: 'm_15',
    name: '15. 户外喷绘布 (Banner)',
    description: '3.2米/5米宽幅，抗风抗晒',
    colors: [
      {
        id: 'c_out',
        name: '520布',
        sizes: [
          {
            id: 's_m2_ban',
            name: '平方米',
            unit: 'm²',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 50, price: 12, mode: 'unit' },
              { minQty: 51, maxQty: '∞', price: 10, mode: 'unit' }
            ],
            additionalOptions: [
              { id: 'opt_eyelet', name: '打扣费', price: 0, mode: 'fixed' } // 免费
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_16',
    name: '16. 室内写真 (PP/背胶)',
    description: '高精度，易起泡，需覆膜',
    colors: [
      {
        id: 'c_indoor',
        name: '1440dpi',
        sizes: [
          {
            id: 's_m2_pp',
            name: '平方米',
            unit: 'm²',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 10, price: 25, mode: 'unit' },
              { minQty: 11, maxQty: '∞', price: 20, mode: 'unit' }
            ],
            additionalOptions: [
              { id: 'opt_lam', name: '冷裱膜', price: 5, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_17',
    name: '17. KT板展板',
    description: '5mm板 + 画面',
    colors: [
      {
        id: 'c_kt',
        name: '标准',
        sizes: [
          {
            id: 's_m2_kt',
            name: '平方米',
            unit: 'm²',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: '∞', price: 35, mode: 'unit' }
            ],
            additionalOptions: [
              { id: 'opt_frame', name: '包边条', price: 5, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_18',
    name: '18. 易拉宝 (Roll-up)',
    description: '含架子+画面+便携包',
    colors: [
      {
        id: 'c_roll',
        name: '80x200cm',
        sizes: [
          {
            id: 's_set',
            name: '套',
            unit: '套',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 5, price: 80, mode: 'unit' },
              { minQty: 6, maxQty: '∞', price: 65, mode: 'unit' }
            ],
            additionalOptions: []
          }
        ]
      }
    ]
  },
  {
    id: 'm_19',
    name: '19. UV平板打印 (亚克力)',
    description: '直接在硬质材料上打印',
    colors: [
      {
        id: 'c_uv_flat',
        name: '彩白彩',
        sizes: [
          {
            id: 's_m2_uv',
            name: '平方米',
            unit: 'm²',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: '∞', price: 120, mode: 'unit' }
            ],
            additionalOptions: [
               { id: 'opt_white', name: '铺白底', price: 20, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },

  // --- 标签/包装/特种 (20-30) ---
  {
    id: 'm_20',
    name: '20. 卷筒不干胶 (柔版)',
    description: '适合贴标机，量大',
    colors: [
      {
        id: 'c_flexo',
        name: '6色+冷烫',
        sizes: [
          {
            id: 's_label_roll',
            name: '标签 (千个价)',
            unit: '个',
            priceUnitQty: 1000,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 20000, price: 1500, mode: 'fixed' },
              { minQty: 20001, maxQty: '∞', price: 60, mode: 'unit' } // 每千个60
            ],
            additionalOptions: [
              { id: 'opt_plate', name: '树脂版费', price: 300, mode: 'fixed' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_21',
    name: '21. 瓦楞纸箱 (水印)',
    description: '快递箱/搬家箱，精度低',
    colors: [
      {
        id: 'c_water',
        name: '单色水印',
        sizes: [
          {
            id: 's_carton',
            name: '个',
            unit: '个',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 500, price: 5, mode: 'unit' },
              { minQty: 501, maxQty: '∞', price: 3.5, mode: 'unit' }
            ],
            additionalOptions: [
              { id: 'opt_big_plate', name: '柔性版费', price: 100, mode: 'fixed' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_22',
    name: '22. 塑料软包 (凹印)',
    description: '食品袋/面膜袋，制版贵',
    colors: [
      {
        id: 'c_gravure',
        name: '8色印刷',
        sizes: [
          {
            id: 's_pouch',
            name: '个',
            unit: '个',
            priceUnitQty: 1000,
            pricingModel: 'startup',
            startupFee: 2000, // 开机
            includedQty: 0,
            extraUnitPrice: 80, // 每千个工费
            tiers: [],
            additionalOptions: [
              { id: 'opt_cyl', name: '电雕版费 (8支)', price: 8000, mode: 'fixed' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_23',
    name: '23. 纸杯 (淋膜纸)',
    description: '专用纸杯机印刷成型',
    colors: [
      {
        id: 'c_cup',
        name: '4色',
        sizes: [
          {
            id: 's_cup_9oz',
            name: '9盎司纸杯',
            unit: '个',
            priceUnitQty: 1000,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
              { minQty: 1, maxQty: 50000, price: 100, mode: 'unit' }, // 每千个
              { minQty: 50001, maxQty: '∞', price: 80, mode: 'unit' }
            ],
            additionalOptions: []
          }
        ]
      }
    ]
  },
  {
    id: 'm_24',
    name: '24. 织带/挂绳 (热转印)',
    description: '证件挂绳，全彩',
    colors: [
      {
        id: 'c_heat',
        name: '双面',
        sizes: [
          {
            id: 's_lanyard',
            name: '条',
            unit: '条',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
               { minQty: 1, maxQty: 100, price: 5, mode: 'unit' },
               { minQty: 101, maxQty: '∞', price: 2.5, mode: 'unit' }
            ],
            additionalOptions: [
               { id: 'opt_hook', name: '金属扣', price: 0.5, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_25',
    name: '25. 丝网印刷 (T恤/无纺布)',
    description: '手工或半自动，适合布料',
    colors: [
      {
        id: 'c_screen_1c',
        name: '单色',
        sizes: [
          {
            id: 's_print',
            name: '印次',
            unit: '次',
            priceUnitQty: 1,
            pricingModel: 'startup',
            startupFee: 100, // 网版费
            includedQty: 0,
            extraUnitPrice: 1.5,
            tiers: [],
            additionalOptions: []
          }
        ]
      }
    ]
  },
  {
    id: 'm_26',
    name: '26. 移印 (笔/U盘)',
    description: '曲面微型印刷',
    colors: [
      {
        id: 'c_pad',
        name: '单色',
        sizes: [
          {
            id: 's_hit',
            name: '个',
            unit: '个',
            priceUnitQty: 1,
            pricingModel: 'startup',
            startupFee: 50, // 钢板费
            includedQty: 0,
            extraUnitPrice: 0.5,
            tiers: [],
            additionalOptions: []
          }
        ]
      }
    ]
  },
  {
    id: 'm_27',
    name: '27. 贺卡 (烫金/凹凸)',
    description: '后道工艺为主',
    colors: [
      {
        id: 'c_finish',
        name: '特种纸+烫金',
        sizes: [
          {
            id: 's_card_inv',
            name: '张',
            unit: '张',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
               { minQty: 1, maxQty: 200, price: 500, mode: 'fixed' }, // 200张一口价
               { minQty: 201, maxQty: '∞', price: 2.5, mode: 'unit' }
            ],
            additionalOptions: [
               { id: 'opt_plate_foil', name: '烫金版费', price: 100, mode: 'fixed' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_28',
    name: '28. 封套 (胶印+模切)',
    description: '带兜文件夹',
    colors: [
      {
        id: 'c_folder',
        name: '四色',
        sizes: [
          {
            id: 's_folder_std',
            name: '个',
            unit: '个',
            priceUnitQty: 1000,
            pricingModel: 'startup',
            startupFee: 600,
            includedQty: 0,
            extraUnitPrice: 50,
            tiers: [],
            additionalOptions: [
              { id: 'opt_die_folder', name: '模切加工', price: 20, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_29',
    name: '29. 笔记本定制',
    description: '皮面烫印+内页插页',
    colors: [
      {
        id: 'c_notebook',
        name: 'Logo压印',
        sizes: [
          {
            id: 's_nb',
            name: '本',
            unit: '本',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
               { minQty: 1, maxQty: 50, price: 25, mode: 'unit' },
               { minQty: 51, maxQty: '∞', price: 18, mode: 'unit' }
            ],
            additionalOptions: [
               { id: 'opt_insert', name: '彩页插页', price: 1, mode: 'unit' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm_30',
    name: '30. 其它杂件 (工时)',
    description: '手工包装、分拣等',
    colors: [
      {
        id: 'c_labor',
        name: '人工',
        sizes: [
          {
            id: 's_hour',
            name: '工时',
            unit: '小时',
            priceUnitQty: 1,
            pricingModel: 'tier',
            startupFee: 0,
            includedQty: 0,
            extraUnitPrice: 0,
            tiers: [
               { minQty: 1, maxQty: '∞', price: 30, mode: 'unit' }
            ],
            additionalOptions: []
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
