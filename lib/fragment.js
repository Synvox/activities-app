window.Fragment = (html)=>{
  const div = document.createElement('div')
  div.innerHTML = html.trim()

  if (div.children.length !== 1)
    throw new Error('Fragment requires a single tag.')
  
  return div.firstChild
}
