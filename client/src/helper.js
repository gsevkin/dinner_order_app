exports.setFooterMessage = (message, type) => {
    var footer = document.getElementById("Footer");
    footer.text = message;

    if (type == 0) //success
      footer.style.color = "green";
    else if (type == 1) //error
      footer.style.color = "red";
    else if (type == 2) //warning
      footer.style.color = "yellow";
  };