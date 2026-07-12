import type { LinkFolder, LinkItem } from "@/lib/types";

export const folders: LinkFolder[] = [
  { id: "dev", name: "개발", count: 4 },
  { id: "design", name: "디자인", count: 2 },
  { id: "reading", name: "읽을거리", count: 3 },
];

export const links: LinkItem[] = [
  {
    id: "1",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Next.js의 공식 문서, App Router와 서버 컴포넌트를 학습할 수 있어요.",
    folderId: "dev",
  },
  {
    id: "2",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준과 브라우저 API에 대한 가장 신뢰할 수 있는 레퍼런스.",
    folderId: "dev",
  },
  {
    id: "3",
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    description: "타입스크립트의 문법과 활용법을 정리한 공식 핸드북.",
    folderId: "dev",
  },
  {
    id: "4",
    title: "GitHub",
    url: "https://github.com",
    description: "코드를 호스팅하고 협업하는 세계 최대의 개발자 플랫폼.",
    folderId: "dev",
  },
  {
    id: "5",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "전 세계 디자이너들의 포트폴리오와 영감을 모아둔 커뮤니티.",
    folderId: "design",
  },
  {
    id: "6",
    title: "Figma",
    url: "https://figma.com",
    description: "협업 기반의 UI/UX 디자인 및 프로토타이핑 툴.",
    folderId: "design",
  },
  {
    id: "7",
    title: "Naver News",
    url: "https://news.naver.com",
    description: "실시간 뉴스와 다양한 이슈를 확인할 수 있는 뉴스 포털.",
    folderId: "reading",
  },
  {
    id: "8",
    title: "Brunch",
    url: "https://brunch.co.kr",
    description: "다양한 작가들의 글을 읽을 수 있는 콘텐츠 플랫폼.",
    folderId: "reading",
  },
  {
    id: "9",
    title: "Hacker News",
    url: "https://news.ycombinator.com",
    description: "기술과 스타트업 관련 소식을 빠르게 접할 수 있는 커뮤니티.",
    folderId: "reading",
  },
];
