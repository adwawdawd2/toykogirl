export type ZoneId = "power" | "career" | "elite" | "tower" | "subculture" | "artsy";

export interface Neighborhood {
  id: string;
  name: string;
  nameEn: string;
  zone: ZoneId;
  persona: string;
  fashion: string;
  lifestyle: string;
  socialMedia: string;
  romance: string;
  peakTime: string;
  // Map position (relative % coordinates on the stylized map)
  mapX: number;
  mapY: number;
  unsplashQuery: string;
}

export interface Zone {
  id: ZoneId;
  name: string;
  subtitle: string;
  description: string;
  colorVar: string;
}

export const zones: Zone[] = [
  { id: "power", name: "权力资本区", subtitle: "港区及其周边", description: "资本流动的注脚，符号化的女性形象", colorVar: "zone-power" },
  { id: "career", name: "职业独立区", subtitle: "惠比寿、中目黑、代官山", description: "自费式高品质生活，审美自觉的独立群体", colorVar: "zone-career" },
  { id: "elite", name: "传统精英区", subtitle: "银座、丸之内、广尾", description: "制度化的成功与家族背景", colorVar: "zone-elite" },
  { id: "tower", name: "塔楼湾区", subtitle: "丰洲、武藏小杉、二子玉川", description: "标准化的幸福与阶层焦虑", colorVar: "zone-tower" },
  { id: "subculture", name: "亚文化区", subtitle: "涩谷、原宿、秋叶原、池袋", description: "数字空间与物理空间的高度同步表演", colorVar: "zone-subculture" },
  { id: "artsy", name: "文艺审美区", subtitle: "清澄白河、下北泽、代代木上原", description: "知识分子化的审美权力", colorVar: "zone-artsy" },
];

