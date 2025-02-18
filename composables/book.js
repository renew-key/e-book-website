window.onload = function () {
  // 所有 EPUB 檔案的路徑
  const bookPaths = ["/public/01.epub", "/public/02.epub", "/public/03.epub"];

  // 動態載入每本書
  bookPaths.forEach((bookPath) => {
    loadBook(bookPath);
  });

  function loadBook(bookPath) {
    console.log(bookPath);
    const book = ePub(bookPath);

    book.loaded.metadata
      .then(function (metadata) {
        const title = metadata.title || "未知書名";
        const author = metadata.creator || "未知作者";

        // 創建書籍項目並顯示在頁面上
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        const bookTitle = document.createElement("h3");
        bookTitle.innerText = `書名: ${title}`;
        bookItem.appendChild(bookTitle);

        const bookAuthor = document.createElement("p");
        bookAuthor.innerText = `作者: ${author}`;
        bookItem.appendChild(bookAuthor);

        // 顯示封面
        book.loaded.spine.then(function (spine) {
          let coverUrl = null;
          spine.forEach(function (item) {
            if (item.href.includes("cover")) {
              coverUrl = item.href;
            }
          });

          if (coverUrl) {
            book.getFile(coverUrl).then(function (file) {
              const coverBlob = file.getBlob();
              const coverObjectUrl = URL.createObjectURL(coverBlob);
              const coverImage = document.createElement("img");
              coverImage.src = coverObjectUrl;
              coverImage.classList.add("book-cover");
              bookItem.appendChild(coverImage);
            });
          }
        });

        // 將書籍項目添加到書庫列表
        document.getElementById("book-list").appendChild(bookItem);
      })
      .catch(function (err) {
        console.error("載入元數據失敗:", err);
      });
  }
};
