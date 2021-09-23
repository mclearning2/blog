---
title: Nuxt에서 Google Adsense 추가하는 방법
tags:
  - Blog
image: /images/nuxt-adsense/210923-194753.png
---

내가 Nuxt에서 블로그를 만들고 광고를 어떻게 달았는지에 대해 가볍게 정리해보았다. 여기서는 이미 구글 에드센스 통과했다는 가정하게 태그를 추가하는 방법을 중점적으로 다룬다.

<!--more-->

## 광고 넣을 태그 코드 구하기

애드센스 사이트에서 **광고 > 개요**를 클릭한 후, **광고 단위 기준**을 클릭.

![](/images/nuxt-adsense/210923-212306.png)

좌측 상단에 이 광고에 대한 이름만 정하고(나는 그냥 "광고"라고 적었다.) 우측 하단에 만들기 버튼을 눌러준다.

![](/images/nuxt-adsense/210923-212504.png)

그러면 아래에 이렇게 추가한 광고가 나타나는데, 여기에 `<>` 모양 버튼을 클릭하면 HTML 코드를 보여준다.

![](/images/nuxt-adsense/210923-210021.png)

![](/images/nuxt-adsense/210923-210626.png)

## script 추가하기

우선 이 script 를 body에 추가하라고 나와있지만 Nuxt에서 어디에 추가해야할 지 애매하다.

```js
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2649674681017228"
  crossorigin="anonymous"
></script>
```

### @nuxtjs/google-adsense 문제

보통 위 코드 내용들을 편하게 추가하기 위한 `@nuxtjs/google-adsense`이 있지만, 실제로는 아래와 같은 에러에 직면하게 된다.

```
"adsbygoogle.push() error: Only one AdSense head tag supported per page."
```

여러 번 script가 호출되어서 발생하는 문제로 보인다. 그래서 위 모듈을 사용하는 것 대신에 직접 스크립트를 추가하는 방법을 사용한다.

하지만 단순히 `nuxt.config.js`에 넣으면 또 중복 문제가 발생한다. 그래서 내가 찾은 방법은 두 가지가 있다.

### 방법 1 - script 추가하기

[GM Yankee님의 글](https://gmyankee.tistory.com/351)의 방법에 따르면 한 번만 실행할 스크립트를 만들고 그 스크립트로 head에 추가하는 방법이다.

1. static 폴더에 script 태그를 head에 추가하는 코드(js)를 추가
2. `nuxt.config.js`에서 해당 js를 불러오기

```js [static/adsense.js]
const script = document.createElement('script');
script.setAttribute('data-ad-client', 'ca-pub-1234567890'); // 여기 수정
script.setAttribute(
  'src',
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
);
document.head.appendChild(script);
```

```js [nuxt.config.js]
head: {
  script: [
      {
        defer: true,
        hid: 'adsense',
        src: '/adsense.js',
      },
    ],
}
```

### 방법 2 - app.html 수정하기

나는 조금 다른 방법을 사용하기로 했다. 가장 최상단의 html을 수정한다면 중복된 호출이 없어질 것 같았다. 프로젝트 폴더에 `app.html`을 추가하여 다음 내용을 넣어주면 된다.

```html [app.html]
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
    <script
      data-ad-client="ca-pub-2649674681017229"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    ></script>
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

**물론 `ca-pub-**\*\*\*\*\*\*\*\*` 부분은 본인 것으로 수정해야한다.\*\*

## 광고 태그 추가하기

나같은 경우는 여러 군데 넣을 것을 감안하여 컴포넌트를 만들었다.

```vue [Ad.vue]
<template>
  <div class="site-ad">
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-2649674681017229"
      data-ad-slot="4908962850"
      :data-ad-format="format"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
export default {
  props: {
    format: {
      type: String,
      default: 'auto',
    },
  },
  mounted() {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Adsbygoogle error is ', error);
    }
  },
};
</script>
```

### data-ad-format

다른건 다 그대로 사용하면서 data-ad-format 만 다르게 받을 수 있게 해놓았다. auto로 들어가면 왠만해선 자리에 맞게 들어가지만 가끔은 다르게 하고 싶을 수 있기 떄문이다.

구글 애드센스페이지 광고를 만들 때 3가지 형태가 있던걸 볼 수 있다. `사각형(rectanagle)`, `수평형(horizontal)`, `수직형(vertical)`이 있다. `auto`를 할경우 해당 태그의 위치에 맞게 3가지 중 하나로 format를 맞춰준다.

![](/images/nuxt-adsense/210923-214453.png)

![](/images/nuxt-adsense/210923-214549.png)

![](/images/nuxt-adsense/210923-214603.png)

### 컴포넌트 사용하기

그런 다음 원하는 곳에 이 컴포넌트를 넣기만 하면 된다. 아래와 같은 느낌으로...

```vue [Main.vue]
<template>
  <div class="main">
    <Ad format="vertical"></Ad>
  </div>
</template>
```

## 마무리하며

바로 나타나지 않을 수 있지만 기다리면 원하는 결과가 나올 것이다. 혹시나 다른 좋은 방법이 있다면 알려주시길...
