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

```html
<head>
  <meta property="og:title" content="블로그 오픈 겸 나의 목표" />
  <meta
    property="og:description"
    content="안녕하세요 드디어 블로그를 오픈했습니다~! 오랜 꿈이였던 저만의 블로그를 만들었네요."
  />
  <meta
    property="og:image"
    content="https://mclearning-blog.com/images/210705-blog_start/cover-image.png"
  />

  ...
</head>
```

![](/images/210710-opengraph/210710-163804.png)

### 트위터

카카오톡, 페이스북, 슬랙 등 OpenGraph만 설정하면 링크했을 때 설정했던 이미지, 제목, 설명들이 잘 나타나는 것을 볼 수 있는데요. 트위터는 더 풍부한 메타데이터를 제공하고 있습니다.

대표적으로 `twitter:card`는 summary, summary_large_image, player 등으로 공유할 때 이미지를 크게 보여줄지 작게 보여줄 지, 또는 플레이 가능한 영상을 표시하게도 할 수 있습니다.

자세한 내용은 [트위터 공식문서](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)를 통해 확인해주시고 자주 사용하는 것들 몇 가지만 살펴보겠습니다.

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="페이지 제목" />
<meta name="twitter:description" content="페이지 설명" />
<meta name="twitter:image" content="이미지 경로" />
<meta name="twitter:domain" content="사이트 명" />
```

위에서 말했던 card 외에는 기존의 OpenGraph와 유사합니다.

## Nuxt에서 적용

Nuxt에서는 [SEO Twitter and Open Graph](https://nuxtjs.org/examples/seo-twitter-og) 라는 제목으로 예시를 통해 간략하게 설명하고 있는데요.

공용으로 사용할 Componenet를 하나 추가해주시고 head의 내용을 넣어주는 방법을 사용합니다.

```vue
<template>
  <span v-if="false" />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://nuxtjs.org/nuxt-card.png',
    },
    // ...
  },

  head() {
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.image,
        },
        // ...
      ],
    };
  },
};
</script>
```

위에서 만든 component를 page용 component에 넣어주기만 하면 해당 페이지는 그에 맞춰서 head가 들어가는 방식이죠!

```vue
<template>
  <article class="post-item">
    <!--------------------------->
    <meta-open-graph
      :title="doc.title"
      :image="doc.image"
      :description="doc.description"
    ></meta-open-graph>
    <!--------------------------->

    <!--
    ...
    -->
  </article>
</template>
```

혹시 제가 적용한 방식이 궁금하신 분들은 제 깃헙의 [OpenGraph component](https://github.com/mclearning2/blog/blob/master/components/meta/OpenGraph.vue)와 [Page Component](https://github.com/mclearning2/blog/blob/master/components/page/Post.vue), [async_data](https://github.com/mclearning2/blog/blob/master/plugins/async_data.js)를 참조해주시면 되겠습니다.

## 테스트

배포까지 완료되었다면 되는지 테스트해봐야겠죠?

실제로 적용가능한지 글을 올리면서 테스트해봐도 되지만 [Twitter](https://cards-dev.twitter.com/validator)와 [Facebook](https://developers.facebook.com/tools/debug/)은 별개의 테스트 사이트를 제공하고 있습니다.

### Twitter

![](/images/210710-opengraph/210711-093510.png)

### Facebook

![](/images/210710-opengraph/210711-100027.png)

모두 잘 적용해서 공유하기 좋은 사이트 만드시길 바랍니다.
