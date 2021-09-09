---
title: 내가 nuxt content를 쓰는 이유
tags:
    - nuxt
    - blog
image: /images/210903-nuxt-content/210909-123721.png
createdAt: 2021-09-09
---

블로그를 만드려는 사람들은 많고 그에 따른 기술도 다양하지만 그 중 블로그 초보인 내가 왜 @nuxt/content를 쓰는지에 대한 얘기를 해보려 한다.

<!--more-->

## Vue / Nuxt

프론트엔드 개발자가 된지 거의 반년이 다 되어간다. 그 중 Nuxt를 이용해 회사 홈페이지를 제작하였고 공부하자마자 그런 사이트를 혼자서 프론트엔드를 담당하여 만든다는 건 엄청난 부담이였지만 그만큼 많은 것들을 알 수 있는 좋은 기회였다.

어쨌든 Nuxt가 가진 장점을 많이 느꼈는데 대표적으로

1. 폴더 구조가 VueJS 보다 체계적이다.
2. pages 폴더 내에 vue 파일을 넣는 것만으로 자동 routing이 가능하다.
3. head 설정이 가능하다.
4. 생각보다 연계된 라이브러리들이 많다.

정도인 것 같다. 그러다가 알게된 nuxt/content. 별 생각 없이 처음엔 이걸로 블로그를 만들었다.

## Headless CMS

먼저 **CMS(Content Management System)은 DB, Backend, Frontend를 모두 포함한다.** 이것만 있다면 사이트 하나 만들고 회원, 포스팅 관리등을 할 수 있게 된다.

**Headless CMS는 위 3개중 Frontend를 뺀 것**으로, 많은 프론트엔드 개발자가 자신만의 블로그를 만들기 위해 Vue나 React를 공부하고 Nuxt / React를 익혀서 SSR(Server Side Rendering)을 하여 겉으로 보이는 블로그는 만들어내게 된다.

그러면 찾게 된다. 나의 글을 어디서 등록/삭제 등 관리하여 가져와서 내 블로그에 보일지...그렇다 Headless CMS가 필요한 것이다..!

### 티스토리와 다른 점

CMS 들을 돌아다녀보면서 티스토리와는 좀 다르다는 느낌을 받았는데 바로 `content-type` 때문이다. 티스토리에 들어가면 보통 써야할 것들이 정해져있다. 카테고리 / 제목 / 본글.

![](/images/210903-nuxt-content/210909-125644.png)

그런데 CMS는 좀 더 우리에게 자유도를 주고 싶어서 다양한 타입이 있다. 만약 글을 쓸 때 본글을 넣고싶다면 Rich Text를 추가하고, 포스팅의 커버 이미지를 넣고 싶다면 미디어를 추가하는 등 우리가 글을 쓸 때 넣어야할 폼들을 정하는 게 있다. 심지어 날짜까지도 넣을지 말지 정한다.

![](/images/210903-nuxt-content/210909-125845.png)

네이버와 티스토리 블로그만 만들어본 내겐 신선한 세계..그래서 하루 퇴근 후 Nuxt에 어울릴만한 Headless CMS들을 찾아보았다. 모든 기능을 설명하진 않고 내가 느낀 장단점만 넣겠다. 대부분 CMS끼리 비슷비슷한 면이 있기 때문에 두드러진 부분만 말하겠다.

### Strapi

배포하는 걸 좋아하고(?) DB, GraphQL을 사용할 줄 안다면 추천한다. 왜냐하면 호스팅을해서 관리하는 식이기 때문에 해당 사이트에서가 아닌 자신이 프로젝트로 만들고 DB도 설정해서 관리해야하기 때문에 난이도가 좀 있는 편.(그래서 난 빠른 손절)

![](/images/210903-nuxt-content/210909-130721.png)

![](/images/210903-nuxt-content/210909-130800.png)

### Contentful

로그인만하면 해당 사이트 서버가 포스팅과 이미지들을 관리해준다. 총 25000개까지만(이미지와 글들 개수 각각해서) 포스팅을 몇 천개 써도 넘어갈 일은 없어보이기에 걱정할 필요는 없다.

맘에 드는 점 몇가지라고 하면 포스팅이 자동저장이 되고 버전관리가 된다는 점이며, Preview를 지원한다는 점이다.

