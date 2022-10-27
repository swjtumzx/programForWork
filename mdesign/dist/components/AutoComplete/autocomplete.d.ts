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
/**
 * ## AutoComplete 自动完成
 * ---
 * 输入框自动完成功能。
 *
 * ### 何时使用
 * ---
 * 需要自动完成时。
 * ### 选项
 *  onSelect?:(item : DataSourceType) => void;
 *
 *  fetchSuggestion:(str:string) => DataSourceType[] | Promise<DataSourceType[]>;
 *
 *  renderOption?: (item:DataSourceType) => ReactElement;
 *
 */
declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
