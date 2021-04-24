export const CellContent = Object.freeze({
    FOOD: Symbol("food"),
    SNAKE: Symbol("snake"),
    EMPTY: Symbol("empty")
})

export class Cell {
    #cellContent = CellContent.EMPTY;

    set setCellContent(cellContent) {
        this.#cellContent = cellContent;
    }

    get getCellContent() {
        return this.#cellContent;
    }
}