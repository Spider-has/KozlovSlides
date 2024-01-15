type StatesHistory<T> = {
    addState: (state: T) => void;
    undoState: () => T | null;
    redoState: () => T | null;
};

const HistoryInit = <T>(InitialState: T): StatesHistory<T> => {
    const historyItems: Array<T> = [InitialState];
    let itemNow = 0;
    return {
        addState: (state: T) => {
            if (itemNow != historyItems.length - 1) {
                historyItems.splice(itemNow + 1, historyItems.length - 1 - itemNow);
            }
            itemNow++;
            historyItems[itemNow] = state;
        },
        undoState: () => {
            if (itemNow > 0) {
                itemNow--;
                return historyItems[itemNow];
            } else return null;
        },
        redoState: () => {
            if (itemNow + 1 < historyItems.length) {
                itemNow++;
                return historyItems[itemNow];
            } else return null;
        },
    };
};

export { HistoryInit };
