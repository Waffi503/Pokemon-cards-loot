'use client'
import { useState } from "react"
import { type CardDatum } from '@/interfaces/Cards'
import './style.css'

interface cardProps{
    item: CardDatum
}

export default function Card( { item } :cardProps ){
    const [show,setShow] = useState('')

    const handleShow = ()=>{
        setShow('flipped')
        console.log('click')
    }
    return (
        <div className={`card h-[325px] w-[245px] ${show}`} onClick={handleShow}>
            <div className=" front face h-[325px] w-[245px]">
                <img className='w-full h-full object-contain' src={'./pokemon_back.png'} alt={'...'} />
            </div>
            <div className={`back face h-[325px] w-[245px]  ` } >
                <img className='w-full h-full object-contain' src={item.images.small} alt={'...'} />
            </div>
        </div>
        
    )

}