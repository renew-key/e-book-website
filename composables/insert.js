window.onload = function () {
  var header = document.getElementById("header");
  var footer = document.getElementById("footer");

  function headerData() {
    return axios.get("../componet/header.html");
  }

  function footerData() {
    return axios.get("../componet/footer.html");
  }
  //確保axios都拿回資料才做處理
  axios
    .all([headerData(), footerData()])
    .then(
      axios.spread(function (resHeader, resFooter) {
        // console.log(resHeader.data, resFooter.data);
        header.innerHTML = resHeader.data;
        footer.innerHTML = resFooter.data;
      })
    )
    .catch(function (error) {
      console.log(error);
    });
};
