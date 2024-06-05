import { useState } from 'react'
import swal from 'sweetalert'

export default function Form({ onAddItems }) {
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
