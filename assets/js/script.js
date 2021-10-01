$(".search-button").on("click", function () {
    var input = $(this).siblings(".form-control");
    var name = input.val();
    localStorage.setItem("city", name);
    console.log(name);
  });

