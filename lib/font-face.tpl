@font-face {
    font-family: "<%=fontFamily%>";
    src: url("<%=fontUri%>.eot"); /* IE9 */
    src: url("<%=fontUri%>.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
    url("<%=fontUri%>.woff") format("woff"), /* chrome、firefox */
    url("<%=fontUri%>.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
    url("<%=fontUri%>.svg#<%=fontFamily%>") format("svg"); /* iOS 4.1- */
    font-style: normal;
    font-weight: normal;
}

<% if (iconPrefix) { %>
[class^="<%=iconPrefix%>-"],
[class*=" <%=iconPrefix%>-"]:after {
    font-family: "<%=fontFamily%>";
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

<% _.each(glyfList, function(glyf) { %>
.icon-<%=glyf.name%>:before {
  content: "<%=glyf.codeName%>";
}
<% }); %>
<% }; %>
