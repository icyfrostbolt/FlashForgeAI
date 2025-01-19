import Flashcard from './Flashcard';
import FlashcardList from './FlashcardList';

function ScreenGenerator({inCreate}) {
    return (
        <div>
            {inCreate ? <Flashcard /> : <FlashcardList />}
        </div>
    );
}

export default ScreenGenerator;