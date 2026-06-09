# stop-dobak

도박 예방 교육 체험 사이트 (교육용, 비영리 목적)

빠른 시작

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

설명

이 프로젝트는 React + Vite + Tailwind CSS + Chart.js로 구성된 교육용 체험 사이트입니다. 실제 금전 거래, 결제, 출금, 광고 등은 포함되어 있지 않습니다.

구성

- `src/` : 주요 React 컴포넌트 및 로직
- `index.html` : 앱 엔트리
- `tailwind.config.cjs`, `postcss.config.cjs` : 스타일 설정

주의

이 프로젝트는 도박의 위험성을 교육하기 위해 제작되었습니다. 실제 도박을 조장하거나 금전적 거래를 다루지 않습니다.

자동 배포 (옵션)

1. Vercel에 프로젝트를 연결하거나, GitHub 리포지토리에 푸시할 때 자동 배포를 원하면 리포지토리의 `Settings > Secrets`에 `VERCEL_TOKEN`을 추가하세요.
2. 이 리포지토리는 `main` 브랜치에 푸시될 때 자동으로 배포되도록 GitHub Actions 워크플로(`.github/workflows/vercel-deploy.yml`)를 포함합니다.

로컬에서 Vercel CLI로 로그인하려면 다음을 실행하세요:

```bash
npx vercel login
```

명령을 실행하면 브라우저 창이 열리거나 로그인 링크가 출력됩니다. 로그인 후 `npx vercel --prod`로 수동 배포할 수 있습니다.

