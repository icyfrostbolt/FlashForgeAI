import Flashcard from './Flashcard';
import FlashcardList from './FlashcardList';

function ScreenGenerator({inCreate}) {
    return (
        <div class='form'>
            {inCreate ? <Flashcard /> : <FlashcardList />}
        </div>
    );
}

export default ScreenGenerator;