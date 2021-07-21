---
title: thymeleaf - iteration
---

리스트나 페이지 숫자들과 같은 비슷한 패턴이 반복되는 경우들이 있습니다. 이러한 반복들을 가능하게 해주는 속성이 바로 `th:each`입니다.

## th:each

`th:each="변수 : ${반복가능한 값}"`의 형태로 되어 있으며, `변수`는 `{반복가능한 값}`에서 하나씩 가져온 값입니다. 이 속성을 사용한 태그 내에서는 이 변수를 사용가능합니다.

예를 들어, name(String), price(Number), inStock(boolean)를 한 묶음으로 가진 productList를 전달받았다고 가정하겠습니다.

```
[
    { name: "양파링", price: 1500, inStock: false },
    { name: "포카칩", price: 2500, inStock: true },
    { name: "바나나킥", price: 2000, inStock: true },
]
```

그러면 다음과 같이 마크업할 수 있습니다.

```html
<table>
  <tr>
    <th>제품 이름</th>
    <th>가격</th>
    <th>재고</th>
  </tr>
  <tr th:each="prod : ${productList}">
    <td th:text="${prod.name}">초코칩</td>
    <td th:text="${prod.price}">2000</td>
    <td th:text="${prod.inStock}? 'yes' : 'no'">yes</td>
  </tr>
</table>
```

이는 다음과 같습니다.

```html
<table>
  <tr>
    <th>제품 이름</th>
    <th>가격</th>
    <th>재고</th>
  </tr>
  <tr>
    <td>양파링</td>
    <td>1500</td>
    <td>no</td>
  </tr>
  <tr>
    <td>포카칩</td>
    <td>2500</td>
    <td>yes</td>
  </tr>
  <tr>
    <td>바나나킥</td>
    <td>2000</td>
    <td>yes</td>
  </tr>
</table>
```

## th:each의 상태 변수 (Status Variable)

반복 변수 뿐만 아니라 실용적인 **상태 변수(Status Variable)**도 제공해줍니다.

`반복변수,상태변수 : ${반복가능한 변수}` 형태로 두면 사용 가능합니다.

```html
<tr th:each="prod,iterStat : ${productList}" th:class="${iterStat.odd} ? 'odd'">
  ...
</tr>
```

만일 이전의 예처럼 상태변수를 적지 않을 경우 `(반복변수)Stat` 로 불러올 수 있습니다.

```html
<tr th:each="prod : ${productList}" th:class="${prodStat.odd} ? 'odd'">
  ...
</tr>
```

이 stat 안에는 다음과 같은 것들이 있으며 상황에 따라 맞게 사용해주시면 됩니다.

- `index`: 현재 index (0부터 시작)
- `count`: 현재 index (1부터 시작)
- `size`: 총 개수
- `current`: 현재 요소. (반복 변수와 같습니다)
- `even`: 짝수인 경우 true, 홀수인 경우 false(0도 포함)
- `odd`: 짝수인 경우 false, 홀수인 경우 true
- `first`: 첫 번째인 경우 true, 그 외 false
- `last`: 마지막인 경우 true, 그 외 false

## 마치며

다음 시간에는 프로그래밍에서 조건에 따라 태그를 나타나게 하거나 숨길 수 있는 `th:if`에 대해 다뤄보겠습니다.
