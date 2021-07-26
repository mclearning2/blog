---
title: thymeleaf - Conditional Evaluation
tags:
  [test, test2, test3, 이렇게해도 되나, 잘 모르겠네, 핳 ㅏ하 하 하 하, 하 하 하]
image: /images/210713-what-is-thymeleaf/210713-164531.png
---

어떤 태그가 조건에 따라 나타나거나 숨겨야 하는 상황이 있을 수 있습니다. 그럼 오늘 배울 `th:if`, `th:unless`, `th:switch`/`th:case`를 사용하면 됩니다.

## th:if

`th:if=(boolean)`의 형태를 가지고 있으며 true 이면 태그가 나타나고 false면 없어집니다. 여기서 없어진다는 것은 `display: none`같은 것이 아니라 태그 자체가 없어진다고 생각하시면 됩니다.

쉬운 예로 1부터 10까지 숫자들 중 짝수만 나타나게 하고 싶다면 이전 시간에 배웠던 `th:each`와 `th:if`를 통해 쉽게 구현할 수 있습니다.

```html
<ul class="numbers">
  <li th:each="number: ${#numbers.sequence(1, 10)}">
    <span th:text="${number}" th:if="${numberStat.even}"></span>
  </li>
</ul>
```

그러면 다음과 같은 결과를 기대할 수 있습니다.

```html
<ul class="numbers">
  <li>2</li>
  <li>4</li>
  <li>6</li>
  <li>8</li>
  <li>10</li>
</ul>
```

위에서 `th:if=(boolean)`이라고 했지만 사실 (boolean)자리에 문자열이나 숫자들이 들어올 수 있습니다.

- true로 판단
  - boolean (true, false)
  - 0이 아닌 숫자 (1, -1, 3.4, ...)
  - '0' 아닌 문자 ('h', '3', ...)
  - "false", "off", "no"가 아닌 문자열 ("Hello", "product")
- 위 경우(boolean, 숫자, 문자, 문자열)를 제외한 것들 false로 판단 (null 포함)

## th:unless

`th:if`와 반대라고 생각하시면 됩니다. false일 때 태그가 나타납니다.

```html
<ul class="numbers">
  <li th:each="number: ${#numbers.sequence(1, 10)}">
    <span th:text="${number}" th:unless="${numberStat.even}"></span>
  </li>
</ul>
```

```html
<ul class="numbers">
  <li>1</li>
  <li>3</li>
  <li>5</li>
  <li>7</li>
  <li>9</li>
</ul>
```

## Switch

`th:switch=(변수)`와 `th:case=(값)`가 한 쌍으로 사용됩니다. 변수가 값에 해당되면 그 태그가 나타납니다. 만약 그 외에 default를 지정하고 싶다면 `*`를 사용하면 됩니다.

```html
<div th:switch="${user.role}">
  <!-- user.role === 'admin' -->
  <p th:case="'admin'">User is an administrator</p>

  <!-- user.role === roles.manager -->
  <p th:case="#{roles.manager}">User is a manager</p>

  <!-- 그 외 -->
  <p th:case="*">User is some other thing</p>
</div>
```

## 마치며

다음 시간에는 마크업 부분을 중복으로 사용할 경우 템플릿 형태로 만들어 쓸 수 있는 layout에 대해 알아보겠습니다.
