---
title: NuxtJS 블로그 강의 3 - 포스팅 작성하기
tags:
  - Nuxt Blog Lecture
image: /images/nuxt-basic-1/210912-031150.png
---

지난 시간까지는 페이지를 서로 연결하는 방법에 대해 배워보았습니다. 이제 내용을 채워보아야겠죠?

<!--more-->

이전까지는 반말체를 써봤는데 역시 전 높임말체가 더 편하네요. 하하;;

여튼 의미없는 내용을 채우기보다 실제로 글을 써보고 그 글을 저희 페이지에 띄어봅시다!

## @nuxt/content

그러기 위해 먼저 필요한 것이 있는데요. 바로 [@nuxt/content](https://content.nuxtjs.org/) 모듈입니다. NuxtJS 이제야 좀 핥아봤는데(?) 다른 모듈도 배워야합니까?! 라고 생각하실 수도 있지만 어렵지 않아요!

@nuxt/content는 Markdown, JSON, YAML, XML 와 CSV 파일들을 작성하고 MongoDB 같은 방식으로 불러오는 **Git-based Headless CMS** 입니다.

### Git-based Headless CMS

어렵게 받아들일 필요없습니다. Git으로 글과 이미지들을 관리하고 배포하는 컨텐츠 관리 시스템 (Content Management System)인데, 티스토리나 네이버처럼 제공하는 서버에서 글과 이미지를 관리하는 것이 아닌 저희가 프로젝트 내에서 관리한다고 생각하시면 됩니다.

`Ghost`나 `Contentful`과 같이 별개로 관리하는 방법도 있는데 `nuxt/content`가 싫으신 분들은 제가 [nuxt/content](https://www.mclearning.dev/vuejs/2021/09/why-am-i-using-nuxt-content) 쓰는 이유에서 다른 CMS 들과 비교해보았으니 참고해서 다른 것들도 사용해보세요!

### Installation

여튼 설치해볼까요? 아주 쉽습니다. 프로젝트 내에서 콘솔을 켜서 다음 명령어를 적어주세요

```
npm install @nuxt/content
```

그리고 `nuxt.config.js` 파일에 다음 내용을 추가해주세요

```js [nuxt.config.js]
{
    //...
    modules: [
        '@nuxt/content'
    ],
    content: {
        // Options
    }
    // ...
}
```

옵션은 추후 추가할테니 일단 저렇게만 적어주세요!

## 포스팅 해보기

자 이제 포스팅해볼까요!?

프로젝트 내에 `content` 폴더가 있을 겁니다. 이 곳이 우리 글들을 보관할 곳입니다. 위에서도 말씀드렸다시피 다양한 파일 포맷으로 글을 쓸 수 있지만 (제 기준으로) 가장 편한 **마크다운 포맷을 사용** 하겠습니다.

`content` 폴더 내에 `hello.md` 파일을 만들어주세요. 이 hello는 추후에 url에 포함되니 원하신다면 `1.md`처럼 숫자로 하셔도 됩니다.

이제 어떤 문법들을 사용할 수 있는지 차근차근 보겠습니다. 너무 많다고 부담가지실 필요없습니다. 다 사용 안해도 되니까요!

### Front Matter

티스토리 글들을 보면 날짜나 대표 이미지, 태그 등 설정하는 것들이 있습니다. 일종의 문서에 대한 데이터같은 것들인데요.

YAML 문법에 따라 작성합니다.

```markdown [hello.md]
---
title: 제목입니다.
extension: .md
dir: /
description: 이 글에 대한 간략한 설명입니다.
path: /index
slug: /index
createdAt: 2021-09-14
updatedAt: 2021-09-22
---

여기서 부턴 마크다운 글 쓰기
```

글을 쓸 때마다 저걸 다쓰라고요?!! 아닙니다! 보통 저희는 제목(title)과 생성일(createdAt) 정도만 적으니 그정도만 적으면 나머지 내용은 알아서 채워줍니다.

예를 들어, updatedAt의 경우에는 파일 만든 날짜가 들어갑니다.

```markdown [hello.md]
---
title: 제목입니다.
createdAt: 2021-09-14
---
```

### Markdown

이제 글을 써봐야겠죠? 대부분의 마크다운 문법들이 들어갑니다.

간략하게 어떤 것들이 있는지 알아보겠습니다.

````md [hello.md]
---
title: 제목입니다.
createdAt: 2021-09-14
---

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

<!-- 주석 -->

[하이퍼링크 3](/articles)

![이미지](https://www.mclearning.dev/logo.png)

**글자 강조**
~~취소선~~

`inline code`

```js
document.querySelector('body');
```

- [ ] 체크박스

<p>HTML 태그도 넣을 수 있다.</p>
````

LaTex 문법이나 Vue Component를 사용할 수 있지만 추가적으로 설정을 넣어줘야하기 떄문에 추후 다뤄보도록 하겠습니다.

## 마무리하며

오늘은 `nuxt/content`를 사용하여 포스팅 글을 쓰는 방법에 대해서 알아보았습니다.