export const neighborhoods: Neighborhood[] = [
  // 权力资本区
  { id: "roppongi", name: "六本木", nameEn: "Roppongi", zone: "power", persona: "派对社交名媛", fashion: "极致高跟鞋、紧身连身裙、爱马仕、精致医美感", lifestyle: "香槟局、外资酒店下午茶、会员制俱乐部、直升机体验", socialMedia: "定位于Grand Hyatt或Ritz-Carlton，手持名贵酒杯，背景多为东京塔夜景", romance: "风险投资家、拥有私人飞机的实业家、极高收入的创意精英", peakTime: "22:00 - 03:00 (深夜)", mapX: 55, mapY: 52, unsplashQuery: "roppongi tokyo night" },
  { id: "nishiazabu", name: "西麻布", nameEn: "Nishi-Azabu", zone: "power", persona: "隐秘社交圈内人", fashion: "露肤度高的设计感私服、低调奢侈品、非LOGO款高级货", lifestyle: "隐藏式餐厅、深夜二次会、演艺圈人脉、秘密酒吧", socialMedia: "背景幽暗的高级吧台，画面中常出现不具名但极昂贵的配饰或名酒", romance: "制作人、IT外资高管、能够进入特定封闭社交圈的男性", peakTime: "23:00 - 02:00 (深夜)", mapX: 50, mapY: 55, unsplashQuery: "tokyo bar night luxury" },
  { id: "azabujuban", name: "麻布十番", nameEn: "Azabu-Juban", zone: "power", persona: "局部精英本地女性", fashion: "高级运动服(Lululemon)、瑜伽裤、路易威登定制手袋", lifestyle: "遛名贵犬、有机超市购物、熟人推荐餐厅、港区邻里社交", socialMedia: '极具生活感的高级料理照片，强调"在常去店"的舒适感而非炫耀感', romance: "继承家业的二代、低调的专业人士", peakTime: "10:00 - 14:00 (午间)", mapX: 52, mapY: 58, unsplashQuery: "azabu tokyo street" },
  // 职业独立区
  { id: "ebisu", name: "惠比寿", nameEn: "Ebisu", zone: "career", persona: '独立自强"艾比女"', fashion: "上品轻熟风、CLASSY杂志风、高质感通勤装", lifestyle: "瑜伽、健身房、适度饮酒后的女子会、经济独立", socialMedia: '充满自信的微笑自拍，展示生活平衡感，文案常提及"自我奖励"', romance: "相互尊重的同行伙伴、能够接受AA制的理智型男性", peakTime: "19:00 - 22:00 (晚间)", mapX: 48, mapY: 62, unsplashQuery: "ebisu tokyo cafe" },
  { id: "nakameguro", name: "中目黑", nameEn: "Nakameguro", zone: "career", persona: "樱花季文艺创作者", fashion: "复古混搭、亚麻材质、银饰、艺术感眼镜", lifestyle: "沿河散步、精酿啤酒、独立书店、小众香水", socialMedia: "具有胶片质感的风景照，配以简短深刻的文字", romance: "建筑师、独立音乐人、追求精神契合的自由职业者", peakTime: "17:00 - 21:00 (黄昏)", mapX: 42, mapY: 60, unsplashQuery: "nakameguro cherry blossom river" },
  { id: "daikanyama", name: "代官山", nameEn: "Daikanyama", zone: "career", persona: "精致生活美学家", fashion: "顶级设计师品牌、法式优雅、手工配饰", lifestyle: "露天咖啡厅午餐、寻找稀有香水、独立买手店", socialMedia: "极具美感的咖啡拉花与露台光影，风格清冷且审美统一", romance: "懂得品味的商业顾问、具有艺术鉴赏力的绅士", peakTime: "11:00 - 16:00 (下午)", mapX: 44, mapY: 58, unsplashQuery: "daikanyama tokyo fashion" },
  // 传统精英区
  { id: "ginza", name: "银座", nameEn: "Ginza", zone: "elite", persona: "阶层天花板女性", fashion: "和服、一线品牌套装、珍珠首饰、极简奢华", lifestyle: "歌舞伎欣赏、百货公司外商部、高额甜点、高级午餐", socialMedia: "构图严谨的法餐菜品，色调沉稳，很少露脸", romance: "具有深厚文化底蕴的财阀成员、成熟的政商领袖", peakTime: "13:00 - 17:00 (下午)", mapX: 62, mapY: 45, unsplashQuery: "ginza tokyo luxury shopping" },
  { id: "marunouchi", name: "丸之内", nameEn: "Marunouchi", zone: "elite", persona: "制度化精英职女", fashion: "熨烫平整的白衬衫、海军蓝西装、精品丝巾", lifestyle: "办公楼午餐、英语学习、职业晋升、金融市场", socialMedia: "展示工作咖啡与精致工位的剪影，带有明显的职业成就感", romance: '同为高学历、高收入的"高规格"男性', peakTime: "08:00 - 19:00 (工作日)", mapX: 65, mapY: 40, unsplashQuery: "marunouchi tokyo office business" },
  { id: "hiroo", name: "广尾", nameEn: "Hiroo", zone: "elite", persona: "国际化贵族淑女", fashion: "羊绒针织衫、米色系穿搭、极简风、高雅头饰", lifestyle: "国际学校接送、外籍交流、网球运动、慈善义卖", socialMedia: "低调的家庭聚餐照片，配文常涉及艺术展览或跨文化交流", romance: "具有海外留学背景、举止绅士的学术世家成员", peakTime: "10:00 - 16:00 (白昼)", mapX: 48, mapY: 54, unsplashQuery: "hiroo tokyo residential elegant" },
  { id: "omotesando", name: "表参道", nameEn: "Omotesando", zone: "elite", persona: "时尚引领者", fashion: "秀场先锋、国际大牌新品、前卫剪裁", lifestyle: "网红排队、时装周、品牌快闪店", socialMedia: "时尚街拍风格，背景为建筑设计感强的旗舰店", romance: "创意总监、时尚界人士", peakTime: "12:00 - 18:00 (下午)", mapX: 45, mapY: 48, unsplashQuery: "omotesando tokyo fashion architecture" },
  // 塔楼湾区
  { id: "toyosu", name: "丰洲", nameEn: "Toyosu", zone: "tower", persona: "湾区理智主妇", fashion: "塔楼标配穿搭、高尔夫服、轻奢品牌包", lifestyle: "湾区慢跑、BBQ、塔楼公共酒廊社交、夜景欣赏", socialMedia: "展示窗外东京塔或Skytree夜景，色调倾向于高级灰", romance: "年轻的外资银行家、高薪的科技新贵", peakTime: "18:00 - 21:00 (晚间)", mapX: 72, mapY: 55, unsplashQuery: "toyosu tokyo bay tower night" },
  { id: "musashikosugi", name: "武藏小杉", nameEn: "Musashi-Kosugi", zone: "tower", persona: "实用主义塔楼族", fashion: "品牌运动套装、优衣库联名款、高端婴儿车", lifestyle: "大型MALL血拼、儿童课外班、垂直城市生活", socialMedia: "购物中心顶层花园或儿童玩耍的瞬间", romance: "年收入稳定的企业骨干或高级公务员", peakTime: "10:00 - 18:00 (周末)", mapX: 30, mapY: 68, unsplashQuery: "tokyo tower apartment modern" },
  { id: "futakotamagawa", name: "二子玉川", nameEn: "Futako-Tamagawa", zone: "tower", persona: "多摩川贵妇", fashion: "宽檐帽、米色羊绒衫、欧洲品牌童装", lifestyle: "河边野餐、高端超市、亲子瑜伽、精致露营", socialMedia: '阳光明媚的公园绿地照，强调"自然中育儿"的优越感', romance: "事业有成且愿意回归家庭、重视教育质量的管理层", peakTime: "10:00 - 15:00 (日间)", mapX: 25, mapY: 72, unsplashQuery: "tokyo river park family" },
  // 亚文化区
  { id: "shibuya", name: "涩谷", nameEn: "Shibuya", zone: "subculture", persona: "Z世代潮流主导者", fashion: "街头风、辣妹装复刻、联名球鞋、夸张美甲", lifestyle: "推活、短视频拍摄、快闪店巡礼、虚拟社交", socialMedia: "极快剪辑的TikTok舞蹈，充满AR滤镜与动态特效", romance: "追求刺激、有共同爱好的潮流博主、社交红人", peakTime: "15:00 - 20:00 (傍晚)", mapX: 40, mapY: 50, unsplashQuery: "shibuya crossing tokyo neon" },
  { id: "harajuku", name: "原宿", nameEn: "Harajuku", zone: "subculture", persona: "极端审美表演者", fashion: "萝莉塔、地雷系、原宿风、夸张配饰", lifestyle: "角色扮演、甜点探店、租赁工作室摄影", socialMedia: "磨皮感极强的动漫大头照，满屏的粉色或暗黑哥特元素", romance: "能包容极端审美、共同进行角色创作的同好", peakTime: "12:00 - 18:00 (周六日)", mapX: 42, mapY: 44, unsplashQuery: "harajuku tokyo fashion colorful street" },
  { id: "akihabara", name: "秋叶原", nameEn: "Akihabara", zone: "subculture", persona: "核心宅向女性", fashion: "角色周边配饰、功能性服装、痛包", lifestyle: "游戏展会、声优活动、女仆咖啡厅打工", socialMedia: "满满的动漫周边、抽卡结果截图，带有明显的二次元色彩", romance: "能理解推活、具备技术极客气质的男性", peakTime: "11:00 - 19:00 (周六日)", mapX: 65, mapY: 32, unsplashQuery: "akihabara tokyo anime neon" },
  { id: "ikebukuro", name: "池袋", nameEn: "Ikebukuro", zone: "subculture", persona: "腐向同人女性", fashion: "遮盖力强的休闲装、深度眼镜、超大容量包", lifestyle: "乙女游戏、同人志购买、声优演唱会", socialMedia: "充满角色立牌合影的照片，社交圈层高度封闭", romance: "纸面上的虚拟角色，或现实中温和的草食男", peakTime: "13:00 - 18:00 (周末)", mapX: 50, mapY: 25, unsplashQuery: "ikebukuro tokyo city" },
  // 文艺审美区
  { id: "kiyosumishirakawa", name: "清澄白河", nameEn: "Kiyosumi-Shirakawa", zone: "artsy", persona: "第三波咖啡文青", fashion: "极简白T恤、水洗牛仔裤、帆布包", lifestyle: "咖啡豆溯源、仓库画廊、手作市集", socialMedia: "以Blue Bottle或咖啡拉花为中心的极简构图", romance: "具有工匠精神的手工艺人、慢生活倡导者", peakTime: "10:00 - 14:00 (午间)", mapX: 73, mapY: 38, unsplashQuery: "tokyo coffee shop minimal" },
  { id: "shimokitazawa", name: "下北泽", nameEn: "Shimokitazawa", zone: "artsy", persona: "古着怀旧少女", fashion: "二手古着、oversized、民族风饰品", lifestyle: "剧场看戏、二手黑胶、咖喱巡礼", socialMedia: "暖色调的复古街景，展示挖掘到的孤品古着", romance: "怀才不遇的演员、地下乐队主唱、注重灵魂交流者", peakTime: "14:00 - 20:00 (下午)", mapX: 33, mapY: 50, unsplashQuery: "shimokitazawa tokyo vintage street" },
  { id: "yoyogiuehara", name: "代代木上原", nameEn: "Yoyogi-Uehara", zone: "artsy", persona: "极简主义精英", fashion: "中性色、高品质面料、极简廓形", lifestyle: "天然酒、独立家具店、精品咖啡", socialMedia: "强调光影与室内空间质感的冷淡风格", romance: "具有全球视野、审美极其严苛的设计师", peakTime: "09:00 - 12:00 (晨间)", mapX: 37, mapY: 42, unsplashQuery: "tokyo minimal architecture" },
  // 额外街区
  { id: "koenji", name: "高円寺", nameEn: "Koenji", zone: "artsy", persona: "朋克叛逆者", fashion: "摇滚破洞、皮夹克、DIY配饰", lifestyle: "居酒屋、摇滚Live、阿波舞", socialMedia: "颗粒感强的Live现场照", romance: "自由灵魂", peakTime: "20:00 - 02:00 (深夜)", mapX: 28, mapY: 35, unsplashQuery: "koenji tokyo punk street" },
  { id: "kagurazaka", name: "神乐坂", nameEn: "Kagurazaka", zone: "elite", persona: "文学新女性", fashion: "淡雅和风、文学少女装", lifestyle: "法餐、石径散步、出版社", socialMedia: "文学感强的街景与书影", romance: "资深编辑、文化人", peakTime: "11:00 - 17:00 (下午)", mapX: 58, mapY: 30, unsplashQuery: "kagurazaka tokyo traditional" },
  { id: "jiyugaoka", name: "自由之丘", nameEn: "Jiyugaoka", zone: "tower", persona: "审美主妇", fashion: "浅色针织、优雅裙装", lifestyle: "甜点巡礼、家居杂货", socialMedia: "精致甜点与花束搭配", romance: "稳定企业员工", peakTime: "10:00 - 16:00 (下午)", mapX: 35, mapY: 65, unsplashQuery: "jiyugaoka tokyo sweets" },
  { id: "kichijoji", name: "吉祥寺", nameEn: "Kichijoji", zone: "artsy", persona: "森林系女孩", fashion: "棉麻长裙、草帽、自然色系", lifestyle: "井之头公园散步、手作杂货", socialMedia: "绿意盎然的公园与猫咪照", romance: "温和的工程师", peakTime: "10:00 - 17:00 (白天)", mapX: 18, mapY: 38, unsplashQuery: "inokashira park tokyo nature" },
  { id: "sangenjaya", name: "三轩茶屋", nameEn: "Sangenjaya", zone: "artsy", persona: "烟火气少女", fashion: "卫衣牛仔、帆布鞋", lifestyle: "深夜食堂、小剧场", socialMedia: "深夜居酒屋的暖黄灯光", romance: "邻家男孩", peakTime: "19:00 - 01:00 (深夜)", mapX: 32, mapY: 58, unsplashQuery: "tokyo izakaya night cozy" },
  { id: "shinookubo", name: "新大久保", nameEn: "Shin-Okubo", zone: "subculture", persona: "K-POP迷", fashion: "韩系穿搭、韩妆", lifestyle: "韩餐、韩妆、K-POP应援", socialMedia: "韩食探店与偶像周边", romance: "韩系精致男", peakTime: "12:00 - 20:00 (下午)", mapX: 48, mapY: 32, unsplashQuery: "shin okubo tokyo korean" },
  { id: "asakusa", name: "浅草", nameEn: "Asakusa", zone: "elite", persona: "传统复兴者", fashion: "复古和服、传统纹样", lifestyle: "参拜、传统甜点、人力车", socialMedia: "雷门与和服自拍", romance: "稳重的传统男性", peakTime: "09:00 - 17:00 (白天)", mapX: 70, mapY: 28, unsplashQuery: "asakusa senso-ji tokyo temple" },
  { id: "ueno", name: "上野", nameEn: "Ueno", zone: "artsy", persona: "知识探索者", fashion: "舒适知性、学院风", lifestyle: "博物馆、动物园、美术展", socialMedia: "展览打卡与学术书影", romance: "学术研究员", peakTime: "10:00 - 17:00 (白天)", mapX: 66, mapY: 25, unsplashQuery: "ueno park tokyo museum" },
  { id: "kitasenju", name: "北千住", nameEn: "Kita-Senju", zone: "tower", persona: "现实生存者", fashion: "亲民实用、快时尚", lifestyle: "商店街、居酒屋、实惠饮食", socialMedia: "热闹商店街的日常记录", romance: "豪爽青年", peakTime: "17:00 - 23:00 (晚间)", mapX: 72, mapY: 18, unsplashQuery: "tokyo shopping street night" },
  { id: "machida", name: "町田", nameEn: "Machida", zone: "subculture", persona: "边境挑战者", fashion: "涩谷复刻、潮牌仿版", lifestyle: "大型商场、卡拉OK", socialMedia: "模仿涩谷风格的街拍", romance: "野心青年", peakTime: "14:00 - 21:00 (下午)", mapX: 15, mapY: 75, unsplashQuery: "tokyo suburb shopping" },
];

