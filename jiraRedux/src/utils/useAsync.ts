import { useState } from "react";

interface State<D>{
    error:Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitState:State<null>={
    error:null,
    data: null,
    stat: 'idle'
}

export const useAsync= <D>(initialState?:State<D>)=>{
    const [state,setState]=useState<State<D>>({
        ...defaultInitState,
        ...initialState
    })
    const setData=(data:D)=>{
        setState({
            data,
            error:null,
            stat: 'success'
        })
    }
    const setError=(error:Error)=>{
        setState({
            data:null,
            error,
            stat: 'success'
        })
    }
    const run=(promise:Promise<D>)=>{
        if(!promise || !promise.then){
            throw new Error('请传入Promise类型的数据')
        }
        setState({...state,stat:'loading'});
        return promise.then(data=>{
            setData(data);
            return data
        }).catch(e=>{
            setError(e);
            return Promise.reject(e);
        })
    }

    return {
        isIdle: state.stat ==='idle',
        isSuccess: state.stat ==='success',
        isError: state.stat ==='error',
        isLoading: state.stat ==='loading',
        setData,
        setError,
        run,
        ...state
    }
}