import React from 'react'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

const Button = ({ ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="w-full text-center bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded"
    />
  )
}

export default Button