단점은 이미지를 넣으려면 일단 파일을 업로드하고 그걸 클릭해서 가져오는 식인데 난 이미지를 클립보드에 복사해서 붙여넣기하는 것을 선호하기 때문에 큰 단점으로 다가왔다. 심지어 preview를 보면서는 새로 이미지를 넣을 수도 없다.

![](/images/210903-nuxt-content/210909-131043.png)

![](/images/210903-nuxt-content/210909-131520.png)

이미지를 넣는데 title과 설명이 왜 필요한가..

![](/images/210903-nuxt-content/210909-131755.png)

### ButterCMS

Editor가 마크다운은 아니다. 티스토리 기본모드 같달까..그러다보니 이미지 copy & paste가 가능하다는 장점이 있고 티스토리처럼 HTML코드로 넣는 방법도 있다.

여기서 느낀 가장 독특한 점 하나를 꼽자면 미리 API에서 응답이 어떻게 나올지 보여준다는 점이다. 이건 좀 홀리몰리 좋아보였다.

![](/images/210903-nuxt-content/210909-131932.png)

![](/images/210903-nuxt-content/210909-131954.png)

![](/images/210903-nuxt-content/210909-132051.png)

### Ghost

이건...사실 Headless CMS가 아니다. 즉 글만 쓰면 사이트 기본적인 템플릿이 나온다. 어차피 안 쓸것이기 때문에 중요한 특징 중 하나는 바로 Notion같다는 것!! 즉, 마크다운 문법을 입력하면 바로 변환되어 결과가 나타나는 형태인데, 당연히 이미지 copy & paste도 가능하다.

거의 혹해서 이걸로 할까 했지만. Category가 아닌 Tag형태로 포스팅들을 구분한다는 점이 좀 아쉬웠다. 카테고리와 Tag를 별개로 두고 싶기도 해서 어쩔 수 없이 포기했다. 내가 본 것들 중에는 이게 제일 좋았다.

![](/images/210903-nuxt-content/210909-132439.png)

![](/images/210903-nuxt-content/210909-132522.png)

![](/images/210903-nuxt-content/ghost_editor.gif)

### Nuxt/content

위 Headless 와 다른 특징이라고 하면 Git based라는 점이다. 즉, 위에서는 UI들을 제공해주고 자체 호스팅이나 서버를 제공해주어서 입력하고 Publish 버튼만 눌러주면 되지만, 이건 직접 자신이 markdown 파일을 만들고 이미지도 파일로 만들어서 static 폴더에 넣고 git을 커밋하고 푸시해야한다.

이게 젤 불편한거 아니냐고? 다르게 말하면 내가 쓰는 개발 환경(VSCode)에서 글을 쓰며, Paste Image라는 플러그인을 쓴다면 불편함은 반으로 줄어든다고 볼 수 있다. 오히려 Vim을 쓰는 나에겐 너무나 편하고 git commit push가 그리 불편하진 않다. 오히려 글도 버전관리가 가능하다는 점이 있다.

Nuxt와 연동하기 위해 NuxtContent 컴포넌트만 써주면 포스팅은 자동으로 알아서 HTML 코드로 만들어준다. 물론 다른 것들이 어렵다는 것은 아니다 Markdown-it을 써서 HTML코드로 변환하면 된다.

```html
<template>
    <nuxt-content :document="post"></nuxt-content>
</template>
<script>
export default {
    async asyncData(ctx) {
        const post = await ctx.$content("/post").fetch();
        return { post }
    }
}
</script>
```

하지만 여전히 리소스 걱정은 좀 있다. 아마 포스팅이 많아지면 한 폴더 내에 많은 포스팅 글과 이미지들이 있겠지..그래서 경로를 `/vuejs/210903-nuxt-content`에서 `/vuejs/2021/09/nuxt-content`로 변환하려는 노력은 시도하고 있다.

![](/images/210903-nuxt-content/210909-135036.png)

다른 사람은 아니겠지만 나는 Vim 유저인데다가 copy & paste image 가 너무 편해서 이게 없으면 글을 못 쓰겠다. 이 두 가지가 모두 가능한 Nuxt/content를 난 포기할 수 없다.

Notion을 CMS로 쓸 생각도 해봤지만 아직 API가 Beta라서 자주 바뀌면 내가 고칠 자신이 없다.(귀찮아서..)

## 3줄 요약

- Notion 같은 CMS를 원하면 Ghost 추천
- 자체 호스팅과 DB 관리를 즐긴다면 Strapi 추천
- 내 레포에 모든걸 다 떄려박고 관리하고 싶다면 Nuxt/content 추천
