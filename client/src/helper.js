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
  
  exports.getDateNowDDMMYYYY = function() {
    var today = new Date();
    var mm = today.getMonth() + 1; // getMonth() is zero-based
    var dd = today.getDate();
    var yyyy = today.getFullYear();

    return [yyyy, '-',
            (mm>9 ? '' : '0') + mm, '-',
            (dd>9 ? '' : '0') + dd
             ].join('');
  };
  
  