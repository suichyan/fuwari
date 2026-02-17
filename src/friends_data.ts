// 友链数据类型定义
export interface Friend {
	name: string;
	url: string;
	avatar: string;
	description: string;
}

// 友链数据
export const friends: Friend[] = [
  {
    name: "YQ's Toy Box",
    url: "https://blog.openyq.top/",
    avatar: "https://blog.openyq.top/image/favicon.png",
    description: "愿世间所有人都被温柔以待❤",
  },

  {
    name: "咲夜の小屋",
    url: "https://sakuya.moe/",
    avatar: "https://bu.dusays.com/2024/10/23/671837f2232c2.png",
    description: "这里有笨比，大聪明以及sakuya~！",
  }
];

