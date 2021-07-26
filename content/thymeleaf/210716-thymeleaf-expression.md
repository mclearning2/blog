---
title: Thymeleaf 정리 - Expression (Message)
tags: [test, test2, test3, 이렇게해도 되나]
image: /images/210713-what-is-thymeleaf/210713-164531.png
---

`th:*`에 들어가는 값들 중 하나인 expression들에 대해서 다뤄보겠습니다. expression은 총 5가지의 형태가 있습니다.

- Message `#{...}`
- Variable `${...}`
- Expressions on selections `*{...}`
- Link URLs `@{...}`
- Fragments `~{...}`

이전 literals들과 달리 내부 값에 따라 markup이 달라질 수 있어서 잘 숙지하고 사용하여야합니다.

## Message `#{...}`

사이트의 접속하는 유저의 국적에 따라 다른 언어가 나오도록 하고 싶을 수 있습니다. 이 때 `${...}`를 이용하면 동일한 값으로 locale에 따라 다른 언어가 나오도록 할 수 있습니다.

```html [/templates/home.html]
<p th:text="#{home.welcome}">Welcome</p>
```

이 문장을 영어로 나타내려면 해당 파일과 같은 위치에 `(파일 이름)_en.properties` 를 만들어서 해당 문자열 값들을 만들어주면 됩니다. default 언어는 `(파일 이름).properties`로 만들어주면 됩니다.

```html [/templates/home.properties]
home.welcome=제 홈페이지에 와주신 것을 환영합니다.
```

```html [/templates/home_en.properties]
home.welcome=Welcome to my homepage
```

그 외 다른 언어도 `(파일 이름)_(언어).properties` 를 만들어 해당 값에 대한 내용만 적어준다면 다양한 언어를 적용할 수 있습니다. 이렇게 텍스트를 외부 파일로 분리시킨 것을 **Message**라고 합니다.

### Message aparameter

메시지에서 내에서도 특정 문자는 상황에 따라 다르게 나타내고 싶을 수 있습니다. 예를 들어 "환영합니다." 뒤에 들어온 사용자 이름을 나타내고 싶다면 properties 파일 내용을 다음과 같이 변경하면 됩니다.

```html [/templates/home.properties]
home.welcome=제 홈페이지에 와주신 것을 환영합니다. {0}님
```

그리고 `${variable(parameter, ...)}` 형태로 해당 위치의 값을 전달하여 다른 문장을 출력할 수 있습니다.

```html [/template/home.html]
<p th:text="#{home.welcome('주인')}">Welcome</p>
```

그러면 다음과 같은 결과가 나옵니다.

```
제 홈페이지에 와주신 것을 환영합니다. 주인님
```

## Variable `${...}`

전달받은 context 내에 변수들을 mapping 해줍니다. 여기서 전달받은 값은 javscript와 비슷하게 표현할 수 있습니다.

property 접근 방법은 `[]`, `.` 두 가지로 가능합니다.

```
${person.father.name}
${person['father']['name']}
```

Array나 Collection의 값이라면 `[index]` 형태로 접근 가능합니다.

```
${personsArray[0].name}
```

함수도 호출할 수 있습니다. 심지어 parameter도 전달할 수 있습니다.

```
${person.createCompleteName()}
${person.createCompleteNameWithSeparator('-')}
```

### Expression Basic Objects

`${...}` 내에서 어떤 `#`로 시작하는 어떤 값들은 특정 object들을 참조 합니다.

- `#ctx`: context
- `#vars`: context variables
- `#locale`: context locale
- `#request`: (웹에서만) HttpServletRequest
- `#response`: (웹에서만) HttpServletResponse
- `#session`: (웹에서만) HttpSession
- `#servletContext`: (웹에서만) ServletContext

예를 들어, `#locale.country` 를 사용하면 사용자 국가를 출력할 수 있습니다.

