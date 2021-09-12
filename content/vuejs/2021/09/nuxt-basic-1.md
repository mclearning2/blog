---
title: NuxtJS 블로그 강의 1 - 프로젝트 만들기
tags:
    - Nuxt Lecture
image: /images/nuxt-basic-1/210912-031150.png
---

이 강의는 NuxtJS를 통해 자신의 사이트, 정확히는 블로그를 만들기 위한 사람들을 위한 글이다.

<!--more-->

NuxtJS 공식 문서에 따라 진행할 예정이며 이 강의가 끝나고 난 뒤에 `@nuxt/content` 를 통해 포스팅도 해보고 `Netlify`를 통해 배포도 할 예정이다.

## Prerequisites

NuxtJS를 사용함에 따라 기본적으로 다음 기술에 대한 최소한의 기본 지식이 필요하다.

- `HTML`
- `SCSS(CSS)`
- `Javascript`

또한 자바스크립트 패키지 다운로드는 `npm(v7.21.0)`을 사용할 예정이다.(Node.js는 `v14.16.1`) NuxtJS를 해보고자 한다는 것은 이미 VueJS를 사용해보았고 그에 따라 어느 정도 자신만의 환경이 있다고 생각하고 바로 본격적인 내용에 들어가겠다.

## Installation

설치는 `npm`을 사용하는 방법과 `npx`를 사용하는 방법이 있다. (`npx`는 npm 5.2.0 버전 이후 부터는 기본적으로 들어있다.)

- npm

```shell
npm init nuxt-app <project-name>
```

- npx

```shell
npx create-nuxt-app <project-name>
```

`blog`라는 이름으로 project-name을 사용. 다음을 따라 선택. 중간에 선택해야하는 부분은 spacebar로 선택할 수 있다.

```bash
create-nuxt-app v3.7.1
✨  Generating Nuxt.js project in blog
? Project name: blog
? Programming language: JavaScript
? Package manager: Npm
? UI framework: None
? Nuxt.js modules: Content - Git-based headless CMS
? Linting tools: ESLint, Prettier
? Testing framework: None
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Static (Static/Jamstack hosting)
? Development tools: jsconfig.json (Recommended for VS Code if you're not using typescript)
? Continuous integration: None
? Version control system: Git
```

혹시 잘 모르겠다면 다음 영상을 보면서 따라하시길...선택하는 부분은 스페이스바로 하면 된다.

[![asciicast](https://asciinema.org/a/435116.svg)](https://asciinema.org/a/435116)

## 실행해보기

해당 프로젝트에 들어가서 다음 명령어를 실행하면 http://localhost:3000 에 접속할 수 있다.

```shell
npm run dev
```

![](/images/nuxt-basic-1/210912-183227.png)

## 프로젝트 구조

Vue와 비슷하게 폴더들이 많이 생겼다. 가볍게 어떤 역할을 하는지 알아보자. 필요할 때마다 자세히 다루면서 사용할 예정이니 그렇구나하고 넘어가자.

![](/images/nuxt-basic-1/210912-183341.png)

### 폴더들

- `.nuxt`: `npm run dev` 를 실행하면 나타나는 폴더로 개발 모드에서 사용된다.
- `components`: Vue처럼 사용할 컴포넌트들을 모은 폴더
- `content`: 후에 포스팅을 하기 위해 사용되는 폴더. `nuxt/content`를 통해 사용할 예정
- `node_modules`: npm으로 다운로드한 모듈들이 저장되어있는 폴더
- `pages`: routing하기 위해 사용되는 컴포넌트들이 들어있다.
- `static`: 사이트에서 사용할 정적인 파일들을 포함한다.
- `store`: vuex를 위해 사용하는 폴더

지금은 자세히 다루지 않고 나중에 필요에 따라 사용하면서 같이 설명할 예정이다.

### 파일들

- `.editorconfig`: 개발환경(IDE, editor)에 상관없이 일정한 코드 스타일을 유지하기 위한 설정 파일
- `.eslintrc.js`: 코드 linting을 하기 위해 사용되는 설정 파일
- `.gitignore`: git에서 무시할 것들을 정하는 설정 파일
- `.prettierrc`: 코드 formatting으로 prettier를 사용한다. 이를 위한 설정 파일
- `jsconfig.json`: IDE에서 필요한 설정 파일들. 주로 경로 alias할 때 사용한다.
- `nuxt.config.js`: Nuxt 실행할 때 사용하는 글로벌 설정 파일
- `package-lock.json`: `npm install`하면 생성되는 파일. 구체적인 패키지들을 설치할 수 있도록 도와준다.
- `package.json`: 패키지 의존성과 버전 등의 설정파일과 실행 스크립트들을 만들 수 있다.

## 마무리하며

이번 시간에는 가볍게 프로젝트를 만들어보았다. 다음 시간에는 본격적으로 페이지를 만드는 방법들에 대해 알아보겠다.
