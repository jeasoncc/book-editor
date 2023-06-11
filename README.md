                 ______________________________________________________________________
                /     ___       ____              __      ______    ___ __             \
                |    /   |     / __ )____  ____  / /__   / ____/___/ (_) /_____  _____ |
                |   / /| |    / __  / __ \/ __ \/ //_/  / __/ / __  / / __/ __ \/ ___/ |
                |  / ___ |   / /_/ / /_/ / /_/ / ,<    / /___/ /_/ / / /_/ /_/ / /     |
                | /_/  |_|  /_____/\____/\____/_/|_|  /_____/\__,_/_/\__/\____/_/      |
                \                                                                      /
                 ----------------------------------------------------------------------
此項目用於以書本爲目標的寫作者，網文作者、長篇小說作者、出書的作者。針對長篇寫作，提供各種定製化功能。

![GitHub](https://img.shields.io/github/license/jeasoncc/Secret-writing)   ![GitHub repo size](https://img.shields.io:/github/repo-size/jeasoncc/Secret-writing)   ![GitHub language count](https://img.shields.io:/github/languages/count/jeasoncc/Secret-writing)   ![GitHub Repo stars](https://img.shields.io:/github/stars/jeasoncc/Secret-writing?style=social)


[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/xiaomiquan)
[![安裝軟體敬請移駕 Snap Store](https://snapcraft.io/static/images/badges/tw/snap-store-black.svg)](https://snapcraft.io/xiaomiquan)


**项目介紹**：此項目，是因爲自己從事書籍寫作時產生的項目。在寫作的過程當中，產生了很多私人化的需求，也是一些自己在寫作當中的必備的功能。

爲了提供書記寫作所必備的所有功能，遂有此項目。

由於本人目前並未從事小說寫作的工作，因此此項目暫時擱置了下來，人會去做一件事情，只是因爲這件事情對於自己有意義。而無所謂其他事情。等我再次想要寫作，從事寫書的時候，我會再次撿起來這個項目。

如果有自己對此項目感興趣，請自行拉取代碼。

---
出於快速開發的目標，選取了JS的技術棧，採用的Electron這一套東西，目前看起來還事比較穩定，暫時並未出現性能的問題。另外一個原因是爲了美觀，H5做的東西，論好看還是最好看的。

![圖片說明](https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,w_1638,h_920/https://dashboard.snapcraft.io/site_media/appmedia/2022/01/2022-01-08_21-50-45%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE3.jpeg)

![圖片說明2](https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,w_1638,h_920/https://dashboard.snapcraft.io/site_media/appmedia/2022/01/2022-01-08_21-57-55%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)
技術方案:
Sevelte + Electron + Typescript + LocalForge

    +----------+     +------------+     +------------+
    | Electron | --> |            | <-- | Typescript |
    +----------+     | BookEditor |     +------------+
                     |            |     +------------+
                     |            | <-- | LocalForge |
                     +------------+     +------------+
                       ^
                       |
                       |
                     +------------+
                     |  Sevelte   |
                     +------------+

---
安裝使用

Linux:

```bash
sudo snap install xiaomiquan
```

**源碼安裝**:

```bash
git clone git@github.com:jeasoncc/book-editor.git   && yarn && yarn dev
```

