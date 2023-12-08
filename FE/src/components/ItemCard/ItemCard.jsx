import { FaFolder } from "react-icons/fa6";

const ItemCard = ({ movie }) => {
    const { src, title, quantity } = movie;
    return (
        <div className='card relative overflow-hidden shadow-md shadow-[#16405b] hover:shadow-lg hover:shadow-[#16405b] hover:translate-y-[-1px] transition-all ease-linear rounded-xl cursor-pointer'>
            <img src={src} className='w-full h-[400px] object-cover relative' alt='Movie' />
            <div className='p-4 text-white bg-[rgba(0,0,0,.8)] absolute bottom-0 left-0 right-0'>
                <h4 className='h-[32px] text-center overflow-hidden text-ellipsis whitespace-nowrap '>{title}</h4>
            </div>
            <div className="flex items-center absolute top-2 left-2 px-3 py-1 bg-[#ecfeff] rounded-lg">
                <FaFolder />
                <p className="ml-2">{quantity}</p>
            </div>
        </div>
    )
}

export default ItemCard