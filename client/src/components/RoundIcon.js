import React from 'react'
import classNames from 'classnames'

function RoundIcon({
  icon: Icon,
  iconColorClass = 'text-primary-600 dark:text-primary-100',
  bgColorClass = 'bg-primary-100 dark:bg-primary-600',
  className,
}) {
  const baseStyle = 'p-3 rounded-full'

  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className)
  return (
    <div className={cls}>
      <Icon className="w-5 h-5" />
    </div>
  )
}

export default RoundIcon
