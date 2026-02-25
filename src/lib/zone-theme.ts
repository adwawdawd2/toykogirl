import { type ZoneId } from "@/data/neighborhoods";

// 用于文本着色（标题、标签、强调文案）。
export const zoneTextColors: Record<ZoneId, string> = {
  power: "text-zone-power",
  career: "text-zone-career",
  elite: "text-zone-elite",
  tower: "text-zone-tower",
  subculture: "text-zone-subculture",
  artsy: "text-zone-artsy",
};

// 用于浅色背景（信息块、徽章、图标容器等弱强调区域）。
export const zoneBgColors: Record<ZoneId, string> = {
  power: "bg-zone-power/10",
  career: "bg-zone-career/10",
  elite: "bg-zone-elite/10",
  tower: "bg-zone-tower/10",
  subculture: "bg-zone-subculture/10",
  artsy: "bg-zone-artsy/10",
};

// 用于边框着色（标签边框、悬浮信息框边框等）。
export const zoneBorderColors: Record<ZoneId, string> = {
  power: "border-zone-power",
  career: "border-zone-career",
  elite: "border-zone-elite",
  tower: "border-zone-tower",
  subculture: "border-zone-subculture",
  artsy: "border-zone-artsy",
};

// 用于纯色填充（地图点位、状态圆点、激活态按钮等强强调区域）。
export const zoneSolidColors: Record<ZoneId, string> = {
  power: "bg-zone-power",
  career: "bg-zone-career",
  elite: "bg-zone-elite",
  tower: "bg-zone-tower",
  subculture: "bg-zone-subculture",
  artsy: "bg-zone-artsy",
};
