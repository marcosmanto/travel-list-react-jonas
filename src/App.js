import { useState } from 'react'
import swal from 'sweetalert'

export default function App() {
  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems(items => [...items, item])
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(i => i.id !== id))
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => (item.id === id ? { ...item, packed: !item.packed } : item)))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState('input')

  let sortedItems

  if (sortBy === 'input') sortedItems = items
  if (sortBy === 'description') sortedItems = items.toSorted((a, b) => a.description.localeCompare(b.description))
  if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => a.packed - b.packed)
  if (sortBy === 'quantity') sortedItems = items.toSorted((a, b) => b.quantity - a.quantity)

  return (
    <div className="list">
      <ul>
        {sortedItems.map(({ id, description, quantity, packed }) => (
          <PackingItem id={id} description={description} quantity={quantity} packed={packed} key={id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
          <option value="quantity">Sort by quantity</option>
        </select>
      </div>
    </div>
  )
}

function Stats({ items }) {
  const totalItems = items.length

  if (totalItems === 0) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    )
  }

  const packedItems = items.filter(item => item.packed).length
  const percentage = Math.round((packedItems / totalItems) * 100)
  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? (
          <>You got everything! Ready to go 🛫</>
        ) : (
          <>
            💼You have {totalItems} items on your list, and you already packed {packedItems} ({percentage}%)
          </>
        )}
      </em>
    </footer>
  )
}

function PackingItem({ id, description, quantity, packed, onDeleteItem, onToggleItem }) {
  return (
    <li id={id}>
      <span>
        <input
          type="checkbox"
          value={packed}
          onChange={() => {
            onToggleItem(id)
          }}
        />
      </span>
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        <span className="pack-item-quantity">{quantity}</span> {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>{packed ? ' ✅' : ' ❌'}</button>
    </li>
  )
}
