const appRoot = document.querySelector('.app')

window.getActivities().then(main)

function main(activities) {
  const activitiesNode = Fragment(`
    <div class="activities">
    </div>
  `)

  for(let activity of activities) {
    activitiesNode.appendChild(activityView(activity))
  }

  appRoot.appendChild(activitiesNode)
}

function activityView(activity) {
  const node = Fragment(`
    <div class="activity">
      <img src="${activity.image || ''}" height="100">
      <p><strong>${activity.title}</strong></p>
      <p><strong>${activity.date.toLocaleString()}</strong></p>
      <p>${activity.description}</p>
    </div>
  `)

  node.addEventListener('click', function(e) {
    e.stopPropagation()

    const overlayNode = Fragment(`
      <div class="overlay">
        <div class="details">
          ${activity.image ? `<img src="${activity.image}" height="100">` : ''}
          <p><strong>${activity.title}</strong></p>
          <p><strong>${activity.date.toLocaleString()}</strong></p>
          <p>${activity.description}</p>
        </div>
      </div>
    `)

    const detailsNode = overlayNode.querySelector('.details')

    appRoot.appendChild(overlayNode)

    detailsNode.addEventListener('click', function(e){
      e.stopPropagation()
    })

    overlayNode.addEventListener('click', function(){
      overlayNode.classList.add('out')
      window.setTimeout(function(){
        appRoot.removeChild(overlayNode)
      }, 300)
    })
  })

  return node
}
