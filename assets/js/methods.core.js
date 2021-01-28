const method = {
    copy: (el, textMessage) => {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(el).text()).select();
        document.execCommand("copy");
        $temp.remove();
        alert(textMessage);
    }
}