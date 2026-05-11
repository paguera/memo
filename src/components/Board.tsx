import { useEffect, useState } from 'react';
import Card, {type CardInterface} from './Card';

const initialCards: Omit<CardInterface, 'id' | 'isFlipped' | 'isFound'>[] = [
    {pairId: 1, imageFile: "butterfly.svg"},
    {pairId: 2, imageFile: "unicorn.svg"},
    {pairId: 3, imageFile: "owl.svg"},
    {pairId: 4, imageFile: "panda.svg"},
    {pairId: 5, imageFile: "penguin.svg"},
    {pairId: 6, imageFile: "rabbit.svg"},
];

const generateCards = (): CardInterface[] => {
    const duplicatedCards = initialCards.flatMap((card, index) => [
        { ...card, id: index * 2, isFlipped: false, isFound: false },
        { ...card, id: index * 2 + 1, isFlipped: false, isFound: false }
    ]);
    return duplicatedCards.sort(() => Math.random() - 0.5);
};

export default function Board() {
    const [cards, setCards] = useState<CardInterface[]>(generateCards());
    const [flippedCards, setFlippedCards] = useState<CardInterface[]>([]);
    const [counter, setCounter] = useState(0);

    const restartGame = () => {
        setCards(generateCards());
        setFlippedCards([]);
        setCounter(0);
    };

    const handleCardClick = (clickedCard: CardInterface) => {
        if (flippedCards.length === 2 || clickedCard.isFlipped || clickedCard.isFound) {
            return;
        }

        setCounter(counter + 1);

        const newCards = cards.map(card => 
            card.id === clickedCard.id ? { ...card, isFlipped: true } : card
        );

        const newFlippedCards = [...flippedCards, { ...clickedCard, isFlipped: true }];
        setFlippedCards(newFlippedCards);
        setCards(newCards);
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.pairId === secondCard.pairId) {
                const matchedCards = cards.map(card =>
                    card.pairId === firstCard.pairId ? { ...card, isFound: true, isFlipped: true } : card
                );
                setCards(matchedCards);
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    const resetCards = cards.map(card =>
                        card.id === firstCard.id || card.id === secondCard.id ? { ...card, isFlipped: false } : card
                    );
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    }, [flippedCards, cards]);

    return (
        <>
            <p>Counter : {counter}</p>
            <button onClick={restartGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Restart Game
            </button>
            <div className="grid grid-cols-4 gap-4">    
                {cards.map((c) => {
                        return(
                            <Card
                                key={c.id}
                                {...c}
                                onClick={() => handleCardClick(c)}
                                />
                    )
                })}
            </div>
        </>
    );
}
