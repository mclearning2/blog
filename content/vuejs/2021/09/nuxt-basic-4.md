---
title: NuxtJS 블로그 강의 4 - 글 리스트 가져오기
tags:
  - Nuxt Blog Lecture
image: /images/nuxt-basic-1/210912-031150.png
---

저번에는 포스팅 글 작성하는 방법에 대해 배워보았습니다. 오늘은 그 글을 가져와서 페이지에 띄워보는 방법에 대해 알아볼까요?

<!--more-->

## 포스팅 컴포넌트 만들기

보통 글을 쓰면 카테고리로 구분합니다. 저희는 여행(travel) 관련 글을 써본다고 해볼까요?

### 포스팅 글 추가

content에서 `travel` 폴더를 추가하고 다음처럼 글 3개를 추가하겠습니다.

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

## 포스팅 글들 가져오기

이전에 [라우팅](https://www.mclearning.dev/vuejs/2021/09/nuxt-basic-2)에서 했었던 것처럼 `pages` 폴더에 `travel` 폴더를 추가하고 `index.vue` 파일을 만듭니다.

```vue [pages/travel/index.vue]
<template>
  <section class="post-list">
    <ul class="list">
      <li v-for="post of postList" :key="post.title">
        <h2>{{ post.title }}</h2>
        <p>{{ post.createdAt }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  async asyncData(ctx) {
    const postList = await ctx.$content('/travel').fetch();
    return { postList };
  },
};
</script>
```

아무런 스타일을 넣지 않았다면 `npm run dev`를 실행했을 때 `localhost:3000/travel`에 들어가면 다음과 같이 보일겁니다.

![](/images/nuxt-basic-4/210929-200639.png)

postList 값 내부에는 저희가 쓴 글들의 Array가 들어있습니다.

![](/images/nuxt-basic-4/210929-203616.png)

url 정보나 제목, 날짜, 내용(body)이 들어있네요. 이것들을 잘 버무려서 `template`에 저희가 원하는 데로 페이지를 띄우면 될것 같습니다.

그런데 Vue에서는 보지못한 것들(`asyncData`, `$content`)이 좀 있네요. 이것들은 뭘까요?

### asyncData

컴포넌트를 만들기 전부터 실행되는 hook이며, API로 데이터를 비동기적으로 가져올 때 주로 사용합니다.

Object를 반환하면 컴포넌트의 `data`와 병합하기 때문에 template에서도 사용할 수 있습니다.

### $content

`nuxt/content`에서는 위에서 만든 마크다운의 데이터를 가져오기 위해 `$content` 함수를 사용합니다.

- `$content(path, options)`
  - `path`: 가져올 경로입니다.
  - `options.deep`: 보통은 해당 경로의 글들만 가져오는데 하위 모든 글들을 가져올 때 `true`값을 줍니다.
  - `options.text`: markdown 내용을 텍스트로 받고 싶을 때 `true` 값을 줍니다.
  ````js [text가 true인 경우]
  text: '\n' +
    '가끔 쉬프트를 누르면서 마우스 클릭한 이벤트를 처리하고 싶은 경우가 있다.\n' +
    '\n' +
    '<!--more-->\n' +
    '\n' +
    '이벤트 리스너에서 `shiftKey` 값이 True인지 확인하면 된다.\n' +
    '\n' +
    '```js\n' +
    "window.addEventListener('click', function (event) {\n" +
    '  if (event.shiftKey) {\n' +
    "    alert('Shift key is pressed.');\n" +
    '  } else {\n' +
    "    alert('Shift key is not pressed.');\n" +
    '  }\n' +
    '});\n' +
    '```\n',
  ````

위에서 저희는 content 폴더 내에 `travel` 글들을 모두 가져오고 싶기 때문에 `$content('/travel')` 이라 하면 됩니다.

만약에 모든 글들을 가져오고 싶다면 `$content('/', {deep: true})`라고 해주시면 됩니다.

### $content methods

`$content` 함수를 사용하면 단순히 `QueryBuilder`를 반환하는데요. 데이터를 가져오려면 이 객체의 함수인`fetch()`를 사용해야합니다. 비동기 함수이기 때문에 `Promise`를 반환합니다. 그래서 **async/await**를 통해 값을 받아줘야하죠.

```js
async asyncData() {
  const postList = await $content('travel').fetch();
  return { postList }
}
```

## 마무리하며

여기까지 이해되셨나요? 글들을 가져오면서 개수 제한이나 조건에 따라 불러오게 할 수 있지만 지금 여기서는 하지 않겠습니다. 차근차근 만들어가며 이후 필요할 때 알려드리겠습니다.

다음 시간에는 블로그 글들을 클릭하면 해당 글 내용을 볼 수 있게 링크와 페이지를 만들어보겠습니다.
