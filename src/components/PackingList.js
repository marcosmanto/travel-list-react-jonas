import { useState } from 'react'
import swal from 'sweetalert'
import PackingItem from './PackingItem'

export default function PackingList({ items, onDeleteItem, onToggleItem, onClearItems }) {
  const [sortBy, setSortBy] = useState('input')

  function clearList() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover the list!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        onClearItems()
        swal('List has been deleted!', {
          icon: 'success'
        })
      }
    })
  }

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
      {items.length > 0 && (
        <div className="actions">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
            <option value="quantity">Sort by quantity</option>
          </select>
          <button onClick={clearList}>Clear list</button>
        </div>
      )}
    </div>
  )
}
