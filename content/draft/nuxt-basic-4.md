---
title: NuxtJS 블로그 강의 4 - 포스팅 가져오기
tags:
  - Nuxt Blog Lecture
image: /images/nuxt-basic-1/210912-031150.png
---

저번에는 포스팅 글 작성하는 방법에 대해 배워보았습니다. 오늘은 그 글을 가져와서 페이지에 띄워보는 방법에 대해 알아보겠습니다.

<!--more-->

## 포스팅 컴포넌트 만들기

이제 쓴 글을 저희 블로그 사이트에 띄울 수 있어야겠죠? 보통 글을 쓰면 카테고리로 구분합니다. 저희는 **여행(travel) 관련 글을 써본다고 해볼까요?**

### 포스팅 글들 추가

이전 글들에서 한 것처럼 포스팅 글들을 추가하겠습니다. content에서 `travel` 폴더를 추가하고 다음처럼 글 3개를 추가하겠습니다.

![](/images/nuxt-basic-4/210926-145644.png)

```md [travel-story-1.md]
---
title: 여행 이야기 1
---

오늘은 강원도 원주로 여행을 갔습니다
```

```md [travel-story-2.md]
---
title: 여행 이야기 2
---

두 번째 날은 강원도 강릉으로 여행을 갔습니다
```

```md [travel-story-3.md]
---
title: 여행 이야기 3
---

세 번째 날은 강원도 강릉으로 여행을 갔습니다
```

### 포스팅 글들 가져오기

이전에 [라우팅](https://www.mclearning.dev/vuejs/2021/09/nuxt-basic-2)에서 했었던 것처럼 `pages` 폴더에 `travel` 폴더를 추가하고 `index.vue` 파일을 만듭니다.

```vue [index.vue]

```

`https://블로그주소/travel` 라고 url에 들어가면 여행 관련 포스팅들이 나오게 하고 싶습니다. 이전에 배웠던 [라우팅](https://www.mclearning.dev/vuejs/2021/09/nuxt-basic-2)을 활용해봅시다! `page` 폴더에 `travel` 이란 폴더를 만들고 `index.vue`와 `_slug.vue` 파일을 추가해주세요.

![](/images/nuxt-basic-4/210926-140517.png)

### index.vue

이 파일은 포스팅 리스트들을 보여주는 역할을 할겁니다.
