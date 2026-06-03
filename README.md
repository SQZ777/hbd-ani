# 生日記憶翻牌遊戲

這是一個手機直式友善的單頁 Web Game，適合送給生日朋友。

## 怎麼玩

1. 打開 `index.html`
2. 輸入生日主角名字
3. 選擇難度
4. 翻牌找出一樣的照片
5. 全部配對成功後，會出現生日祝福與回憶列表

## 怎麼換成自己的照片

把照片放進 `assets` 資料夾，例如：

- `assets/photo-1.jpg`
- `assets/photo-2.jpg`
- `assets/photo-3.jpg`

然後打開 `config.js`，把：

```js
image: "assets/photo-1.svg"
```

改成：

```js
image: "assets/photo-1.jpg"
```

每組記憶可以改：

```js
{
  id: "m1",
  image: "assets/photo-1.jpg",
  title: "第一次一起旅行",
  message: "那天真的超好笑，尤其是你差點走錯路那段。"
}
```

## 建議照片數量

- 簡單：4 張照片
- 普通：6 張照片
- 困難：8 張照片

每張照片會自動產生兩張卡片，所以 6 張照片就是 12 張牌。

## 分享方式

最簡單：
- 直接把整個資料夾傳給對方，請對方打開 `index.html`

比較漂亮：
- 放到 GitHub Pages、Netlify、Vercel
- 傳網址給朋友，手機直接玩
# hbd-ani