그 외에도 다양한 object을 제공합니다. 자세한 내용들은 [공식 문서](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#appendix-b-expression-utility-objects)를 참조해주시기 바랍니다.

- `#execInfo`: information about the template being processed.
- `#messages`: methods for obtaining externalized messages inside variables expressions, in the same way as they would be obtained using #{…} syntax.
- #uris: methods for escaping parts of URLs/URIs
- `#conversions`: methods for executing the configured conversion service (if any).
- `#dates`: methods for java.util.Date objects: formatting, component extraction, etc.
- `#calendars`: analogous to #dates, but for java.util.Calendar objects.
- `#numbers`: methods for formatting numeric objects.
- `#strings`: methods for String objects: contains, startsWith, prepending/appending, etc.
- `#objects`: methods for objects in general.
- `#bools`: methods for boolean evaluation.
- `#arrays`: methods for arrays.
- `#lists`: methods for lists.
- `#sets`: methods for sets.
- `#maps`: methods for maps.
- `#aggregates`: methods for creating aggregates on arrays or collections.
- `#ids`: methods for dealing with id attributes that might be repeated (for example, as a result of an iteration).

## Expressions on selections (`*{...}`)

variable expression은 `${...}` 뿐만 아니라 `*{...}`도 가능합니다. 다만 다른 점은 선택된(selected) object 내에 접근이 가능합니다.

여기서 선택된(selected) object는 `th:obejct`를 통해서 고를 수 있습니다. `session.user` object 내에 있는 변수를 `*{}`를 통해 접근할 수 있는 것이죠.

```html
<div th:object="${session.user}">
  <p>Name: <span th:text="*{firstName}">Sebastian</span>.</p>
  <p>Surname: <span th:text="*{lastName}">Pepper</span>.</p>
  <p>Nationality: <span th:text="*{nationality}">Saturn</span>.</p>
</div>
```

또 내부에서 #object를 이용해 접근하거나 기존처럼 `${...}` 를 사용하는 등 유연하게 사용할 수 있습니다.

```html
<div th:object="${session.user}">
  <p>Name: <span th:text="${#object.firstName}">Sebastian</span>.</p>
  <p>Surname: <span th:text="${session.user.lastName}">Pepper</span>.</p>
  <p>Surname: <span th:text="*{session.user.age}">20</span>.</p>
  <p>Nationality: <span th:text="*{nationality}">Saturn</span>.</p>
</div>
```

## Link URLs(`@{...}`)

`@{...}`는 URL 연결(link)에 사용됩니다. URL 종류는 다양하게 있습니다.

- 절대 URL: `http://www.thymeleaf.org`
- 상대 URL
  - 페이지 URL: `user/login.html`
  - context URL: `/itemdetail?id=3`
  - 서버 URL: `~/billing/processInvoice`
  - 프로토콜 URL: `//code.jquery.com/jquery-2.0.3.min.js`

이런 다양한 link를 적용하기 위해, `th:href`를 사용합니다.

```html
<!-- Will produce 'http://localhost:8080/gtvg/order/details?orderId=3' (plus rewriting) -->
<a
  href="details.html"
  th:href="@{http://localhost:8080/gtvg/order/details(orderId=${o.id})}"
  >view</a
>

<!-- Will produce '/gtvg/order/details?orderId=3' (plus rewriting) -->
<a href="details.html" th:href="@{/order/details(orderId=${o.id})}">view</a>

<!-- Will produce '/gtvg/order/3/details' (plus rewriting) -->
<a href="details.html" th:href="@{/order/{orderId}/details(orderId=${o.id})}"
  >view</a
>
```

몇 가지 알아야할 특징들이 있습니다.

- `th:href`는 딱 한번 처리됩니다.
- `<a>` 태그의 `href` 속성 값을 대체합니다.
- URL parameter를 전달할 수 있습니다. (`@{/order/process(execId=${execId},execType='FAST')}`)
- 맨 앞에 `/`를 붙이면 앞에 자동으로 프로그램 context 이름이 들어갑니다.
- URL 내에서도 variable template을 적용할 수 있습니다. (`@{/order/{orderId}/details(orderId=${orderId})}`)

## Fragments

마크업을 하면서 header나 footer, menu 등 중복되게 사용되는 부분이 있습니다. 이런 부분들을 **fragments**라 정의하고 `th:fragment`라는 속성을 통해 만들 수 있습니다.

예를 들어, footer fragment를 다음과 같이 만들 수 있습니다.

```html [templates/fragments/footer.html]
<!DOCTYPE html>

<html xmlns:th="http://www.thymeleaf.org">
  <body>
    <div th:fragment="copy">&copy; 2011 The Good Thymes Virtual Grocery</div>
  </body>
</html>
```

이 fragment는 `copy`로 정의되어 다른 페이지에 `th:insert` 또는 `th:replace` 속성을 사용하여 원하는 페이지에 footer를 쉽게 포함시킬 수 있습니다.

```html [templates/home.html]
<body>
  ...

  <div th:insert="~{fragments/footer :: copy}"></div>
</body>
```

여기서 형식은 `~{(template filename) :: (fragment name)}` 으로 넣어줍니다. html 파일 전체를 하고 싶다면 `~{(template filename)}` 해도 됩니다.

만일 `th:insert`를 사용했다면 값은 `~{...}`이 나와야 하지만, 복잡하지 않은 경우 `~{`, `}`를 생략할 수 있습니다.

```html [templates/home.html]
<div th:insert="~{fragments/footer :: copy}"></div>
```

fragments에 대한 자세한 내용은 추후 다뤄보도록 하겠습니다.

## 마치며

이번 포스팅에서는 `th:*`에 들어가는 Expression들에 대해 알아보았습니다.

- Message `#`
- variable `$`
- Expressions on selections `*`
- Link URLs `@`
- Fragments `~`

다음 시간에는 `th:*` 들에 대해 좀 더 자세히 알아보도록 하겠습니다.
