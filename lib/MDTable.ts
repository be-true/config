type MDTableData = (string | {[key: string]: any})
type MDTableOptions = {
    columns?: string[]
}
const defaultOptions = {};

export class MDTable {
    private columns: string[] = [];
    private columnWidth: Map<string, number> = new Map();
    private options: MDTableOptions = {};

    constructor(private data: MDTableData[], options?: MDTableOptions) {
        this.options = {
            ...options,
            ...defaultOptions
        };

        this.init();
    }

    init() {
        this.makeColumns();
        this.calcColumnWidth();
    }

    private makeColumns() {
        if (this.options.columns !== undefined) {
            this.columns = this.options.columns;
            return;
        }

        const columns = new Set<string>();
        this.data.forEach(i => {
            Object.entries(i).forEach(([key, _]) => {
                columns.add(key);
            })
        })
        this.columns = [...columns];
    }

    private calcColumnWidth() {
        const result = new Map<string, number>();

        // Add header to data fot calculate length
        const headerData: {[key: string]: string} = {};
        this.columns.forEach(i => headerData[i] = i);
        const data = [...this.data, headerData];

        data.forEach(i => {
            Object.entries(i).forEach(([key, value]) => {
                const length = String(value).length
                if (!result.has(key)) {
                    result.set(key, length);
                } else {
                    if ((result.get(key) ?? 0) < length) {
                        result.set(key, length)
                    }
                }
            })
        });

        this.columnWidth = result;
    }

    private textAsWidth(text: string, width?: number): string {
        if (width === undefined) return text;
        let spaces = width - text.length;
        if (spaces < 0) spaces = 0;
        return text + " ".repeat(spaces);
    }

    private renderHeader(): string {
        let header = '| ';

        const last = this.columns.length;
        this.columns.forEach((i, index) => {
            const width = this.columnWidth.get(i);
            header += this.textAsWidth(i, width);
            header += last === (index + 1) ? " |" : " | ";
        });

        return header;
    }

    private renderHeaderSplit(): string {
        let header = '|';

        const last = this.columns.length;
        this.columns.forEach((i, index) => {
            const width = this.columnWidth.get(i) ?? 0;
            header += "-".repeat(width + 2) + "|";
        });

        return header;
    }

    private renderRow(item: MDTableData): string {
        if (typeof item === 'string') return `| ${item} |`
        let row = '| ';

        const last = this.columns.length;
        this.columns.forEach((key, index) => {
            const text = String(item[key] ?? '');
            const width = this.columnWidth.get(key) ?? 0;
            row += this.textAsWidth(text, width);
            row += last === (index + 1) ? " |" : " | ";
        });

        return row;
    }

    toString() {
        return [
            this.renderHeader(),
            this.renderHeaderSplit(),
            ...this.data.map((item) => this.renderRow(item)),
        ].join("\n");
    }
}