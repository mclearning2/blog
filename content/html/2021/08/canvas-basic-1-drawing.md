---
title: HTML Canvas 정리 1] 간단한 도형 그리기
tags:
  - canvas 정리
image: /images/canvas-basic-1-drawing/210909-015041.png
description: HTML Canvas에서 다양한 도형을 그리는 방법에 대해 알아보겠습니다.
createdAt: 2021-08-03
---

웹에서 도형, 이미지 등을 그리고 싶을 때 보통 Canvas를 사용합니다.

[MDN](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API)을 토대로 Canvas에 대한 내용을 내 나름대로 소화해서 정리했습니다. Canvas 기초에 대해 알아보시는데 도움이 되면 좋겠네요.

## Canvas 그리기 준비

### HTML - \<canvas\> 태그

먼저 `canvas` 태그를 사용해야 합니다.

```html
<canvas id="canvas" width="150" height="150"></canvas>
```

- `id`: Javascript에서 그려서 사용할 것이기 때문에 접근하기 쉽게 id를 사용해주는 것이 좋습니다.
- `width`: 지정하지 않으면 기본값 300px
- `height`: 지정하지 않으면 기본값 150px

CSS 에서도 width, height를 조정할 수 있지만 좌표는 `width`, `height` 속성에 따라 그리기 때문에 Canvas에 먼저 그린 후 css가 정한 크기로 변합니다. 결국 그림이 쭈욱 땡겨져서 늘어난 느낌이 들기 때문에 되도록 속성 값을 지정하는 게 좋습니다.

### Javascript - context 생성

