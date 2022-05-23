const { log } = console

const thumnails = [...document.querySelectorAll('.thumnails img')]
const bigImg = document.querySelector('.image-big')
const nav = document.querySelector('nav')
const underline = document.querySelector('.underline')
const aside = document.querySelector('aside')
const images = document.querySelector('.images')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const times = document.querySelector('.times')
const asideBigImg = document.querySelector('.aside-image-big')
const asideThumnails = [...document.querySelectorAll('aside .thumnails img')]
const quantity = document.querySelector('.quantity')
const minus = document.querySelector('.minus')
const plus = document.querySelector('.plus')
const addBtn = document.querySelector('.add-btn')
const cartCount = document.querySelector('.cart-count')
const cart = document.querySelector('.cart')
const cartBox = document.querySelector('.cart-box')
const empty = document.querySelector('.empty')
const items = document.querySelector('.items')
const checkoutBtn = document.querySelector('.checkout-btn')
const menu = document.querySelector('.menu')
const sidebar = document.querySelector('.sidebar')
const mobileImage = document.querySelector('.mobile-image')
const mobileNext = document.querySelector('.mobile-next')
const mobilePrev = document.querySelector('.mobile-prev')

let count = 0
let index = 1

addBtn.addEventListener('click', () => {
  if (count === 0) {
    checkoutBtn.classList.remove('show')
    localStorage.clear()
    empty.classList.remove('hide')
    cartCount.classList.remove('show')
    renderCart()
    return
  }
  empty.classList.add('hide')
  checkoutBtn.classList.add('show')
  cartCount.innerHTML = count
  cartCount.classList.add('show')

  const sneakers = {
    img: './images/image-product-1-thumbnail.jpg',
    name: 'fall limited edition sneakers',
    price: 125.0,
    quantity: count,
    id: new Date().getTime().toString(),
  }
  localStorage.setItem('list', JSON.stringify(sneakers))
  renderCart()
})

cartBox.addEventListener('click', (e) => {
  cart.classList.toggle('show')
})


function renderCart() {
  const list = JSON.parse(localStorage.getItem('list'))
  if (list) {
    items.innerHTML = `<div class="item">
        <img src=${list.img} />
        <div class="title">
        <p class="name">${list.name}</p>
        <p>${`$${list.price}.00`} x ${list.quantity}<span>${`$${
      list.price * list.quantity
    }.00`}
  </span></p>
        </div>
        <i class="bi bi-trash"></i>
      </div>`

    const trash = document.querySelector('.bi-trash')
    trash.addEventListener('click', () => {
      localStorage.clear()
      items.innerHTML = ''
      checkoutBtn.classList.remove('show')
      empty.classList.remove('hide')
      count = 0
      cartCount.classList.remove('show')
    })
  } else {
    items.innerHTML = ''
  }
}

menu.addEventListener('click', () => {
  sidebar.classList.add('show')
})
sidebar.addEventListener('click', (e) => {
  if (e.target.classList.contains('show')) {
    sidebar.classList.remove('show')
  } else if (e.target.classList.contains('bi-x')) {
    sidebar.classList.remove('show')
  }
})

minus.addEventListener('click', () => {
  if (count <= 0) return
  count--
  quantity.innerHTML = count
})

plus.addEventListener('click', () => {
  count++
  quantity.innerHTML = count
})

times.addEventListener('click', () => {
  aside.classList.remove('show')
})

prev.addEventListener('click', () => {
  if (index <= 1) {
    index = 4
  } else {
    index--
  }
  asideBigImg.src = `./images/image-product-${index}.jpg`
})
mobilePrev.addEventListener('click', () => {
  if (index <= 1) {
    index = 4
  } else {
    index--
  }
  mobileImage.style.backgroundImage = `url(./images/image-product-${index}.jpg)`
})

next.addEventListener('click', () => {
  if (index >= 4) {
    index = 1
  } else {
    index++
  }
  asideBigImg.src = `./images/image-product-${index}.jpg`
})
mobileNext.addEventListener('click', () => {
  if (index >= 4) {
    index = 1
  } else {
    index++
  }
  mobileImage.style.backgroundImage = `url(./images/image-product-${index}.jpg)`
})

nav.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('link')) {
    const rect = e.target.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()
    // const center = (rect.left+rect.right)/2
    const width = rect.width
    underline.style.width = `${width}px`
    underline.style.left = `${rect.left - navRect.left}px`
  } else {
    underline.style.width = 0
  }
})

bigImg.addEventListener('click', () => {
  aside.classList.add('show')
})

window.addEventListener('resize', () => {
  const name = document.querySelector('.name')
  if (window.innerWidth <= 620) {
    aside.classList.remove('show')
    name.innerHTML = `autumn limited edition...`
  } else {
    name.innerHTML = `fall limited edition sneakers`
  }
})

images.addEventListener('click', (e) => {
  const id = e.target.dataset.id
  if (id) {
    thumnails.forEach((item) => {
      item.classList.remove('hold')
    })
    bigImg.src = `./images/image-product-${id}.jpg`
    e.target.classList.add('hold')
  }
})

aside.addEventListener('click', (e) => {
  const id = e.target.dataset.id
  if (id) {
    asideThumnails.forEach((item) => {
      item.classList.remove('hold')
    })
    asideBigImg.src = `./images/image-product-${id}.jpg`
    e.target.classList.add('hold')
  }
  if (e.target.classList.contains('show')) {
    aside.classList.remove('show')
  }
})
