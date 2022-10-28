import { ReactElement, FC } from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    onSelect?: (item: DataSourceType) => void;
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    renderOption?: (item: DataSourceType) => ReactElement;
}
declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
