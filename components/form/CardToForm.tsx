type CardToFormProps = {
  title: string
  children: React.ReactNode
}

export default function CardToForm(props: CardToFormProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-auto">
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
        <div className="p-6 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl">
            {props.title}
          </h1>
          {props.children}
        </div>
      </div>
    </div>
  )
}
