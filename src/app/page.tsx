'use client'
import {useEffect,useState} from 'react'
import pokemon from 'pokemontcgsdk'
import { type SetDatum } from '@/interfaces/Sets'
import { type Cards, type CardDatum } from '@/interfaces/Cards'
import Card from '@/components/card/Card'

export default function Home() {
  pokemon.configure({apiKey: process.env.API_KEY})
  const [cards, setCards] = useState<Array<CardDatum>>([])
  const [sets, setSets] = useState<Array<SetDatum>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSets()
  }, [])
  
  const getSets = ()=>{
    pokemon.set.all()
    .then((data: Array<SetDatum>)  => {
        console.log(data)
        let array = shuffled(data,5)
        setSets(array)
        setLoading(false)
    })
  }

  const shuffled = <T,>(array: T[], lenght: number) => {
    let arr = array
    const shuffled = arr.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, lenght);
    return selected
  }
 
  const getCardsSet = async (set: string , total : number) =>{
    setCards([])
    setLoading(true)
    let arrNumber = []
    for(let i = 0; i < 5; i++){
      arrNumber.push(Math.floor(Math.random() * total))
    }

    arrNumber.map((number)=>{
      pokemon.card.where({q:`set.id:${set} number:${number}`,orderBy:'releaseDate',pageSize:5 })
        .then((data: Cards) => {
            setCards(prevArray =>[...prevArray, data.data[0]])
            setLoading(false)
        })

    })
    console.log(cards)
  }
  if(loading){
    return (<>
    <div className='flex w-100 h-screen justify-center items-center'>
      <span className="loader"></span>
    </div>
    
    </>)
  }

  return (
    <main className='p-4'>
      {cards && <>
          <div className='flex justify-center '>
            <p>Cards</p>
            <p onClick={()=>setCards(cards => []) }>Reset</p>
          </div>
          <div className='flex flex-row  flex-wrap gap-3'>
            {
              cards.map((card :CardDatum ,i)=>{
                return (
                  <Card item={card} />
                )
              })
            }
          </div>
        </>
      }
      { sets && <>
        <div className='flex justify-center '>
          <p>Sets</p>
        </div>
        <div className='flex flex-row flex-wrap gap-3'>
          {
            sets.map((set,i)=>{
              return (
                <div onClick={()=>getCardsSet(set.id,set.total)} key={i}>
                  <div className='h-[200px] w-[200px]'>
                    <img src={set.images.logo} alt={set.name} />
                    </div>
                </div>
              )
            })
          }
        </div>
      </>
      }
    </main>
  )
}
