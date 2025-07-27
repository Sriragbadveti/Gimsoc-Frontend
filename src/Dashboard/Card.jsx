const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

export default Card