// Pre-curated Unsplash photo IDs

// Pre-curated photo IDs for each neighborhood
const photoMap: Record<string, string> = {
  "roppongi": "1540959733332-eab4deabeeaf",
  "nishiazabu": "1514933651103-005eec06c04b",
  "azabujuban": "1528360983277-13d401cdc186",
  "ebisu": "1509042239860-f550ce710b93",
  "nakameguro": "1522383225653-ed111181a951",
  "daikanyama": "1495474472287-4d71bcdd2085",
  "ginza": "1542051841857-5f90071e7989",
  "marunouchi": "1486406146926-c627a92ad1ab",
  "hiroo": "1480796927426-f609979314bd",
  "omotesando": "1503899036084-c55cdd92da26",
  "toyosu": "1493976040374-85c8e12f0c0e",
  "musashikosugi": "1480714378408-67cE81b3ed7b",
  "futakotamagawa": "1506905925346-21bda4d32df4",
  "shibuya": "1542931287-023b922fa89b",
  "harajuku": "1528164344705-47542687000d",
  "akihabara": "1480455624313-e29b44bbee98",
  "ikebukuro": "1490761668535-35497054764d",
  "kiyosumishirakawa": "1495474472287-4d71bcdd2085",
  "shimokitazawa": "1551632436-cbf8dd35adfa",
  "yoyogiuehara": "1449247709967-d4461a6a6103",
  "koenji": "1493225457124-a3eb161ffa5f",
  "kagurazaka": "1524413840807-0c3cb6fa808d",
  "jiyugaoka": "1488477181946-6428a0291777",
  "kichijoji": "1441974231531-c6227db76b6e",
  "sangenjaya": "1517248135467-4c7edcad34c4",
  "shinookubo": "1498654896616-1d4e0846d727",
  "asakusa": "1480796927426-f609979314bd",
  "ueno": "1481627834876-b7833e8f5570",
  "kitasenju": "1517248135467-4c7edcad34c4",
  "machida": "1441986300917-64674bd600d8",
};

