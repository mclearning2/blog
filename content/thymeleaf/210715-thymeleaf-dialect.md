---
title: Thymeleaf 정리 - Dialect
---

오늘은 Thymeleaf Standard Dialect 형식에 들어가는 `th:*`과 `Expression`에 다뤄보겠습니다.

## th:\*

HTML5의 요소에 속성을 `th:*=(Expression)` 형태로 적용하면서 다양한 변화를 줄 수 있습니다. 이 때 `*`에 들어가는 내용들은 엄청 많습니다.

```javasript
th:abbr th:accept th:accept-charset th:accesskey th:action th:align th:alt
th:archive th:audio th:autocomplete th:axis th:background th:bgcolor th:border
th:cellpadding th:cellspacing th:challenge th:charset ...
```

예를 들어 `th:text="Hello"`는 태그 안의 내용을 "Hello"로 바꿔줍니다.

```html [예시.html]
<p th:text="Hello">Welcome</p>
```

결과적으로 Welcome 대신 Hello가 브라우저에 나타납니다.

그런데 `th:*`는 HTML5 문법이 아니라서 IDE에서 Warning이 나타날 수 있습니다. 이를 해결하기 위한 방법으로 두 가지가 있는데요.

### html에 명시

실제 동작에는 아무런 영향을 끼치지 않지만, 이렇게 하면 Warning이 없어집니다.

```html
<html xmlns:th="http://www.thymeleaf.org">
  <!-- ... -->
</html>
```

### data-\* 문법 사용하기

HTML에서는 javascript와 css에 값을 전달하기 위한 방법으로 `data-*` 문법이 있습니다.
그래서 Warning이 나타나지 않도록 `th:text` 대신 `data-th-text`를 사용하여 동일한 기능을 하도록 할 수 있습니다.

```html
<p data-th-text="#{home.welcome}">Welcome to our grocery store!</p>
```

다만 html에서만 사용할 수 있다는 단점도 있고, `th:*`가 더 일반적이고 간략하기 때문에 **xmlns:th="http://www.thymeleaf.org"를 사용하는게 더 좋습니다.**

## th:\*에 들어가는 값들의 종류

`th:*`에 우측에 다양한 값들이 들어올 수 있습니다. 고정된 값인 **상수**, 변수나 세션 등 변하는 값인 **Expression**, 이 값들을 이용한 **연산**이 있습니다.

- 상수

  - 문자열: 'one test', 'Another one!', ...
  - 숫자: 0, 34, 3.0, 12.3, ...
  - 부울(Boolean): true, false
  - null
  - 토큰: \_, one, sometext, main, ...

- Expression

  - Variable Expression: ${...}
  - Session Expression: \*{...}
  - Message Expression: #{...}
  - Link URL Expression: @{...}
  - Fragment Expression: ~{...}

- 연산
  - 사칙연산: +, -, \*, /, %
  - 부울연산: and, or, !, not
  - 비교연산: <, >, <=, >=, ==, !=
  - 조건연산:
    - (조건) ? (참)
    - (조건) ? (참) : 거짓
    - (값) ?: (기본값)
  - 문자열 합치기: +
  - 문자열 formatting: |the name is ${name}|

위 값들을 조합하여 원하는 값을 만들어낼 수 있습니다.

- user.isAdmin() True 인 경우 : "User is of type Administrator"
- user.isAdmin() False 이고 user.type 값이 "Memeber" 경우 : "User is of type Member"
- user.isAdmin() False 이고 null인 경우: "User is of type Unknown"

```html
'User is of type ' + (${user.isAdmin()} ? 'Administrator' : (${user.type} ?:
'Unknown')
```

## Examples

하지만 실제 어떤식으로 사용되는 지 이해가 안될 수 있기 때문에 공식 문서의 예시들을 몇 가지 가져와보겠습니다.

```html [literals.html]
<!-- Text -->
<p>
  Now you are looking at a
  <span th:text="'working web application'">template file</span>.
</p>

<!-- Number -->
<p>In two years, it will be <span th:text="2013 + 2">1494</span>.</p>

<!-- Boolean-->
<div class="boolean-literals" th:if="${user.isAdmin()} == false"></div>

<!-- Null -->
<div th:if="${variable.something} == null"></div>

<!-- comma(',')나 빈칸(' ')이 없고, 영숫자, 대괄호('[', ']'), 점('.'), 하이픈('-'), 밑줄(_)로만 이루어진 글자라면 text literal에서 따옴표(')를 제거할 수 있습니다. -->
<div th:class="content_of-post1">...</div>
```

```html [operations.html]
<!-- Append (+) -->
<span th:text="'The name of the user is ' + ${user.name}"> </span>

<!-- Substitutions (|) -->
<span class="" th:text="|Welcome to our application, ${user.name}!|"> </span>

<!-- Arithmetic (+, -, /, *, %) -->
<div th:with="isEven=(${prodStat.count} % 2 == 0)"></div>

<!-- Compare (>, <, >=, <=, ==, !=) -->
<div th:if="${prodStat.count} &gt; 1">
  <span
    th:text="'Execution mode is ' + ( (${execMode} == 'dev')? 'Development' : 'Production')"
  ></span>
</div>

<!-- Condition -->
<tr th:class="${row.even}? 'even' : 'odd'"></tr>

<!-- Default -->
<p>Age: <span th:text="*{age}?: '(no age specified)'">27</span>.</p>

<!-- No-operation (동작하지 않는다)
예를 들어, th:text에 적용된다면, tag body 값을 사용하도록 할 수 있습니다. -->
<span th:text="${user.name} ?: _">no user authenticated</span>

<!-- 형변환
만약 user.lastAccessData 가 java.util.Calendar라는 타입이고 conversion service가 구현되어 있다면(Calendar - > String) 형변환이 적용됩니다.
-->
<td th:text="${{user.lastAccessDate}}">...</td>
```

## 마치며

다음 포스팅에서는 위에서 예시들지 않은 **Expression**에 대해서 좀 더 자세히 다뤄보도록 하겠습니다.
