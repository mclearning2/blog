---
title: Thymeleaf 정리 - Thymeleaf란?
tags: [test, test2, test3, 이렇게해도 되나]
image: /images/210713-what-is-thymeleaf/210713-164531.png
---

우연한 계기로 회사에서 Thymeleaf template을 써야하는 상황이 생겼습니다.
하지만 JAVA랑 Spring을 모르는 상태에서 사용해야하는 거라 이에 대한 내용은 최대한 배제하고 진행할 예정이니 참고바랍니다.

그리고 backend 측에서 Default 클래스나 구현하였다고 가정하고 작성하겠습니다

이 포스트는 [공식 문서](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#link-urls)를 토대로 작성되었습니다.

## Thymeleaf란?

문서에 의하면 다음과 같이 적혀있습니다.
다

> Thymeleaf is a modern **server-side Java template engine** for both web and standalone environments, capable of processing HTML, XML, JavaScript, CSS and even plain text.

정리해보자면 **JAVA 프로그래밍 언어를 기반으로 서버측에서 제공하는 데이터를 통해 파일을 렌더링해주는 엔진**입니다.

즉, 문서가 동일한 값과 형태가 아닌 로직과 변수에 따라 동적으로 다르게 만들어질 수 있습니다. 이 템플릿 엔진을 사용하면 말이죠.

템플릿 엔진을 적용할 수 있는 파일 형식은 다음과 같이 있습니다.

- HTML
- XML
- TEXT
- JAVASCRIPT
- CSS
- RAW

이 튜토리얼은 HTML을 기반으로 설명하기 떄문에 앞으로의 포스팅도 그에 따라 진행하겠습니다.

## Dialects

HTML의 태그에 로직을 적용하는 어떤 객체(object)를 여기서는 **Processor**라고 부르며, 이러한 processor들의 집합을 **Dialect**라고 부릅니다.

앞으로 배울 것들은 Thymeleaf에서 기본적으로 제공하는 **Standard Dialect**이며, 사용자가 직접 dialect를 만들 수도 있습니다.

## JSP와의 차이점 : Natural Templating

`user.name`이란 값이 있을 때 JSP는 다음과 같은 방법을 이용해 값을 나타냅니다.

```html
<form:inputText name="userName" value="${user.name}" />
```

위와 동일한 기능을 하기 위해 다음과 같이 Thymeleaf standard dialect 중 하나인 `th:value`를 사용할 수 있습니다.

```html
<input
  type="text"
  name="userName"
  value="James Carrot"
  th:value="${user.name}"
/>
```

비슷해보이지만 한가지 눈에 띄는 것은 th:value로 변수값을 들고오는 것 뿐만아니라 기존의 속성인 value도 사용한다는 점입니다.

만약 `user.name`이라는 값이 없어도 `James Carrot`이라는 값을 대신 보일 수 있어서 user.name이라는 값을 만들기 전까지 프로토타입으로 사용할 수 있습니다.

그래서 **디자이너와 개발자가 동일한 코드로 개발**이 가능하게되고, 임의의 예시 값이 들어있는 **정적 코드에서 실제 템플릿 코드로 변환하는데 큰 노력이 필요하지 않습니다.**

이러한 역할을 하는 기능을 **Natural Templating**이라 하며, Thymeleaf는 이 기능을 기반으로 만들어졌습니다.

## 앞으로의 포스팅

공식 문서에서는 가상의 식료품점 사이트를 데모로 보여주며 설명하지만, 저는 오로지 템플릿 엔진만 공부할 것이기 때문에, 저만의 방식으로
다른 예를 들면서 포스팅하겠습니다.
