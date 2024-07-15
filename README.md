# Tetris

웹 상에서 플레이 가능한 테트리스 게임
<br><br><br><br><br>

## 목차

- [개요](#개요)
- [작업물](#작업물)
- [진행 중 이슈](#진행-중-이슈)
  <br><br><br><br><br>

## 개요

- 프로젝트 이름 : 웹 테트리스 (Web Tetris)
- 프로젝트 기간 : 2024.04.26 ~ 2024.04.30
- 사용 언어 및 도구 : ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

- 멤버 : 홍지민 (1인)
<br><br><br><br><br>

## 작업물

![](https://github.com/user-attachments/assets/ce68abf4-c9e3-4ebd-bfbe-b03cc35b1bf0)
![](https://github.com/user-attachments/assets/b4336625-5908-47df-90c5-578f8e118cf2)
<br><br><br><br><br>

## 진행 중 이슈
- ctx.scale() 실행 시 ctx.fillText()가 실행되지 않음
<br>→  아래 코드를 이용해 ctx 초기화
    ```jsx
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ```
<br><br>
- 웹폰트 링크를 받아와서 사용했었는데, 링크는 존재하되 폰트가 기본으로 바뀌는 현상 발생
<br>→ 웹폰트 파일을 저장, 아래 FontFace API를 이용해 사용
    ```jsx
    let f = new FontFace("test", "url(x)");
    
    f.load().then(() => {
      // Ready to use the font in a canvas context
    });
    ```
<br><br><br><br><br>
