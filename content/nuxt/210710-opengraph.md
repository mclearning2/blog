---
title: NuxtJS OpenGraph 적용하기
image: /images/210710-opengraph/210710-155345.png
---

사이트를 공유할 때 나타나는 이미지와 제목, 간단한 요약 글은 다 어디서 가져오는 걸까요? 바로 페이스북에서 만든
**Open graph protocol** 입니다. head의 meta 태그에 몇 가지 내용만 넣으면 이 글은 Facebook, Twitter 등
SNS에 공유할 때 링크 뿐만아니라 우리가 흔히 보는 추가적인 이미지, 제목 등을 볼 수 있게 됩니다.

자세한 설명은 이 [블로그](https://blog.ab180.co/posts/open-graph-as-a-website-preview)를 참조하면 좋겠습니다.
또 [Facebook의 Document](https://developers.facebook.com/docs/sharing/overview)도 참조하면 좋습니다.
이 글의 목표는 설명보다는 적용하기 위한 간단한 방법들을 알려드리기 위함입니다.

## 적용 방법

어떤 페이지를 만드셨다면, 그 페이지의 head에서 meta 태그를 다음과 같이 추가하면 됩니다.
추가적으로 필요한 부분이 있다면 [여기](https://ogp.me/)를 참조해주세요!

```
<head>
<meta property="og:title" content="블로그 오픈 겸 나의 목표" />
<meta property="og:description" content="안녕하세요 드디어 블로그를 오픈했습니다~! 오랜 꿈이였던 저만의 블로그를 만들었네요." />
<meta property="og:image" content="https://mclearning-blog.com/images/210705-blog_start/cover-image.png" />

...
</head>
```

![](/images/210710-opengraph/210710-163804.png)

### 트위터

트위터는 더 풍부한 메타데이터를 제공하고 있습니다. [개발자 문서](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)를 통해 확인해주시고 자주 사용하는 것들 몇 가지만 사용해보겠습니다.

```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="페이지 제목" />
<meta name="twitter:description" content="페이지 설명" />
<meta
  name="twitter:image"
  content="http://www.mysite.com/article/article1.html"
/>
<meta name="twitter:domain" content="사이트 명" />
```

## Nuxt에서 적용

## 테스트

실제로 적용가능한지 글을 올리면서 테스트해봐도 되지만 [Twitter](https://cards-dev.twitter.com/validator)와 [Facebook](https://developers.facebook.com/tools/debug/)은 별개의 테스트 사이트를 제공하고 있습니다.

### Twitter

![](/images/210710-opengraph/210711-093510.png)

### Facebook
