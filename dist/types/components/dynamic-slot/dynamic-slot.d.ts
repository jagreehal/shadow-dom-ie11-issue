export declare class DynamicSlot {
    descriptions: any;
    el: any;
    selectedIndex: number;
    items: any[];
    updateDisplay: (description: any, item: any, index: any) => void;
    handleClick: (item: any, index: any) => void;
    componentDidLoad(): void;
    renderItemList: (index: any) => JSX.Element;
    render(): JSX.Element;
}
