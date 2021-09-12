---
title: NuxtJS 블로그 강의 2 - Routing
tags:
    - Nuxt Lecture
image: /images/nuxt-basic-1/210912-031150.png
---

이번 시간에는 페이지를 만들고 원하는 페이지로 이동하도록 라우팅(Routing)하는 시간을 가져보겠다.

<!--more-->

## Automatic Routes

Vue를 해보았다면 알겠지만 `VueRouter` 컴포넌트와 `router.js`를 통해 경로에 따라 적절한 컴포넌트 페이지가 나오도록 했다.

Nuxt에서는 router.js에 하나하나 route에 대한 내용을 적어야하는 불편함을 줄이기 위해 컴포넌트만 만들면 자동으로 라우팅을 해주는 기능을 넣었다. 이는 `page` 폴더를 통해 구현할 수 있다.

### Home 만들기

먼저 `pages`에 있는 index.vue 내용을 모두 지우고 다음과 같이 적어보자.

```vue [page/index.vue]
<template>
  <h2>안녕하세요?</h2>
</template>
```

http://localhost:3000 에 접속하면 다음과 같은 결과화면을 볼 수 있다.

![](/images/nuxt-basic-2/210912-190738.png)

이제 중요한 건 다른 페이지로 이동! 예를 들어 나는 일기(Diary) 카테고리를 만들고 거기에 글들을 쓰고 싶다고 가정해보자. 그러면 일기 글들을 모아놓은 곳과 일기글 페이지가 있어야할 것이다.

- **일기들을 모은 페이지**: `http://localhost:3000/diary`
- **일기 페이지**: `http://localhost:3000/diary/1`

원래라면 이렇게 router.js 에 입력해야 했을 것이다.

```js [router.js]
routes: [
    {
        path: "/",
        component: "~/pages/index.vue",
    },
    {
        path: "/diary",
        component: "~/pages/diary/index.vue",
    },
    {
        path: "/diary/:slug",
        component: "~/pages/blog/_slug.vue",
    },
]
```

하지만 NuxtJS에서는 이렇게 router.js를 만들 필요가 없다. `page` 폴더에 적절하게 파일 구조만 만들어주면 알아서 생성되기 떄문이다.

### Diary 페이지 만들기

`page` 폴더에 `diary` 폴더를 만들고 `index.vue`와 `_slug.vue` 폴더를 만들어 다음과 같이 내용을 추가해주자. 그리고 `page/index.vue` 파일도 수정해준다.

```vue [page/index.vue]
<template>
  <div>
    <h2>안녕하세요?</h2>
    <nuxt-link to="/diary">일기장으로</nuxt-link>
  </div>
</template>
```

```vue [page/diary/index.vue]
<template>
  <div>
    <h2>Diary 글들을 모은 곳 </h2>
    <ul>
      <li><nuxt-link to="/diary/1">첫 번째 나의 일기</nuxt-link></li>
    </ul>
  </div>
</template>
```

```vue [page/diary/_slug.vue]
<template>
  <div>
    <h2>오늘의 일기</h2>
    <p>Nuxt 블로그 만드는 법을 배웠다. 너무 재미있다. 키득키득</p>
  </div>
</template>
```

여기서 nuxt-link는 vue-link와 동일하다고 봐도 무방하다. `a` 태그와의 차이는 `href` 대신 `to`를 사용한다는 점이다.

이렇게 만들어놓고 `npm run dev`를 실행해보면 아주 놀라운(?) 결과를 볼 수 있다.

- localhost:3000

![](/images/nuxt-basic-2/210912-192732.png)

- localhost:3000/diary (일기장으로 클릭시)

![](/images/nuxt-basic-2/210912-192754.png)

- localhost:3000/diary (첫 번째 나의 일기 클릭시)

![](/images/nuxt-basic-2/210912-192830.png)

그렇다면 router.js가 어떤식으로 만들어져있을까? `.nuxt` 폴더안에 잘보면 `router.js`를 볼 수 있다. 그 중 일부를 보면...

```js
const _a9bb29b2 = () => interopDefault(import('../pages/diary/index.vue' /* webpackChunkName: "pages/diary/index" */))
const _ad286c42 = () => interopDefault(import('../pages/diary/_slug.vue' /* webpackChunkName: "pages/diary/_slug" */))
const _2968d533 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// ...

export const routerOptions = {
    // ...
    routes: [{
    path: "/diary",
    component: _a9bb29b2,
    name: "diary"
    }, {
    path: "/diary/:slug",
    component: _ad286c42,
    name: "diary-slug"
    }, {
    path: "/",
    component: _2968d533,
    name: "index"
    }],
    // ...
}
```

