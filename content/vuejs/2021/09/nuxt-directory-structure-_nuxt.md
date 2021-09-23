---
title: Nuxt 폴더 구조 정리 - .nuxt 편
---

NuxtJS에서 사용되는 폴더 구조 중 `.nuxt`에 대해 다뤄보겠다.

<!--more-->

## assets

`.nuxt` 폴더는 **build directory**라고 불린다. 이는 처음 프로젝트를 생성했을 때는 보이지 않다가 처음 `nuxt dev` 또는 `nuxt build`를 실행했을 때 동적으로 생성된다.

디버깅을 위해 수정도 해보고 값들 확인도 해볼 수 있다. 다시 위 명령어들을 실행하면 다시 실행 결과물들로 바뀌니 주의!

`npm init nuxt-app <project-name>` 형태로 실행하면 보통 `.gitignore` 파일에서 이 폴더를 무시하도록 되어있지만,

### 폴더 이름 바꾸기

폴더가 `.` 으로 시작하기 때문에 기본적으로 숨겨져있다. 만약 이를 원치 않으면 `nuxt.config.js`에서 `buildDir` 속성으로 폴더 이름을 바꿀 수 있다.

```js [nuxt.config.js]
export default {
  buildDir: 'nuxt-dist',
};
```

## 폴더 내부

내부에는 다음과 같은 것들이 있다.

### router.js

`page` 폴더에 vue 파일을 넣으면 생성되는 router이다. route name이나 사용된 컴포넌트들을 확인하는 식으로 디버깅할 수 있다.

### router.scrollBehavior.js

패이지 이동시 스크롤을 어떻게 할지에 대한 내용이 나온다.

```js [router.scrollBehavior.js]
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 };
}
```

### components (directory)

NuxtLink, NuxtChild 등 모든 Nuxt 컴포넌트들이 들어 있다. build 화면을 보여주는 `nuxt-build-indicator`나 로딩 화면을 보여주는 `nuxt-loading`, 기본 에러 페이지인 `nuxt-error`도 들어있다.

### mixins (directory)

`$fetch` 함수에 필요한 파일들이 들어있다.

### views (directory)

앱의 root라고 할 수 있는 app template이 들어있으며 서버의 에러페이지도 들어있다.

```html [app.template.html]
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

```html [error.html]
<!DOCTYPE html>
<html>
  <head>
    <title>Server error</title>
    <meta charset="utf-8" />
    <meta
      content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
      name="viewport"
    />
    <style>
      .__nuxt-error-page {
        padding: 1rem;
        background: #f7f8fb;
        color: #47494e;
        text-align: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        font-family: sans-serif;
        font-weight: 100 !important;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .__nuxt-error-page .error {
        max-width: 450px;
      }
      .__nuxt-error-page .title {
        font-size: 24px;
        font-size: 1.5rem;
        margin-top: 15px;
        color: #47494e;
        margin-bottom: 8px;
      }
      .__nuxt-error-page .description {
        color: #7f828b;
        line-height: 21px;
        margin-bottom: 10px;
      }
      .__nuxt-error-page a {
        color: #7f828b !important;
        text-decoration: none;
      }
      .__nuxt-error-page .logo {
        position: fixed;
        left: 12px;
        bottom: 12px;
      }
    </style>
  </head>
  <body>
    <div class="__nuxt-error-page">
      <div class="error">
        <div class="title">Server error</div>
        <div class="description">{{ message }}</div>
      </div>
      <div class="logo">
        <a href="https://nuxtjs.org" target="_blank" rel="noopener">Nuxt</a>
      </div>
    </div>
  </body>
</html>
```

### App.js

main application 파일이다. layout과 `nuxt.config.js`에 설정한 css 파일들을 불러오고 components 폴더의 컴포넌트들을 불러온다.

### client.js

클라이언트 측에서 일어나는 모든 것들에 필요한 파일이다.

### server.js

서버 측에서 일어나는 모든 것들에 필요한 파일이다.

### empty.js

no-op alias를 위해 비어져 있는 파일

```js [empty.js]
// This file is intentionally left empty for noop aliases
```

### index.js

Vue를 실행할 수 있게 해주는 root javascript 파일이다. `App.js`, `vuex`, `vue-meta` 등 컴포넌트와 플러그인들을 불러와서 앱을 실행시킨다.

```js [index.js]

```

### loading.html

페이지가 로딩될 때 보여줄 화면 파일

### middleware.js

middleware와 관련된 파일

### 그 외

- vetur

VSCode에서 vetur를 설치하면 vetur 폴더가 나타나는데 사용하는 components 폴더에 추가한 컴포넌트들에 대한 정보들이 나타난다.

```js
{
  "Youtube": {
    "description": "Auto imported from components/global/Youtube.vue"
  },
  "CommonAd": {
    "description": "Auto imported from components/common/Ad.vue"
  },
  // ...
}
```

- content

`@nuxt/content` 설치할 시 나타나며, `nuxt-content` 컴포넌트와 `$content` 함수를 사용할 수 있게 해주는 파일들이 들어있다.

- moment 등 패키지 관련 파일

`@nuxtjs/moment`와 같이 패키지를 다운로드 받을 경우 실행에 필요한 작업들이 들어있는 js 파일들이 들어있다.

## 배포 했을 때

배포할 때 **SSR(Server Side Rendering)** 할 경우 필요한 폴더지만 **Static** 인 경우는 필요하지 않다. 왜냐하면 대신 미리 연산되고 렌더링되어서 HTML로 만들어진 상태로 `dist` 폴더에 들어가기 때문이다.
