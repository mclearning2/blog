---
title: 사파리에서 svg 흐려보이는 현상 해결
tags:
  - SVG
image: /images/svg-blurry-safari/210923-170443.png
createdAt: 2021-09-22
---

SVG 이미지를 띄우다 보면 분명 흐릴 이유가 없는데 사이트에서는 흐려져 보이는 문제가 있다. 이 문제를 겪으면서 찾아본 방법들을 정리해본다.

<!--more-->

## 문제

크롬에서는 정상으로 보이지만 사파리에서는 흐려보인다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNOKmVV" data-editable="true" data-user="mclearning2" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mclearning2/pen/WNOKmVV">
  svg blurry</a> by Mincheol Kim (<a href="https://codepen.io/mclearning2">@mclearning2</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 1. css transform 수정

[Stackoverflow](https://stackoverflow.com/questions/24439705/svgs-are-displaying-blurry-in-safari)에서 찾은 방법으로 해결되지는 않았다.

`-webkit-transform: translate3d(0,0,0)`

## 2. img 대신 svg 자체를 쓰기

파일을 `img` 태그로 불러와서 생기는 문제로 보여서 svg 태그 자체를 가져와봤더니 괜찮아졌다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qBjywpK" data-editable="true" data-user="mclearning2" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mclearning2/pen/qBjywpK">
  </a> by Mincheol Kim (<a href="https://codepen.io/mclearning2">@mclearning2</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 3. Object Tag 로 감싸기

[Joo-Kwang Park 님의 블로그](https://jkpark.me/safari/html/css/svg/frontend/2019/06/07/SVG-%EC%82%AC%ED%8C%8C%EB%A6%AC%EC%97%90%EC%84%9C-%ED%9D%90%EB%A6%AC%EA%B2%8C-%EB%B3%B4%EC%9D%B4%EB%8B%A4.html)에 의하면 object 또는 iframe을 사용하면 해결된다고 한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="OJgwGBP" data-editable="true" data-user="mclearning2" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mclearning2/pen/OJgwGBP">
  not blurry SVG with object</a> by Mincheol Kim (<a href="https://codepen.io/mclearning2">@mclearning2</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 4. svg 내에 코드 수정하기

나의 예시의 경우엔 내부에 이런 코드가 있다. `filter=url(#filter-2)`가 뭔지는 모르겠지만 전혀 필터가 필요없는 이미지이기 때문에 제거해도 상관 없었다. 그리고 제거해보니 말끔해졌다.

```html
<!-- ... -->
<g filter="url(#filter-1)" id="Group">
  <g
    transform="translate(385.500000, 395.000000) translate(-385.500000, -395.000000) translate(136.000000, 33.000000)"
  >
    <g filter="url(#filter-2)" id="ic-feature-3-copy-2">
      <!-- ... -->
    </g>
  </g>
</g>
<!-- ... -->
```

[velog의 어떤 글](https://velog.io/@dulcis-hortus/SVG-%ED%8C%8C%EC%9D%BC-%EC%95%84%EC%9D%B4%ED%8F%B0%EC%97%90%EC%84%9C-%ED%9D%90%EB%A6%BF%ED%95%B4%EC%A7%80%EB%8A%94-%ED%98%84%EC%83%81)에서는 내부적으로 비트맵 이미지를 가져오는 `<image>` 태그가 있어서 문제가 발생했다고 한다. svg를 다룰 줄 안다면 코드 수정해보는 방법도 좋을 듯 하다.

## 마무리하며

SVG를 Safari에서 띄우는 것에는 문제가 좀 있는 듯하다. (크롬 만세!) 그래도 이들을 위해 잘 보이도록 수정하자!
