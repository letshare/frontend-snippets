var _delHtmlTags = document.getElementById("delHtmlTags");
_delHtmlTags.onblur = function() {
    this.value = this.value.replace(/<[\/\!]*[^<>]*>/ig, "");
}