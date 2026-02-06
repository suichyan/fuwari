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
];
