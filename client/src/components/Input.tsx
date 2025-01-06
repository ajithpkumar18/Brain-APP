export const Input = ({ placeholder, compRef }: { placeholder: string, compRef: any }) => {
    return (
        <div>
            <input ref={compRef} placeholder={placeholder} type={"text"} className="px-4 py-2 border hover:border-gray-500 rounded m-2" />
        </div>
    )
}