import { CopyFormatting } from './icons/CopyFormatting';
import { Delete } from './icons/Delete';
import { Download } from './icons/Download';
import { Insert } from './icons/Insert';
import { Redo } from './icons/Redo';
import { Undo } from './icons/Undo';
const Button = () => {
    return (
        <div>
            RandomButton
            <Delete />
            <Download />
            <Insert />
            <CopyFormatting />
            <Undo />
            <Redo />
        </div>
    );
};

export { Button };
