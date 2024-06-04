import { useState } from 'react'
import swal from 'sweetalert'

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Charger', quantity: 1, packed: true }
]

export default function App() {
  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems(items => [...items, item])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  )
}

function Logo() {
  return (
    <h1>
      <span className="header-icon">🌴</span>
      <span className="title">
        <span>Far</span>
        <span>Away</span>
      </span>
      <span className="header-icon">🧳</span>
    </h1>
  )
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(evt) {
    evt.preventDefault()
    const txtDescription = evt.target.querySelector('input[type="text"]')

    if (!description.trim()) {
      setDescription('')
      swal({
        text: 'Please insert a description for the item',
        icon: 'error',
        buttons: {
          cancel: 'Close'
        }
      }).then(value => {
        console.log(txtDescription.focus())
      })
      return
    }
    const newPackingItem = { description, quantity, packed: false, id: Date.now() }

    onAddItems(newPackingItem)

    setDescription('')
    setQuantity(1)
    txtDescription.focus()
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <div>
        <label className="select-quantity" htmlFor="select-quantity">
          <select id="select-quantity" value={quantity} onChange={evt => setQuantity(Number(evt.target.value))}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
          <svg viewbox="0 0 10 6">
            <polyline points="1 1 5 5 9 1"></polyline>
          </svg>
        </label>
        <input type="text" placeholder="Item..." value={description} onChange={evt => setDescription(evt.target.value)} />
        <button>Add</button>
      </div>
    </form>
  )
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map(({ id, description, quantity, packed }) => (
          <PackingItem id={id} description={description} quantity={quantity} packed={packed} key={id} />
        ))}
      </ul>
    </div>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼You have X items on your list, and you already packed Y (Z%)</em>
    </footer>
  )
}

function PackingItem({ id, description, quantity, packed }) {
  return (
    <li id={id}>
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      {packed ? ' ✅' : ' ❌'}
    </li>
  )
}