export const getNeighborhoodImage = (id: string, w = 800, h = 600): string => {
  const photoId = photoMap[id] || "1540959733332-eab4deabeeaf";
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
};

// Section images for the article
export const sectionImages: Record<string, string[]> = {
  intro: [
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&h=600&fit=crop&auto=format&q=80",
  ],
  power: [
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&h=600&fit=crop&auto=format&q=80",
  ],
  career: [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=600&fit=crop&auto=format&q=80",
  ],
  elite: [
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1200&h=600&fit=crop&auto=format&q=80",
  ],
  tower: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1200&h=600&fit=crop&auto=format&q=80",
  ],
  subculture: [
    "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1480455624313-e29b44bbee98?w=1200&h=600&fit=crop&auto=format&q=80",
  ],
  artsy: [
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop&auto=format&q=80",
  ],
  conclusion: [
    "https://images.unsplash.com/photo-1490761668535-35497054764d?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1498654896616-1d4e0846d727?w=1200&h=600&fit=crop&auto=format&q=80",
  ],
};

// Article content sections
export const articleSections = [
  {
    id: "intro",
    title: "城市空间作为身份容器",
    subtitle: "东京女性地理学引论",
    content: `东京的城市结构不仅是物理空间的堆叠，更是一套极其精密且不断自我更新的符号系统。通过对东京三十个核心街区的深度考察，可以发现地理坐标已然成为现代日本女性身份策展（Identity Curation）的核心要素。这种被称为"地域人设"的现象，揭示了都市女性如何通过选择特定的生活、消费与社交空间，来完成社会阶层的锚定与自我价值的外部化表达。

在当代东京的社会叙事中，一个女性的居住地或高频出现在其社交媒体定位中的街区，直接预设了她的经济实力、审美取向乃至人生哲学。例如，港区与涩谷区之间的物理距离虽然仅有数公里，但在社会学意义上，它们代表了两种截然不同的阶级叙事：一种是基于资本依附与权力交换的"闪耀式"生存，另一种则是基于亚文化表达与消费主义前卫性的"自我"实验。`,
    highlight: "地理坐标已然成为现代日本女性身份策展的核心要素",
  },
  {
    id: "power",
    title: "权力与资本的竞技场",
    subtitle: "港区及其周边",
    content: `港区（Roppongi, Nishiazabu, Azabu-juban）是东京地理政治学中的皇冠。在这里，女性的形象往往被高度符号化，成为资本流动的注脚。

西麻布女子与六本木女子存在微妙的"品味鄙视链"。西麻布的女性更倾向于"隐形"的奢华，她们出没于没有招牌的酒吧，这种"只有圈内人懂"的排他性是其身份的核心。而麻布十番则提供了一种伪装成普通社区的高级感，其生活的本质是极高租金下的"日常化叙事"。`,
    highlight: '西麻布的女性更倾向于"隐形"的奢华，这种排他性是其身份的核心',
  },
  {
    id: "career",
    title: "职业独立与自我定义的堡垒",
    subtitle: "惠比寿、中目黑、代官山",
    content: `这一区域代表了东京女性中最为独立、职业化且具备高度审美自觉的群体。与港区的"依附性"不同，这些街区的女性更强调"自费式"的高品质生活。

惠比寿女性（Ebi-jo）是一个极具社会学意义的标签。她们以能靠自己的收入住在惠比寿为荣，在社交场合中主张公平支付，这在本质上是对"港区女子"消费逻辑的切割。她们的社交画像通常展现出一种"向上社交"但"向下兼容"的亲和力，既有大城市的精致，又不失脚踏实地的稳重。`,
    highlight: '惠比寿女性以能靠自己的收入住在惠比寿为荣，这是对"港区女子"消费逻辑的切割',
  },
  {
    id: "elite",
    title: "传统阶级与制度精英",
    subtitle: "银座、丸之内、广尾",
    content: `这些区域代表了东京的老牌社会资本。这里的女性形象通常与制度化的成功、家族背景或极高的职场天花板相联系。

银座的女性刻板印象呈现出一种"成年人的成熟美"。她们的消费行为往往是为了庆祝特定的"纪念日"，而不是日常的宣泄。这里的女性更看重物品背后的传承价值，如银座三越或松屋百货的外商服务，象征着一种被制度承认的阶层进入权。`,
    highlight: "银座女性更看重物品背后的传承价值，象征着一种被制度承认的阶层进入权",
  },
  {
    id: "tower",
    title: "塔楼公寓与湾区的阶层焦虑",
    subtitle: "丰洲、武藏小杉、二子玉川",
    content: `随着东京湾区的开发，一种新的居住形态——超高层塔楼公寓（Tower Mansion）——催生了独特的女性人设。这是一种高度依赖家庭整体经济实力，且在育儿与社交中存在极高竞争性的群体。

丰洲与武藏小杉的塔楼女性，其生活核心是"极致的便利"与"隔离的安心感"。这种生活方式在社交软件上被转化为一种"标准化的幸福"，但也隐藏着对阶层滑坡的隐忧，表现为对子女教育资源的近乎偏执的追求。`,
    highlight: '塔楼生活被转化为"标准化的幸福"，但隐藏着对阶层滑坡的隐忧',
  },
  {
    id: "subculture",
    title: "亚文化表演与数字原住民",
    subtitle: "涩谷、原宿、秋叶原、池袋",
    content: `在这些街区，地理位置不仅是消费场所，更是其人格的视觉延展。这里的女性通常在数字空间和物理空间中进行着高度同步的表演。

特别是原宿和代官山周边的租赁工作室（Cherish Studio），已经成为地雷系和量产型女孩进行"身份策展"的重要基础设施。她们在这些精心设计的巴洛克或洛可可风格空间中拍摄照片，构建一个脱离现实生活的理想自我。`,
    highlight: "地理位置不仅是消费场所，更是其人格的视觉延展",
  },
  {
    id: "artsy",
    title: "文艺复兴与审美门槛",
    subtitle: "清澄白河、下北泽、代代木上原",
    content: `这些街区的兴起标志着东京女性审美权力的"知识分子化"。身份的优越感不再来自于昂贵的LOGO，而来自于对特定文化的深度解析权。

清澄白河的女性是"知识经济"的消费者。她们在由旧仓库改造的宽敞咖啡空间中寻找非日常感，通过品鉴单品咖啡等行为，完成一种审美仪式感的建构。这种"知性"的刻板印象，是现代女性在繁琐都市生活中寻求精神自洽的一种表现。`,
    highlight: "身份的优越感不再来自于昂贵的LOGO，而来自于对特定文化的深度解析权",
  },
  {
    id: "social-media",
    title: "社交媒体作为身份的增强现实",
    subtitle: "空间政治与女性身份的未来演变",
    content: `在Instagram和TikTok的语境下，这些街区的物理空间被简化为一套视觉滤镜。对于"港区女子"而言，定位在西麻布的隐藏餐厅是一种"阶级通行证"。而对于利用"Cherish Studio"进行拍摄的量产型女孩来说，空间是可以被临时租赁的，身份也是可以通过特定的装饰风格在镜头前瞬间切换的。

地域刻板印象在东京的恋爱市场中起到了极强的筛选作用。男性在选择约会地点时，往往需要精准对齐女性的地域人设。`,
    highlight: "物理空间的资产阶级化与数字空间的身份流动性，构成了东京女性刻板印象的二元对立",
  },
  {
    id: "conclusion",
    title: "地理标签的社会学终局",
    subtitle: "结论",
    content: `东京这三十个街道的"女生刻板印象"，共同构建了一幅现代都市女性的欲望地图。虽然刻板印象不可避免地带有偏见，但它也确实反映了城市规划、资本流动与个人认同之间复杂的相互作用。

通过分析清澄白河与代代木上原的崛起，可以预见未来的女性刻板印象将更加侧重于"文化资本"而非单纯的"物质资产"。这种从单纯的"消费物品"到"消费知识与价值观"的转变，预示着东京女性社会地位表达的新趋势。

这种地理化的身份建构，让每一个身处其中的个体，都在不断地在"成为自己"与"符合预期"之间寻找着脆弱的平衡。`,
    highlight: '每一个身处其中的个体，都在"成为自己"与"符合预期"之间寻找着脆弱的平衡',
  },
];