Canvas는 그저 그릴 영역을 정했을 뿐 무엇으로 그릴지 정하지 않았습니다. 그래서 **렌더링 컨텍스트(Rendering context)** 를 만들고 이에 접근하여 필요한 함수들을 사용해야합니다.

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
```

여기서 `getContext`함수를 통해 컨텍스트 타입을 정할 수 있는데, 저희는 기본적인 2차원 그림만 그릴 것이기 때문에 `2d`를 다뤄보도록 하겠습니다.

- `2d`: 2차원 렌더링 컨텍스트
- `webgl`: (OpenGL ES 2.0) 3차원 렌더링 컨텍스트
- `webgl2`: (OpenGL ES 3.0) 3차원 렌더링 컨텍스트
- `bitmaprenderer`: canvas의 컨텐츠를 `ImageBitmap`으로 대체하기 위한 기능만을 제공

자 이제 준비가 완료되었습니다. 이제 하나씩 그려볼까요?

## 도형 그리기

캔버스의 **좌표계는 좌측 상단이 원점**입니다. 즉 아래로 갈 수록 y값이 커지고 오른쪽으로 갈수록 x값이 커집니다. 이 점을 유의하며 도형을 그려봅시다.

![](/images/canvas-basic-1-drawing/210909-020137.png)

### 직선 그리기

그림판에서 직선을 그리기 위해 마우스를 이동(move)하고 클릭 후 드래그해서 직선을 그리듯(draw line)이 두 가지 함수가 존재합니다.

- `moveTo(x, y)`: 펜을 x, y 좌표로 이동합니다.
- `lineTo(x, y)`: 현재 펜 위치에서 (x, y)좌표로 이동하며 그립니다.

하지만 이 함수들만 사용하면 canvas에 아무것도 나타나지 않습니다. 선을 그리거나 선 내부를 색칠하라는 명령어가 필요하죠.

- `stroke()`: 펜으로 그린 경로들을 선으로 그립니다.
- `fill()`: 펜으로 그린 경로들 내부를 색칠합니다.

이제 그려볼까요??

![](/images/canvas-basic-1-drawing/210909-020216.png)

<p class="codepen" data-height="388" data-default-tab="js,result" data-slug-hash="WNjKRMd" data-editable="true" data-user="mclearning2" style="height: 388px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mclearning2/pen/WNjKRMd">
  삼각형</a> by Mincheol Kim (<a href="https://codepen.io/mclearning2">@mclearning2</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

와 생각했던 데로 그려지지 않았네요. (~~젠장~~) Canvas에서는 어디서 어디까지 stroke/fill 할지를 결정하기 위해 `beginPath`와 `closePath` 함수를 사용합니다.

- `beginPath`: 경로(path)를 만듭니다.
- `closePath`: 제일 처음 경로 위치와 마지막 경로를 연결하는 직선을 만듭니다.

closePath 덕에 마지막에 lineTo는 굳이 필요하지 않습니다.

<p class="codepen" data-height="471" data-default-tab="js,result" data-slug-hash="MWmBpWx" data-editable="true" data-user="mclearning2" style="height: 471px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mclearning2/pen/MWmBpWx">
  Canvas 사각형 올바른 그림</a> by Mincheol Kim (<a href="https://codepen.io/mclearning2">@mclearning2</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

만약에 마지막에 연결되길 원치 않는다면 `storke` 이전에 있는 `closePath`를 빼면 됩니다. `fill`의 경우에는 빼더라도 색을 채워야하기 때문에 동일한 결과가 나옵니다. 그래서 보통 `fill`을 사용할 때는 `closePath`를 뺍니다.

### 직사각형 그리기

- `fillRect(x, y, width, height)`: 색칠된 직사각형을 그립니다.
- `strokeRect(x, y, width, height)`: 선만 있는 직사각형을 그립니다.
- `clearRect(x, y, width, height)`: 직사각형 영역을 지웁니다. 즉 투명해집니다.

함수 이름과 파라미터를 딱 보면 직관적으로 알 수 있습니다.

- `x`, `y`: 직사각형 좌측 상단 좌표
- `width`: 직사각형 가로 크기. 오른쪽으로 그려집니다.
- `height`: 직사각혀 세로 크기. 아래로 그려집니다.

위 3개 함수로 다음 그림을 그려볼까요?

![](/images/canvas-basic-1-drawing/210909-020635.png)

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="JjNBWPY" data-editable="true" data-user="mclearning2" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mclearning2/pen/JjNBWPY">
  </a> by Mincheol Kim (<a href="https://codepen.io/mclearning2">@mclearning2</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

`rect`함수와 `fill`/`stroke` 함수를 따로 쓰는 방법도 있습니다.

```js
ctx.rect(10, 20, 150, 100);
ctx.fill();
```

### 호, 원 그리기

직선으로 그리는건 오각형이든 육각형이든 만들 수 있을거 같네요. 그럼 원은요? path를 무수히 많이 하면..같은 헛소리는 안하겠습니다. 이것도 물론 그리는 함수가 있지요!

- `arc(x, y, radius, startAngle, endAngle, anticlockwise)`
  - `x`, `y`: 원의 중심 좌표
  - `radius`: 원의 반지름
  - `startAngle`: 원을 그리는 시작 각도. (radian 단위)
  - `endAngle`: 원을 그리는 종료 각도. (radian 단위)
  - `anticlockwise`: 반시계 방향으로 그릴지 여부 (기본 값: false)

이제 각 좌표에다가 원을 그려볼까요? 이왕 그리는거 다양한 형태로 그려보겠습니다.

![](/images/canvas-basic-1-drawing/210909-020831.png)

<p class="codepen" data-height="706" data-default-tab="js,result" data-slug-hash="vYmameb" data-editable="true" data-user="mclearning2" style="height: 706px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mclearning2/pen/vYmameb">
  원 그리기</a> by Mincheol Kim (<a href="https://codepen.io/mclearning2">@mclearning2</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 마치며

최대한 짤막하게 한다고 한건데, 예제와 그림 때문에 길어보이네요! 내용이 좀 남았지만 다음 시간에 하도록 하겠습니다. 오늘은 다음 내용들에 대해 알아보았습니다.

- 캔버스 그리기 위한 HTML, JS 코드
- 선 그리기
- 사각형 그리기
- 원, 호 그리기

다음 시간에는 Bezier를 통한 곡선 그리기, Path2D object로 도형 저장하기에 대해 알아보겠습니다.