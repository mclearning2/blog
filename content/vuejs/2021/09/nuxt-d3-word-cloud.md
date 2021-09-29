---
title: vue에서 d3 word cloud를 이용한 태그 클라우드 컴포넌트 만들기
tags:
  - D3
  - Word Cloud
image: /images/nuxt-d3-word-cloud/210911-134138.png
createdAt: 2021-09-17
---

블로그를 하면서 카테고리를 만들었으나 내부 좀 더 세세한 구분을 위해 태그를 사용하곤 한다. 티스토리에서 보면 단순히 글 나열만 되어 있어서 좀 심심한 감이 없지 않아 있다. 그래서 찾아보다 발견한 [d3-cloud](https://github.com/jasondavies/d3-cloud). 이것을 어떻게 구현했는지 정리한 글이다.

<!--more-->

## D3 cloud

태그 클라우드를 구현하기 위한 JQuery library들이 많이 보였으나 난 되도록 쓰고 싶지 않았다. 그래서 github star도 많이 받고 되도록 단순한 구현을 찾아보았는데 그것이 **d3-cloud** 였다.

**D3.js는 데이터를 시각적으로 표현하기 위한 javascript library**이며 d3-cloud는 그 중 일부이다.

웹에 [데모](https://www.jasondavies.com/wordcloud/)도 있으니 한번 참조해보자.

### API Reference

아래의 것들을 조합해서 원하는 cloud를 만들 것이다. 굳이 다 볼 필요 없으므로 필요할 때만 보자. 패스!

- `d3.layout.cloud()`: 클라우드 레이아웃 생성
- `on(type, listner)`: 이벤트 리스너. 현재는 `word`와 `end`만 지원
    - `word` 는 단어 하나하나 위치시켜놓을 때마다 발생. 해당 word가 argument로 들어온다.
    - `end` 는 모든 단어를 다 위치 시켜놓을 떄 발생. 모든 단어들과 경계선 좌표(`[{x0, y0}, {x1, y1}]`)가 argument로 들어온다.
- `start()`: 레이아웃 알고리즘 시작. 단어들을 큰 것부터 넣기 시작하고 충돌을 체크해서 발생할때마다 다른 위치로 넣는다. (만약에 들어갈 자리가 없을 경우 포함되지 않으니 유의)
- `stop()`: 레이아웃 알고리즘 멈춤.
- `timeInterval([time])`: 내부적으로 `setInterval` 사용하여 event loop가 계속 되도록 해준다. default는 `Infinity`
- `words`: 클라우드에 띄울 단어들. default는 `[]`
- `size([size])`: 레이아웃의 크기를 결정한다.(width, height) default는 `[1, 1]`
- `font([font])`: 단어들의 폰트를 결정한다. default는 `serif`
- `fonrStyle([fontStyle])`: 폰트 스타일을 결정한다. default는 `normal`
- `fontWeight([fontWeight])`: fontWeight을 결정한다. default는 'normal'
- `fontSize([fontSize])`: font 크기를 결정한다. default는
```js
function(d) { return Math.sqrt(d.value); }
```
여기서 value는 words에 값을 넣을 때 포함되어야 한다. (예. `{text: 'word', value: 30}`)
- `rotate([rotate])`: 각 단어의 회전각을 결정. default는
```js
function() { return (~~(Math.random() * 6) - 3) * 30; }
```
- `text([text])`: words에서 넣은 값에서 표시할 것을 명시한다. 예를 들어 words에 `{text: 'word', value: 30 }`를 넣었다면
```js
function(d) { return d.text;}
```
- `spiral([spiral])`: 단어를 위치시킬 떄 사용하는 나선형의 형태를 결정할 수 있는데 **archimedean(원형)** 또는 **rectangular**를 선택할 수 있으며 함수로 임의로 만들 수도 있다. default로 내장된 `archimedean`을 사용한다.
![](/images/nuxt-d3-word-cloud/210911-232455.png)

- `padding([padding])`: 각 단어의 padding을 결정. default는 `1`.
- `random([random])`: 내부적으로 단어를 초기 위치와 시계, 반시계 방향 각도를 결정할 때 사용하는 랜덤 숫자 생성기. 0 이상 1 미만 숫자가 들어가야하며 default는 `Math.random`
- `canvas([canvas])`: 캔버스 생성기. default는
```js
function() { return document.createElement("canvas"); }
```

## Vue 에서 사용하기

이제 컴포넌트에 한 번 구현해보자.

### 설치

```shell
npm install --save d3 d3-cloud
```

### HTML

HTML tag 하나 생성한다 이 안에 svg를 만들 것이다.

```html
<div id="word-cloud"></div>
```

### Javascript - 단어들 만들기

nuxt content를 사용하여 난 tag들을 가져오지만 아닐 사람들을 위해 예시로 리스트를 보이겠다. `text`는 나열할 단어, `size`는 크기이다.

```js
const words = [
    { text: 'Hello', size: 20 },
    { text: 'Bye', size: 30 },
    { text: 'Good', size: 10 },
    { text: 'Bad', size: 25 },
    { text: 'Title', size: 50 },
    { text: 'Style', size: 40 },
    { text: 'Vue', size: 30 },
    { text: 'Javascript', size: 24 },
    { text: 'HTML', size: 10 },
    { text: 'CSS', size: 34 },
];
```

### Javascript - layout 생성

위 API에서 본 것들 중 일부를 사용한다.

```js
    const cloud = require('d3-cloud');

    cloud() // Cloud layout 생성
      .words(words) // layout에 넣을 단어들
      .padding(1) // 단어들의 사이 공간 좁게 (1)
      .font('Impact') // 폰트 serif 대신 Impact
      .fontSize((d) =>{ return d.size; }) // 폰트 크기 결정 words 내에 size 사용
      .on('end', end) // 배치가 끝나면 end 함수 부르기
      .start() // 배치 시작
      .stop(); // 계속 호출할 것이 아니기 떄문에 바로 stop
```

### Javascript - end 콜백함수로 element 배치

위 레이아웃은 그저 각 words에 배치를 적절히하여 속성만 부여했을 뿐 아직 Element로 만들어서 배치하지 않았다. 실제로 `end(words)` 콜백함수의 words 값을 찍어보면 다음과 같이 나온다.

![](/images/nuxt-d3-word-cloud/210911-235247.png)

d3 모듈은 간단히 element를 추가할 수 있다. 하지만 우리 목표는 태그 클라우드 만드는 것이므로 필요한 것들만 몇 가지 가져오겠다.

```js
function end(words) {
    const width = 300;
    const height = 300;
    d3.select("#word-cloud") // querySelector 처럼 엘레멘트 선택
      .append('svg') // #word-cloud 안에 svg 태그 추가
      .attr('width', width) // svg width
      .attr('height', height) // svg height
      .style('background', 'white') // svg {background: white}
      .append('g') // svg 안에 g 태그 추가 (group)
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')') // g를 중심에서 단어들을 그리기 때문에 g를 svg 중심으로 이동
      .selectAll('text') // text 태그를 찾습니다.
      .data(words) // words 값들을 text 태그들에 바인딩
      .enter() // text 태그들과 매칭되지 않은 나머지들을 가상의 객체를 만든다. (당연히 하나도 없었으므로 모두 가상의 객체를 가져온다.)
      .append('text') // 해당 객체들을 text로 만든다.
      .style('font-size', (d) => { return d.size + 'px'}) // text 폰트 사이즈를 각 word의 size 값을 사용해 style값 지정한다. text: { font-size: (d.size)px }
      .style('font-family', 'Impact') // 폰트 패밀리 지정
      .attr('text-anchor', 'middle') // 좌표를 중간지점을 중심으로 폰트를 그린다. 이를 지우면 단어끼리 충돌할 수 있다.
      .attr('transform', (d) => {
        return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
      }) // word의 x, y, rotate 값을 이용해서 위치와 회전 시켜서 배치
      .text((d) => d.text) // 마지막으로 값을 넣는다.
}
```

## Vue Component

이제 이것을 Vue Component 로 구현해보면 다음과 같다. words값이 지금은 고정적이지만 수정해서 자신만의 태그 클라우드를 만드길..

```vue
<template>
  <div id="word-cloud"></div>
</template>

<script>
export default {
  data() {
    return {
      words: [
        { text: 'Hello', size: 20 },
        { text: 'Bye', size: 30 },
        { text: 'Good', size: 10 },
        { text: 'Bad', size: 25 },
        { text: 'Title', size: 50 },
        { text: 'Style', size: 40 },
        { text: 'Vue', size: 30 },
        { text: 'Javascript', size: 24 },
        { text: 'HTML', size: 10 },
        { text: 'CSS', size: 34 },
      ],
    };
  },
  mounted() {
    this.genLayout();
  },
  methods: {
    genLayout() {
      const cloud = require('d3-cloud');
      cloud()
        .words(this.words)
        .padding(1)
        .font('Impact')
        .fontSize(function (d) {
          return d.size;
        })
        .on('end', this.end)
        .spiral('archimedean')
        .start()
        .stop();
    },
    end(words) {
      const d3 = require('d3');
      const width = 300;
      const height = 300;
      d3.select('#word-cloud')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', 'white')
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')') // g를 중심에서 단어들을 그리기 때문에 g를 svg 중심으로 이동
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', (d) => {
          return d.size + 'px';
        })
        .style('font-family', 'Impact')
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        })
        .text((d) => d.text);
    },
  },
};
</script>
```

![](/images/nuxt-d3-word-cloud/210912-004316.png)

## 마무리하며

나만의 태그 클라우드를 만들기 위해 D3와 D3-cloud를 사용해봤다. 지금은 색상이 단조롭지만 `style('fill', (d) => randomRGB())` 와 같이 스타일을 넣어준다면 좀 더 예쁜 태그 클라우드를 만들 수 있을 것이다.

```js
randomRGB() {
  const r = parseInt(Math.random() * 255);
  const g = parseInt(Math.random() * 255);
  const b = parseInt(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
},
```

하지만 아직 클릭 시 해당 태그 글들을 가져오는 기능도 없다. 추후 Nuxt 블로그 만드는 강의를 만들면서 추가할 예정이다.