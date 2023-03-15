$(function () {
  console.log("JQuery Working");
  let edit = false;
  fetchTasks();
  $("#task-result").hide();

  $("#search").keyup(function () {
    if ($("#search").val()) {
      let search = $("#search").val();
      $.ajax({
        url: "task-search.php",
        type: "POST",
        data: { search },
        success: function (response) {
          let data = JSON.parse(response);
          let template = "";

          data.forEach((e) => {
            template += `<li>${e.name}</li>`;
          });

          $("#container").html(template);
          $("#task-result").show();
        },
      });
    }
  });
  // post
  $("#task-form").submit(function (e) {
    e.preventDefault();
    const postData = {
      name: $("#name").val(),
      description: $("#description").val(),
      id: $("#taskId").val()
    };
    // if edit or add
    let url = edit === false ? "task-add.php" : "task-edit.php";

    $.post(url, postData, function (response) {
      console.log(response);
      $("#task-form").trigger("reset");
    });
    fetchTasks();
  });
  // render list
  function fetchTasks() {
    $.ajax({
      url: "task-list.php",
      type: "GET",
      success: function (response) {
        let data = JSON.parse(response);
        let template = "";
        data.forEach((e) => {
          template += `
            <tr taskId="${e.id}">
                <td>${e.id}</td>
                <td>
                <a class="task-item" href="#">${e.name}</a>
                </td>
                <td>${e.description}</td>
                <td><button class="task-delete btn btn-danger">Delete</button></td>
            </tr>
            `;
        });
        $("#tasks").html(template);
      },
    });
  }
  // delete
  $(document).on("click", ".task-delete", function () {
    if (confirm("Are you sure you want to delete it?")) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr("taskId");
      $.post("task-delete.php", { id }, function (response) {
        console.log(response);
      });
      fetchTasks();
    }
  });

  $(document).on("click", ".task-item", function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("taskId");
    $.post("task-single.php", { id }, function (response) {
      const data = JSON.parse(response);
      $("#name").val(data.name);
      $("#description").val(data.description);
      $("#taskId").val(data.id)
      edit = true;
    });
  });
});
