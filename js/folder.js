function renderLinks(folder){

let html = `
<button onclick="addLink(${folder.id})">
+ Add Link
</button>
`;

folder.items.forEach((link,index)=>{

html += `

<div class="item-row">

<a href="${link.url}"
target="_blank">

${link.title}

</a>

<button
onclick="deleteLink(${folder.id},${index})"
>

❌

</button>

</div>

`;

});

return html;

}