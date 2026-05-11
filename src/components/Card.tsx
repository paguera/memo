export interface CardInterface {
    id: number;
    pairId: number;
    imageFile: string;
    isFlipped: boolean;
    isFound: boolean;
}

interface CardProps extends CardInterface {
    onClick: () => void;
}

export default function Card({ pairId, imageFile, isFlipped, isFound, onClick }: CardProps) {

    const imageToShow = (isFlipped || isFound) ? imageFile : "js-badge.svg";
    
    return (
        <div onClick={onClick} className={`p-2 border-2 border-gray-300 rounded-md cursor-pointer flex items-center justify-center w-32 h-32 ${isFlipped || isFound ? 'bg-white' : 'bg-gray-500'}`}>
            <img src={imageToShow} alt={pairId.toString()} className="w-full h-full object-contain"/>
        </div>
    );
}