Oh my my...(웃음) 알아서 컴포넌트도 불러주고 routing도 해주다니..

## Dynamic Routes

그런데 경로에 **콜론(:)** 이 붙은 것이 보인다. 이것은 동적 라우팅(Dynamic Routing)을 하기 위해서다.

사이트를 만들다 보면 원하는 페이지에 대한 경로를 직접 다 정하지 못할 때가 있다. 예를 들어 9월 13일의 일기장에 대한 URL을 `/diary/0913-diary`라 하고싶다고 하자. 근데 `/diary/0914-diary`도 있을 것이고 `/diary/0915-diary`도 생길 것이다. 그 때마다 다른 컴포넌트를 만들기는 싫다. 왜냐하면 동일한 형태의 페이지를 보여줄 거니까. 그렇다면 동일한 컴포넌트로 페이지 보여주되 내용만 다르게 표시하고 싶다면 어떻게 해야할까? 바로 `/diary/(something)` 형태로 나오는 모든 경로는 `page/diary/_slug.vue`로 라우팅하는 것이다.

그래서 이를 동적으로 하나의 컴포넌트에 라우팅 시켜주기 위해 앞에 `콜론(:)`을 붙인 경로를 사용한다. 그러면 해당 부분에 어떤 값이 들어오든 `_slug.vue` 컴포넌트로 만든 페이지로 연결된다.

- `/diary/1`
- `/diary/안녕`
- `/diray/hello-my-name-is-kim`

Nuxt에서는 이를 router.js를 자동으로 만들기 때문에 `:slug` 경로를 만들기 위해 컴포넌트 파일 앞에 `_`를 붙여서 만든다.

## Nested Routes

좀 더 응용을 해보자. 블로그를 만들면서 카테고리 내에 서브 카테고리가 있을 수 있다. 예를 들어, 일기장이긴 한데 2020년 2021년 이렇게 날짜를 나눌 수도 있고, 공부일기, 여행일기 처럼 나눌수도 있을 것이다.

날짜의 경우 계속 늘어나는 카테고리이기 때문에 동적으로 만들어야 한다. 반대로 공부일기, 여행일기는 자주 추가되지 않고 수동으로 추가할 경우가 많으므로 정적으로 만들어야 한다.

그래서 `page`내에 다음과 같이 파일들을 만들었다.

![](/images/nuxt-basic-2/210912-201401.png)

`_id.vue`엔 다음과 같이 코드를 넣는다. (study와 travel쪽 둘 다)

```vue [page/diary/study/_year/_id.vue]
<template>
  <div>
    <span>{{ $route.params.year }}년</span>
    <span>{{ $route.params.id }}번 째</span>
    일기
  </div>
</template>
```

그리고 http://localhost:3000/diary/study/2021/1 에 접속하면

![](/images/nuxt-basic-2/210912-201802.png)

챠란!! 2021과 1를 바꿔도 그에 맞춰 페이지가 나타나는 놀라운 마법을 볼 수 있다.

## 404 페이지

가끔 사람들이 실수로 URL을 바꾸어서 잘못 들어가는 경우가 있을 것이다.

만약에 http://localhost:3000/hello 에 접속하면 어떻게 나올까? Nuxt에서 제공하는 기본 페이지가 나타난다.

![](/images/nuxt-basic-2/210912-202140.png)

블로그 잘 만들어놨는데 너무 엉뚱한 페이지가 나오면 어색하지 않겠는가? 그래서 이러한 페이지도 우리가 원하는 데로 만들 수 있다.

`page` 폴더에 `_.vue` 파일을 만들어보자

```vue [page/_.vue]
<template>
  <h1>404 에러 페이지</h1>
</template>
```

그러면 기존의 에러 페이지 대신 우리가 만든 페이지가 나타난다.

![](/images/nuxt-basic-2/210912-202511.png)

## 마무리하며

오늘은 우리가 앞으로 만들 페이지들을 라우팅하는 방법에 대해 알아보았다. 다음 시간에는 우리가 쓸 포스팅이나 관련 데이터들을 관리해주는 Nuxt/content에 대해 알아보겠다.
