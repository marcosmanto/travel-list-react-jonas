export default function PackingItem({ id, description, quantity, packed, onDeleteItem, onToggleItem }) {
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
