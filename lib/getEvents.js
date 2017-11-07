window.getActivities = ()=>new Promise((resolve)=>{
  const url = 'http://calendar.byui.edu/RSSFeeds.aspx?data=tq9cbc8b%2btuQeZGvCTEMSP%2bfv3SYIrjQ3VTAXA335bE0WtJCqYU4mp9MMtuSlz6MRZ4LbMUU%2fO4%3d'

  const stripTags = (x)=>{
    const div = document.createElement('div')
    div.innerHTML = x
    return div.textContent
  }

  fetch(url)
  .then(res=>res.text()).then((xml)=>{
    const doc = new DOMParser().parseFromString(xml, 'text/xml')
    const activities = []

    Array.prototype.slice.call(doc.getElementsByTagName('item')).forEach((item)=>{
      const enclosure = item.querySelector('enclosure')
      activities.push({
        title: stripTags(item.querySelector('title').textContent),
        description: stripTags(item.querySelector('description').textContent),
        date: new Date(Date.parse(stripTags(item.querySelector('pubDate').textContent))),
        href: stripTags(item.querySelector('link').textContent),
        category: stripTags(item.querySelector('category').textContent),
        image: enclosure ? enclosure.getAttribute('url') : null
      })
    })

    resolve(activities.sort((a,b)=>a.date - b.date))
  })
})
